import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, withTheme } from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fadeIn, slideInUp } from 'react-animations';
import AOS from 'aos';
import 'aos/dist/aos.css';
import StarRatings from 'react-star-ratings';
import Lottie from 'react-lottie';

import DefaultImage from '@/assets/images/icons/account/Profile.svg';
import emptyReview from '@/assets/images/lottie/emptyReview.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faStore,
  faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons';
import ReviewItem from '@/components/UI/interface/account/Review.jsx';

import { getTransaction } from '@/actions/transaction';
import { connect } from 'react-redux';
import Alert from '@/components/widgets/UI/Alert';
import setAlert from '@/assets/helperFunctions/alerts';

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

const ProfileActions = styled.div`
  height: 50px;
  width: 100%;
  margin: 16px auto;
  display: flex;
  justify-content: space-between;
`;

const Action = styled(Link)`
  display: inline-block;
  height: 100%;
  line-height: 50px;
  width: ${(props) => (props.width ? props.width : '48%')};
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.light_background};
  color: ${(props) =>
    props.borders
      ? `${props.theme.colors.yellow}`
      : `${props.theme.colors.saturated_contrast}`};
  border: ${(props) =>
    props.borders ? `1px solid ${props.theme.colors.yellow}` : 'none'};
  border-radius: 4px;
  transition: all 0.25s ease-in-out;
  text-decoration: none;
  .fa-icon {
    position: relative;
    left: 0px;
    margin-left: 4px;
    transition: all 0.25s ease-in-out;
    opacity: 0;
    color: ${(props) => props.theme.colors.dark_background};
  }
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.yellow};
    color: ${(props) => props.theme.colors.dark_background};
    width: ${(props) => (props.hover_width ? props.hover_width : '48.5%')};
    box-shadow: 0px 4px 10px ${(props) => props.theme.colors.yellow_20};
    .fa-icon {
      left: 16px;
      margin-left: 12px;
      opacity: 1;
    }
  }
`;
const TransactionProfile = styled.section`
  width: 100%;
  height: auto;
  background: ${(props) => {
    return props.background_cover_image
      ? `url(${props.background_cover_image})`
      : props.theme.colors.dark_background;
  }};
  /* margin: 40px 0px; */
`;

const StoreImage = styled.img`
  height: 150px;
  width: 150px;
  border-style: solid;
  border-width: 8px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  top: 10%;
  border-color: ${(props) => {
    switch (props.platform) {
      case 'facebook':
        return '#395185';

      case 'twitter':
        return '#55acee';

      case 'instagram':
        return '#d53f90';

      default:
        return `${props.theme.colors.yellow}`;
    }
  }};
`;
const TransactionDetails = styled.div`
  width: calc(100% - 182px);
  display: inline-block;
  display: inherit;
  flex-flow: column nowrap;
  margin-left: auto;
  box-sizing: border-box;
  padding: 16px;
  border-bottom: 2px solid ${(props) => props.theme.colors.light_background};
`;
const TransactionDetailsContainer = styled.div`
  max-width: 880px;
  height: auto;
  margin: 0px auto 40px auto;
  display: flex;
  flex-flow: row nowrap;
`;
const NameBar = styled.span`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0px;
  h1 {
    margin: 0;
    display: inline-block;
    font-family: 'Noto Sans Regular';
    font-size: 32px;
    color: ${(props) => props.theme.colors.yellow};
  }
  h2 {
    display: inline-block;
    font-family: 'Noto Sans Regular';
    font-weight: 300;
    font-size: 32px;
    color: ${(props) => props.theme.colors.saturated_contrast};
    margin: 0;
  }
`;

const Requested = styled.h5`
  margin: 8px 0px 4px 0px;
  font-family: 'Noto Sans Regular';
  font-weight: 300;
  font-size: 12px;
  color: ${(props) => props.theme.colors.saturated_contrast};
  h6 {
    font-family: 'Noto Sans Regular';
    font-weight: 300;
    font-size: 16px;
    color: ${(props) => props.theme.colors.yellow};
    display: inline-block;
    margin: 0;
  }
`;
const Handle_And_Rating = styled.div`
  margin: 8px 0px;
`;
const Handle = styled.span`
  margin: 0;
  font-family: 'Josefin Sans Regular';
  color: ${(props) => props.theme.colors.saturated_contrast};
`;
const Rating = styled.span`
  margin: 0;
`;
const Bio = styled.p`
  margin: 0;
  max-height: 64px;
  padding: 8px 0px;
  font-size: 14px;
  font-family: 'Josefin Sans Light';
  color: ${(props) => props.theme.colors.saturated_contrast};
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const Tags = styled.div`
  margin: 16px 0px;
`;
const TagItem = styled.span`
  padding: 8px;
  background: ${(props) => props.theme.colors.light_background};
  margin-left: 8px;
  box-shadow: 2px 4px 10px ${(props) => props.theme.colors.dark_background_20};
  color: ${(props) => props.theme.colors.saturated_contrast};
  &:first-child {
    margin-left: 0px;
  }
