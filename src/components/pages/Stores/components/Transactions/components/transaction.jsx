import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, withTheme } from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fadeIn, slideInUp } from 'react-animations';
import AOS from 'aos';
import 'aos/dist/aos.css';
import StarRatings from 'react-star-ratings';
import Lottie from 'react-lottie';

import DefaultImage from '@/assets/images/icons/account/Profile.svg';
import emptyReview from '@/assets/images/lottie/emptyReview.json';
import AddReview from '../../Reviews/components/add';

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
  /* background: ${(props) => props.theme.colors.review_background}; */
  width: 100%;
  height: auto;
  position: relative;
  z-index: 9;
  box-sizing: border-box;
  font-size: 16px;
  transition: all 0.25s ease-in-out;
  margin: 0 auto;
  /* animation: 0.5s ${slideInUpAnimation}; */
 
`;

const Container = styled.div`
  width: 100%;
  height: auto;
`;

const TransactionProfile = styled.section`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 2rem 2rem 1rem 2rem;
  @media (max-width: 500px) {
    padding: 1rem 1rem;
  }
  @media (max-width: 300px) {
    padding: 1rem 0.5rem;
  }
`;

const StoreImage = styled.img`
  height: 150px;
  width: 150px;
  border-style: solid;
  border-width: 8px;
  border-radius: 50%;
  display: inline-block;
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
  @media (max-width: 900px) {
    height: 100px;
    width: 100px;
  }

  @media (max-width: 540px) {
    height: 75px;
    width: 75px;
    border-width: 3px;
  }
  @media (max-width: 380px) {
    height: 50px;
    width: 50px;
    border-width: 2px;
  }
`;
const TransactionDetails = styled.div`
  width: 100%;
  display: inline-block;
  display: inherit;
  flex-flow: column nowrap;
  margin-left: auto;
  box-sizing: border-box;
  padding: 1rem;
  @media (max-width: 900px) {
    width: calc(100% - 132px);
  }

  @media (max-width: 540px) {
    width: calc(100% - 91px);
  }

  @media (max-width: 380px) {
    width: calc(100% - 58px);
  }
`;
const TransactionDetailsContainer = styled.div`
  max-width: 880px;
  height: auto;
  margin: 0px auto;
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
    font-size: 2rem;
    color: ${(props) => props.theme.colors.yellow};
    @media (max-width: 500px) {
      font-size: 1rem;
    }
  }
  h2 {
    display: inline-block;
    font-family: 'Noto Sans Regular';
    font-weight: 300;
    font-size: 2rem;
    color: ${(props) => props.theme.colors.saturated_contrast};
    margin: 0;
    @media (max-width: 500px) {
      font-size: 1rem;
    }
  }
`;

const Requested = styled.h5`
  margin: 8px 0px 4px 0px;
  font-family: 'Noto Sans Regular';
  font-weight: 300;
  font-size: 12px;
  color: ${(props) => props.theme.colors.saturated_contrast};
  span {
    font-family: 'Noto Sans Regular';
    font-weight: 300;
    font-size: 16px;
    color: ${(props) => props.theme.colors.yellow};
    display: inline-block;
    margin: 0;
  }
  @media (max-width: 500px) {
    margin: 2px 0px;
  }
`;
const Handle_And_Rating = styled.div`
  margin: 4px 0px;
  @media (max-width: 500px) {
    margin: 2px 0px;
  }
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
  @media (max-width: 500px) {
    padding: 2px 0px;
  }
