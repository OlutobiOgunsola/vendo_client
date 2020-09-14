import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, withTheme } from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fadeIn, slideInUp } from 'react-animations';
import AOS from 'aos';
import 'aos/dist/aos.css';
import StarRatings from 'react-star-ratings';

import DefaultImage from '@/assets/images/icons/account/Profile.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

import Input from '@/components/widgets/UI/Input';

import PaperPlane from './PaperPlane';
import Comment from './Comment';
import { getTransaction } from '@/actions/transaction';
import { connect } from 'react-redux';
import Alert from '@/components/widgets/UI/Alert';
import setAlert from '@/assets/helperFunctions/alerts';
import { sort } from '@/assets/helperFunctions/sort';
import Button from '../../buttons/Button';
import ReactTooltip from 'react-tooltip';

const fadeInUpAnimation = keyframes`${fadeIn}`;
const slideInUpAnimation = keyframes`${slideInUp}`;

const ParentContainer = styled.div`
  background: ${(props) => props.theme.colors.review_background};
  width: calc(100% - 10px);
  &:hover {
    width: 100%;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
  height: auto;
  position: relative;
  z-index: 9;
  box-sizing: border-box;
  transition: all 0.25s ease-in-out;
  margin: 32px auto 0px auto;
  animation: 0.5s ${slideInUpAnimation};
  padding: 32px;
  border-style: solid;
  border-width: 0.25px;
  border-color: ${(props) => {
    return `${props.border}`;
  }};
  border-radius: 4px;
  @media (max-width: 500px) {
    padding: 16px;
  }
  @media (max-width: 400px) {
    padding: 16px 8px;
  }
`;

const Container = styled.div`
  width: 100%;
`;

const TextContainer = styled.span`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 16px;
`;

const Text = styled.p`
  display: inline-block;
  font-family: 'Josefin Sans Regular';
  width: calc(100% - 124px);
  font-size: 16px;
  font-weight: 500;
  box-sizing: border-box;
  opacity: 0.8;
  color: ${(props) => props.theme.colors.saturated_contrast};
  margin: 0;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
`;

const Author = styled.span`
  display: inline-block;
  width: 150px;
  height: 20px;
  margin-left: auto;
  text-align: right;
`;

const AuthorName = styled.p`
  font-family: 'Noto Sans Regular';
  display: inline-block;
  font-size: 11px;
  transform: translateY(-3px);
  color: ${(props) => props.theme.colors.saturated_font_darker};
  margin: 0;
  @media (max-width: 500px) {
    font-size: 9px;
  }
`;

const DateContainer = styled.p`
  font-family: 'Josefin Sans Medium Italic';
  font-size: 10px;
  color: ${(props) => props.theme.colors.saturated_contrast_60};
  margin: 0;
  @media (max-width: 500px) {
    font-size: 8px;
  }
`;

const TransactionImage = styled.img`
  display: inline-block;
  width: 12px;
  height: 12px;
  border: none;
  border-radius: 50%;
  box-sizing: border-box;
  margin: 0px 4px;
`;

const ExpandGroup = styled(Link)`
  width: 100%;
  text-align: left;
  color: ${(props) => props.theme.colors.saturated_font_darker};
  font-family: 'Josefin Sans Light';
  font-size: 12px;
  opacity: 0.6;
  transition: all 0.25s ease-in-out;
  &:hover {
    opacity: 1;
    cursor: pointer;
    text-decoration: underline;
  }
  .fa-icon {
    margin-right: 4px;
    opacity: 0.6;
    transition: all 0.25s ease-in-out;
    &:hover {
      opacity: 1;
      cursor: pointer;
    }
  }
`;

const CommentsContainer = styled.div`
  width: 100%;
`;