`;
const EmptyStateText = styled.h5`
  text-align: center;
  color: ${(props) => props.theme.colors.saturated_contrast};
  margin: 16px 0px 8px 0px;
  width: 100%;
`;
const EmptyStateSubtext = styled.p`
  font-size: 12px;
  text-align: center;
  width: 100%;
  margin: 0px 0px 40px 0px;
  color: ${(props) => props.theme.colors.saturated_contrast};
`;

const ReviewContainer = styled.div`
  width: 100%;
  height: auto;
  background: ${(props) => props.theme.colors.dark_background};
  padding: 16px 0px;
`;

const TransactionPage = (props) => {
  const { match } = props;
  const _id = match.params.transaction_id;
  const [actioned, setActioned] = useState(false);
  const [transaction, setTransaction] = useState({
    store_id: {
      photo: '',
      _id: '',
      name: '',
    },
    author_id: {
      photo: '',
      _id: '',
      name: '',
    },
  });

  // manually trigger rerender with state update
  const [render, setRender] = useState(false);

  // automatically focus comment box when reply button is clicked
  const commentBox = useRef(null);

  const [mounted, setMounted] = useState(true);
  const [opacity, setOpacity] = useState(0.6);
  const [submitted, setSubmitted] = useState(false);

  //   const transactionRating = Math.ceil(transaction.rating);
  const transactionRating = 4;

  const [transactionBorders, setTransactionBorders] = useState('rgba(0,0,0,0)');

  useEffect(() => {
    const fetchTransaction = async (_id) => {
      const foundTransaction = await props.getTransaction(_id);
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
  const emptyReviewLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyReview,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <>
      <ParentContainer border={transactionBorders} id={`${transaction._id}`}>
        <Container>
          <TransactionProfile>
            <TransactionDetailsContainer>
              <StoreImage
                platform={transaction.store_id.platform || 'local'}
                src={transaction.store_id.photo || DefaultImage}
              />
              <TransactionDetails>
                <NameBar>
                  {transaction.title && <h1>{transaction.title}</h1>}
                </NameBar>
                <Requested>
                  Transaction opened by{' '}
                  <h6>{transaction.author_id.username}</h6>
                </Requested>
                <Handle_And_Rating>
                  <Rating>
                    <StarRatings
                      starDimension={'16px'}
                      starSpacing={'4px'}
                      rating={transactionRating}
                      starRatedColor={props.theme.colors.yellow}
                      starEmptyColor={props.theme.colors.light_background}
                    />
                  </Rating>
                </Handle_And_Rating>
                <Bio>
                  {transaction.store_id.description
                    ? transaction.store_id.description
                    : 'No store description'}
                </Bio>
                <Tags>
                  {transaction.store_id.categories &&
                    transaction.store_id.categories === 0 && (
                      <EmptyStateText>No Store Category Tags</EmptyStateText>
                    )}
                  {transaction.store_id.categories &&
                    transaction.store_id.categories.map((category) => {
                      return <TagItem key={category}>{category}</TagItem>;
                    })}
                </Tags>

                <ProfileActions>
                  <Action to={'#'}>
                    View Store
                    <FontAwesomeIcon className="fa-icon" icon={faStore} />
                  </Action>
                  <Action to={'#'}>
                    Send Mail
                    <FontAwesomeIcon className="fa-icon" icon={faEnvelope} />
                  </Action>
                </ProfileActions>
              </TransactionDetails>
            </TransactionDetailsContainer>
          </TransactionProfile>
          <ReviewContainer>
            {transaction.review && (
              <ReviewItem
                user_id={props.loggedinUser._id}
                user_photo={props.loggedinUser.photo}
                review={transaction.review}
                id={transaction.review._id}
                updater={props.updater}
                user_token={props.loggedinUser.jwt}
              />
            )}
            {!transaction.review && (
              <>
                <Lottie
                  options={emptyReviewLottieOptions}
                  height={300}
                  width={300}
                />
                <EmptyStateText>No review!</EmptyStateText>
                <EmptyStateSubtext>
                  Transaction has not been reviewed.
                </EmptyStateSubtext>
              </>
            )}
            {!transaction.review &&
              transaction.author_id._id === props.loggedinUser && (
                <ProfileActions>
                  <Action
                    data-aos="fade-up"
                    data-aos-duration="250"
                    to={'#'}
                    borders="true"
                    width="200px"
                    hover_width="220px"
                  >
                    Review your transaction
                    <FontAwesomeIcon
                      className="fa-icon"
                      icon={faLongArrowAltRight}
                    />
                  </Action>
                </ProfileActions>
              )}
          </ReviewContainer>
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

TransactionPage.propTypes = {
  //   user_id: PropTypes.string,
  //   review: PropTypes.object,
  //   user_photo: PropTypes.string,
  //   reviews: PropTypes.array,
  //   getReview: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(withTheme(withRouter(TransactionPage)));
