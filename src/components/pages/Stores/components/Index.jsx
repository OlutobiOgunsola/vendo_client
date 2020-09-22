import React from 'react';
import styled, { keyframes, withTheme } from 'styled-components';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { fadeIn } from 'react-animations';
import Lottie from 'react-lottie';

import emptyReview from '@/assets/images/lottie/emptyReview.json';

import ReviewItem from '@/components/UI/interface/account/Review.jsx';
import TransactionItem from '@/components/UI/interface/account/Transaction.jsx';
import defaultStoreImage from '@/assets/images/store/DefaultImage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { sort } from '@/assets/helperFunctions/sort';

const storeAnimation = keyframes(fadeIn);

const ParentContainer = styled.div`
  max-width: 880px;
  margin: 0 auto;
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

// section headlines
const S_Head = styled.h3`
  display: block;
  font-family: 'Noto Sans Regular';
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.saturated_font_darker};
  margin: 16px 0px 32px 0px;
`;

const Section = styled.section`
  max-width: 880px;
  height: auto;
  margin: 40px auto 24px auto;
  box-sizing: border-box;
  padding: 32px;
  border: none;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.2);
  /* box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.3); */

  hr {
    width: 100%;
    height: 0.1px;
    margin: 32px auto;
    border: none;
    opacity: 0.6;
    background: ${(props) => props.theme.colors.alternate_light_background_10};
  }
`;

const ProfileActions = styled.div`
  height: 50px;
  width: 100%;
  margin: 16px auto;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const Action = styled(Link)`
  position: relative;
  z-index: 9;
  display: inline-block;
  height: 100%;
  line-height: 50px;
  width: ${(props) => (props.width ? props.width : '48%')};
  margin: 0 auto;
  text-align: center;
  animation: 0.25s ${storeAnimation};
  box-sizing: border-box;
  color: ${(props) =>
    props.borders
      ? `${props.theme.colors.yellow}`
      : `${props.theme.colors.saturated_contrast}`};
  border: ${(props) =>
    props.borders ? `1px solid ${props.theme.colors.yellow}` : 'none'};
  border-radius: 4px;
  transition: all 0.5s ease-in-out;
  text-decoration: none;
  .fa-icon {
    width: 0px;
    position: relative;
    left: 0px;
    margin-left: 0px;
    transition: all 1s ease-in-out;
    opacity: 0;
    color: ${(props) => props.theme.colors.dark_background};
    display: none;
  }
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.dark_background};
    /* box-shadow: 0px 4px 10px ${(props) => props.theme.colors.yellow_20}; */
    .fa-icon {
      width: 24px;
      left: 8px;
      margin-left: 0px;
      opacity: 1;
      display: inline-block;
    }
    border: none;
  }
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    top: -0.5px;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${(props) => props.theme.colors.yellow};
    z-index: -1;
    transform: scaleX(0);
    transition-property: transform;
    -webkit-transform-origin: 0 50%;
    transform-origin: 0 50%;
    -webkit-transition-property: transform;
    transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  &:hover:before {
    transform: scaleX(1);
  }
`;

const StoreIndex = (props) => {
  const match = props.match;
  const store = props.store;
  const emptyReviewLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyReview,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const sortedReviews = store.reviews.sort((a, b) => {
    return a.rating - b.rating;
  });

  const sortedTransactions = store.transactions.sort((a, b) => {
    if (a.review) {
      return a.review.rating - b.review.rating;
    } else {
      return a - b;
    }
  });

  const topReview = sortedReviews ? sortedReviews[0] : {};
  const topTransaction = sortedTransactions ? sortedTransactions[0] : {};

  return (
    <ParentContainer>
      <Section>
        <S_Head>TOP REVIEW</S_Head>
        <hr />
        {topReview && (
          <ReviewItem
            user_id={props.loggedinUser._id}
            user_photo={props.loggedinUser.photo}
            review={topReview}
            id={topReview._id}
            updater={props.updater}
            user_token={props.loggedinUser.jwt}
          />
        )}
        {!topReview && (
          <>
            <Lottie
              options={emptyReviewLottieOptions}
              height={300}
              width={300}
            />
            <EmptyStateText>Be the first to leave a review!</EmptyStateText>
            <EmptyStateSubtext>Open a transaction below</EmptyStateSubtext>
          </>
        )}
        {topReview && (
          <ProfileActions>
            <Action
              data-aos="fade-up"
              data-aos-duration="250"
              to={'#'}
              borders="true"
              width="200px"
              hover_width="220px"
            >
              View all reviews
              <FontAwesomeIcon className="fa-icon" icon={faLongArrowAltRight} />
            </Action>
          </ProfileActions>
        )}
        {!topReview && (
          <ProfileActions>
            <Action
              data-aos="fade-up"
              data-aos-duration="250"
              to={'#'}
              borders="true"
              width="200px"
              hover_width="220px"
            >
              Begin a transaction
              <FontAwesomeIcon className="fa-icon" icon={faLongArrowAltRight} />
            </Action>
          </ProfileActions>
        )}
      </Section>
      <Section>
        <S_Head>RECENT REVIEWS</S_Head>
        <hr />
        {store.reviews
          .sort(sort('latestFirst'))
          .slice(0, 4)
          .map((review) => {
            return (
              <ReviewItem
                user_id={props.loggedinUser._id}
                user_photo={props.loggedinUser.photo}
                review={review}
                id={review._id}
                key={review._id}
                updater={props.updater}
                user_token={props.loggedinUser.jwt}
              />
            );
          })}
        {store.reviews.length === 0 && (
          <>
            <Lottie
              options={emptyReviewLottieOptions}
              height={300}
              width={300}
            />
            <EmptyStateText>Be the first to leave a review!</EmptyStateText>
            <EmptyStateSubtext>Open a transaction below</EmptyStateSubtext>
          </>
        )}
      </Section>
      <Section>
        <S_Head>TOP TRANSACTION</S_Head>
        <hr />
        {topTransaction && (
          <TransactionItem
            user_id={props.loggedinUser._id}
            user_photo={props.loggedinUser.photo}
            id={topTransaction._id}
            updater={props.updater}
            user_token={props.loggedinUser.jwt}
          />
        )}
        {!topTransaction && (
          <>
            <Lottie
              options={emptyReviewLottieOptions}
              height={300}
              width={300}
            />
            <EmptyStateText>No transactions</EmptyStateText>
            <EmptyStateSubtext>Damn! Help a brother out.</EmptyStateSubtext>
          </>
        )}
        <ProfileActions>
          {topTransaction && (
            <Action
              to={`${match.url}/transactions`}
              borders="true"
              width="200px"
              hover_width="220px"
            >
              View all transactions
              <FontAwesomeIcon className="fa-icon" icon={faLongArrowAltRight} />
            </Action>
          )}
          {!topTransaction && (
            <Action to={'#'} borders="true" width="200px" hover_width="220px">
              Begin a transaction
              <FontAwesomeIcon className="fa-icon" icon={faLongArrowAltRight} />
            </Action>
          )}
        </ProfileActions>
      </Section>
    </ParentContainer>
  );
};

StoreIndex.propTypes = {
  user: PropTypes.object,
  updater: PropTypes.func,
  loggedinUser: PropTypes.object,
};

export default withTheme(withRouter(StoreIndex));
