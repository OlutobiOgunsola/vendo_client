import React, { useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import { useState } from 'react';

import Loader from '@/components/widgets/UI/Loader';
import defaultPhoto from '@/assets/images/icons/account/Profile.svg';
import ReviewItem from '@/components/UI/interface/account/Review';
import emptyReview from '@/assets/images/lottie/emptyReview.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const ParentContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Collections = styled.span`
  display: block;
`;

const Collection = styled.span`
  display: inline-block;
  font-size: 12px;
  width: 80px;
  text-align: center;
  line-height: 30px;
  box-sizing: border-box;
  padding: 4px;
  opacity: ${(props) => props.opacity};
  color: ${(props) => props.theme.colors.saturated_font_darker};
  transition: all 0.25s ease-in-out;
  &:first-child {
    padding-left: 0px;
  }
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  .fa-icon {
    height: 12px;
    width: 12px;
    color: ${(props) => props.theme.colors.saturated_contrast};
  }
  .received {
    transform: rotate(90deg);
  }
  .given {
    transform: rotate(270deg);
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
  margin: 2px 0px;
  color: ${(props) => props.theme.colors.saturated_contrast};
`;
const Reviews = (props) => {
  const [collection, setCollection] = useState('received');
  const [r_reviews, setR_Reviews] = useState([]);
  const [i_reviews, setI_Reviews] = useState([]);
  const [mounted, setMounted] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [g_opacity, setG_Opacity] = useState(0.4);
  const [r_opacity, setR_Opacity] = useState(0.4);

  const getOpacity = (field = 'received') => {
    if (collection === 'received') {
      setG_Opacity(0.4);
      return setR_Opacity(1);
    } else if (collection === 'given') {
      setR_Opacity(0.4);
      return setG_Opacity(1);
    }
  };

  const user = props.user;
  useEffect(() => {
    if (mounted) {
      setR_Reviews(props.user.user.r_reviews);
      setI_Reviews(props.user.user.i_reviews);
    }
    return () => {
      setMounted(false);
    };
  }, [user]);

  useEffect(() => {
    getOpacity();
  }, [collection]);

  const LottieOptions = {
    loop: false,
    autoplay: true,
    animationData: emptyReview,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // console.log('i reviews', i_reviews);
  // console.log('r reviews', r_reviews);

  return (
    <ParentContainer>
      <Container>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <Collections>
              <Collection
                opacity={r_opacity}
                onClick={() => {
                  return setCollection('received');
                }}
              >
                <FontAwesomeIcon
                  className="fa-icon received"
                  icon={faSignInAlt}
                />{' '}
                Received
              </Collection>
              <Collection
                opacity={g_opacity}
                onClick={() => {
                  return setCollection('given');
                }}
              >
                <FontAwesomeIcon
                  className="fa-icon given"
                  icon={faSignOutAlt}
                />{' '}
                Given
              </Collection>
            </Collections>
            {collection === 'received' && r_reviews && (
              <>
                {r_reviews.map((review) => {
                  return (
                    <ReviewItem
                      user_id={props.user.user._id}
                      user_photo={props.user.user.photo || defaultPhoto}
                      review={review}
                      key={review._id}
                      id={review._id}
                      updater={props.updater}
                      user_token={props.user.user.jwt}
                    />
                  );
                })}
                {r_reviews.length === 0 && (
                  <>
                    <Lottie options={LottieOptions} height={300} width={300} />
                    <EmptyStateText
                      style={{
                        textAlign: 'center',
                        color: `${props.theme.colors.saturated_contrast}`,
                      }}
                    >
                      No reviews yet.
                    </EmptyStateText>
                    <EmptyStateSubtext>
                      Receive transactions to receive reviews.
                    </EmptyStateSubtext>
                  </>
                )}
              </>
            )}
            {collection === 'given' && i_reviews && (
              <>
                {i_reviews.map((review) => {
                  return (
                    <ReviewItem
                      user_id={props.user.user._id}
                      user_photo={props.user.user.photo || defaultPhoto}
                      review={review}
                      key={review._id}
                      id={review._id}
                      updater={props.updater}
                      user_token={props.user.user.jwt}
                    />
                  );
                })}
                {i_reviews.length === 0 && (
                  <>
                    <Lottie options={LottieOptions} height={300} width={300} />
                    <EmptyStateText
                      style={{
                        textAlign: 'center',
                        color: `${props.theme.colors.saturated_contrast}`,
                      }}
                    >
                      No reviews yet.
                    </EmptyStateText>
                    <EmptyStateSubtext>
                      Add a transaction before you can add a review.
                    </EmptyStateSubtext>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </ParentContainer>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.array,
  updater: PropTypes.func,
  loading: PropTypes.func,
  user: PropTypes.object,
};

export default withTheme(Reviews);
