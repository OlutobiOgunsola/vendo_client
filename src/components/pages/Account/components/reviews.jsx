import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReviewItem from '@/components/UI/interface/account/Review';
import { useState } from 'react';
import Loader from '@/components/widgets/UI/Loader';
import defaultPhoto from '@/assets/images/icons/account/Profile.svg';

const ParentContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Reviews = (props) => {
  const [r_reviews, setR_Reviews] = useState([]);
  const [i_reviews, setI_Reviews] = useState([]);
  const [mounted, setMounted] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const user = props.user;
  useEffect(() => {
    if (mounted) {
      // if (!props.user.user.loggedIn) {
      //   setLoading(true);
      // } else {
      //   setLoading(false);
      // }
      setR_Reviews(props.user.user.r_reviews);
      setI_Reviews(props.user.user.i_reviews);
    }
    return () => {
      setMounted(false);
    };
  }, [user]);

  return (
    <ParentContainer>
      <Container>
        {isLoading && <Loader />}
        {!isLoading && (
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
            {r_reviews.length === 0 && <h1>No reviews yet</h1>}
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

export default Reviews;