`;

const Tags = styled.span`
  padding: 8px;
  background: ${(props) => props.background};
  margin: 1rem auto;
  box-shadow: 2px 4px 10px ${(props) => props.theme.colors.dark_background_20};
  color: ${(props) => props.color};
  &:first-child {
    margin-left: 0px;
  }
  width: 100%;
  @media (max-width: 500px) {
    margin: 0.5rem;
    padding: 2px;
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
  box-sizing: border-box;
  padding: 2rem 1rem 2rem 2rem;
  @media (max-width: 500px) {
    padding: 1rem 1rem;
  }
  @media (max-width: 300px) {
    padding: 1rem 0.5rem;
  }
`;

const TransactionPage = (props) => {
  const { match } = props;
  const _id = match.params.transaction_id;
  const [actioned, setActioned] = useState(false);
  const [color, setColor] = useState('');
  const [background, setBackground] = useState('');
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
    title: '',
    description: '',
    _id: '',
  });

  const transaction_found = transaction && transaction._id !== '';
  const transaction_id = transaction_found ? transaction._id : '';
  const review_id =
    transaction_found && transaction.review.length > 0
      ? transaction.review[0]._id
      : 0;

  // manually trigger rerender with state update
  const [render, setRender] = useState(false);

  // automatically focus comment box when reply button is clicked
  const commentBox = useRef(null);

  const [mounted, setMounted] = useState(true);
  const [opacity, setOpacity] = useState(0.6);
  const [submitted, setSubmitted] = useState(false);

  const transactionRating = transaction ? Math.ceil(transaction.rating) : 0;

  const [transactionBorders, setTransactionBorders] = useState('rgba(0,0,0,0)');

  const getColor = () => {
    const status = transaction.status;
    switch (status) {
      case 'new':
        setColor('rgba(255,255,255,1)');
        setBackground('rgba(255,255,255,0.2)');
        break;
      case 'accepted':
        setColor(props.theme.colors.alert_text_green);
        setBackground(props.theme.colors.alert_background_green);
        break;
      case 'rejected':
        setColor(props.theme.colors.alert_text_red);
        setBackground(props.theme.colors.alert_background_red);
        break;
    }
  };

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

    getColor();
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
  const transaction_review = transaction_found
    ? transaction.review[0]
    : { _id: '' };
  return (
    <>
      {transaction_found && (
        <ParentContainer border={transactionBorders} id={`${transaction._id}`}>
          <Container>
            <TransactionProfile>
              <TransactionDetailsContainer>
                <TransactionDetails>
                  <NameBar>
                    {transaction.title && <h1>{transaction.title}</h1>}
                  </NameBar>
                  <Requested>
                    Transaction opened by{' '}
                    <span>{transaction.author_id.username}</span>
                  </Requested>
                  <Handle_And_Rating>
                    <Rating>
                      <StarRatings
                        starDimension={'16px'}
                        starSpacing={'4px'}
                        rating={transactionRating}
                        starRatedColor={props.theme.colors.yellow}
                        starEmptyColor={props.theme.colors.light_background}
                        svgIconPath="M7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15ZM7.5 14.0693C3.87186 14.0693 0.930675 11.1281 0.930675 7.5C0.930675 3.87186 3.87186 0.930675 7.5 0.930675C11.1281 0.930675 14.0693 3.87186 14.0693 7.5C14.0693 11.1281 11.1281 14.0693 7.5 14.0693ZM4.54109 5.13201H9.01042C9.01042 5.13201 8.45738 6.09041 8.32765 6.29659C7.48197 7.59902 5.49551 6.943 4.54109 6.02427C3.58667 5.10555 4.54109 5.13201 4.54109 5.13201ZM5.65498 11.281L9.22574 5.13201C9.22574 5.13201 11.2594 5.25958 9.5749 7.66756C7.8904 10.0755 5.65498 11.281 5.65498 11.281Z"
                        svgIconViewBox="0 0 15 15"
                      />
                    </Rating>
                  </Handle_And_Rating>
                  <Bio>
                    {transaction.store_id.description
                      ? transaction.store_id.description
                      : 'No store description'}
                  </Bio>
                </TransactionDetails>
              </TransactionDetailsContainer>
            </TransactionProfile>
            <ReviewContainer>
              {transaction.review.length > 0 && (
                <ReviewItem
                  user_id={props.loggedinUser._id}
                  user_photo={props.loggedinUser.photo}
                  id={transaction_review._id}
                  domain="transaction"
                  updater={props.updater}
                  user_token={props.loggedinUser.jwt}
                />
              )}
              {transaction.review.length === 0 &&
                props.loggedinUser._id !== transaction.author_id._id && (
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

              {transaction.review.length === 0 &&
                transaction.author_id._id === props.loggedinUser._id &&
                transaction.status !== 'completed' && (
                  <>
                    <EmptyStateText>Unavailable!</EmptyStateText>
                    <EmptyStateSubtext>
                      Transaction is not yet completed by vendor.
                    </EmptyStateSubtext>
                  </>
                )}
              {transaction.review.length === 0 &&
                transaction.author_id._id === props.loggedinUser._id &&
                transaction.status === 'completed' && (
                  <AddReview
                    updater={props.updater}
                    loggedinUser={props.loggedinUser}
                    store_id={props.store_id}
                    store_owner_id={props.store_owner_id}
                    transaction_id={transaction_id}
                  />
                )}
            </ReviewContainer>
          </Container>
        </ParentContainer>
      )}
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