const Action = styled.span`
  color: ${(props) => props.color};
  font-size: 12px;
  font-family: 'Josefin Sans Light';
  display: inline-block;
  opacity: 0.6;
  margin-right: 8px;
  margin-left: auto;
  transition: all 0.25s ease-in-out;
  padding: 4px;
  border-radius: 4px;
  background: ${(props) => props.background};

  &:last-child {
    margin-right: 0px;
  }
  &:hover {
    text-decoration: underline;
    opacity: 1;
    cursor: pointer;
    .rotate {
      transition: transform 0.25s ease-in-out;
      /* &:hover { */
      transform: rotate(45deg);
      /* } */
    }
    .rotate-tiny {
      transition: transform 0.25s ease-in-out;
      /* &:hover { */
      transform: rotate(10deg);
      /* } */
    }
  }

  .fa-icon {
    display: inline;
    margin: 0;
    margin-right: 4px;
  }
`;

const TransactionItem = (props) => {
  const _id = props.id;
  const transactions = props.transactions;
  const [actioned, setActioned] = useState(false);
  const [transaction, setTransaction] = useState({
    title: '',
    description: '',
    additional_photos: [],
    accepted: false,
    status: '',
    store_owner_id: {
      username: '',
      photo: '',
      _id: '',
      registered_stores: [],
    },
    store_id: {
      name: '',
      photo: '',
      rating: [],
      _id: '',
      owner_id: '',
      platform: '',
    },
    author_id: {
      username: '',
      _id: '',
      photo: '',
    },
    review: {
      rating: '',
      _id: '',
      comments: [],
    },
  });

  // manually trigger rerender with state update
  const [render, setRender] = useState(false);

  // automatically focus comment box when reply button is clicked
  const commentBox = useRef(null);

  const [mounted, setMounted] = useState(true);
  const [opacity, setOpacity] = useState(0.6);
  const [submitted, setSubmitted] = useState(false);

  const transactionStatus = transaction.status;

  const [transactionBorders, setTransactionBorders] = useState('rgba(0,0,0,0)');

  useEffect(() => {
    const fetchTransaction = async (_id) => {
      const foundTransaction = await props.getTransaction(_id);
      console.log('transacton', props.transaction);
      if (mounted) {
        setTransaction(foundTransaction);
      }
    };
    if (_id) {
      if (props.transaction) {
        setTransaction(props.transaction);
      } else {
        fetchTransaction(_id);
      }
    }
    return () => {
      setMounted(false);
    };
  }, [_id]);

  useEffect(() => {
    // initialize aos library
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }, []);

  const getAuthor = (e) => {
    // logic to navigate to author page here
  };

  const addComment = (comment) => {};
  const actionTransaction = (e) => {
    const headers = {
      Authorization: `Bearer ${props.user_token}`,
    };
    switch (e.target.dataset.action) {
      case 'accept':
        setTransactionBorders('#83ffa8');
        setTimeout(() => {
          setTransactionBorders('rgba(0,0,0,0)');
        }, 2000);
        return axios
          .put(
            `${process.env.REACT_APP_API_PREFIX}/api/transactions/${_id}/action_status/accept`,
            null,
            { headers },
          )
          .then((res) => {
            if (res.status === 200) {
              setAlert(
                props.updater,
                'success',
                'Transaction accepted successfully',
              );
              setRender(!render);
              setTransaction(res.data.data);
            }
          })
          .catch((err) => {
            setAlert(props.updater, 'error', 'Error accepting transaction');
            setRender(!render);
          });

      case 'reject':
        setTransactionBorders('#ff8383');
        setTimeout(() => {
          setTransactionBorders('rgba(0,0,0,0)');
        }, 2000);
        return axios
          .put(
            `${process.env.REACT_APP_API_PREFIX}/api/transactions/${_id}/action_status/reject`,
            null,
            { headers },
          )
          .then((res) => {
            if (res.status === 200) {
              setAlert(
                props.updater,
                'success',
                'Transaction rejected successfully',
              );
              setTransaction(res.data.data);
            }
          })
          .catch((err) => {
            setAlert(props.updater, 'error', 'Error rejecting transaction');
          });
      case 'ignore':
        setTransactionBorders('white');
        setTimeout(() => {
          setTransactionBorders('rgba(0,0,0,0)');
        }, 2000);
        break;
      default:
        return null;
    }
  };

  const openTransaction = (url) => {
    const store_owner = transaction.store_owner_id._id;
    const transaction_id = transaction._id;
    return props.history.push(
      `/user/${store_owner}/transactions/${transaction_id}`,
    );
  };

  return (
    <>
      <ReactTooltip effect={'solid'} />
      <ParentContainer border={transactionBorders} id={`${transaction._id}`}>
        <Container>
          <TextContainer>
            <Text onClick={openTransaction}>{transaction.title}</Text>
            {transaction.review && transaction.review.rating > 0 && (
              <StarRatings
                starDimension={'10px'}
                starSpacing={'2px'}
                rating={transaction.rating}
                starRatedColor={props.theme.colors.yellow}
                starEmptyColor={props.theme.colors.dark_background}
              />
            )}
            {(!transaction.review || transaction.review.rating === 0) &&
              props.type === 'received' &&
              transactionStatus === 'new' && (
                <>
                  <Action
                    color={props.theme.colors.alert_text_green}
                    background={props.theme.colors.alert_background_green}
                    data-action={'accept'}
                    onClick={actionTransaction}
                  >
                    <FontAwesomeIcon
                      className="fa-icon rotate-tiny"
                      icon={faCheck}
                    />
                    Accept
                  </Action>
                  <Action
                    color={props.theme.colors.alert_text_red}
                    background={props.theme.colors.alert_background_red}
                    data-action={'reject'}
                    onClick={actionTransaction}
                  >
                    <FontAwesomeIcon className="fa-icon rotate" icon={faPlus} />
                    Reject
                  </Action>
                </>
              )}
            {(!transaction.review || transaction.review.rating === 0) &&
              props.type === 'given' &&
              transactionStatus === 'new' && (
                <Action color={'white'} background={'rgba(255, 255, 255, 0.2)'}>
                  Pending
                </Action>
              )}
            {(!transaction.review || transaction.review.rating === 0) &&
              transactionStatus === 'accepted' && (
                <Action
                  color={props.theme.colors.alert_text_green}
                  background={props.theme.colors.alert_background_green}
                >
                  Accepted
                </Action>
              )}
            {transactionStatus === 'rejected' && (
              <Action
                color={props.theme.colors.alert_text_red}
                background={props.theme.colors.alert_background_red}
              >
                Rejected
              </Action>
            )}
          </TextContainer>
          <Details>
            <ExpandGroup to={`#${transaction._id}`}>
              <FontAwesomeIcon className="fa-icon" icon={faPlus} />
              Expand Transaction
            </ExpandGroup>
            {props.type === 'received' && props.domain === 'owner' && (
              <Author>
                <TransactionImage
                  src={transaction.author_id.photo || DefaultImage}
                />
                <AuthorName>{transaction.author_id.username}</AuthorName>
              </Author>
            )}
            {props.type === 'given' && props.domain === 'owner' && (
              <Author>
                <TransactionImage
                  src={transaction.store_id.photo || DefaultImage}
                />
                <AuthorName>{transaction.store_id.name}</AuthorName>
              </Author>
            )}
            {props.type === 'neutral' && props.domain === 'visitor' && (
              <Author>
                <TransactionImage
                  src={transaction.store_id.photo || DefaultImage}
                />
                <AuthorName>{transaction.store_id.name}</AuthorName>
              </Author>
            )}
          </Details>
        </Container>
      </ParentContainer>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransaction: (id) => dispatch(getTransaction(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
  };
};

TransactionItem.propTypes = {
  user_id: PropTypes.string,
  review: PropTypes.object,
  user_photo: PropTypes.string,
  reviews: PropTypes.array,
  getReview: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(withTheme(withRouter(TransactionItem)));
