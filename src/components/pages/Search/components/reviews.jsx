import React from 'react';
import styled, { withTheme, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { slideInUp } from 'react-animations';
import ReviewItem from '@/components/UI/interface/account/Review.jsx';

const slideIn = keyframes`${slideInUp}`;

const ParentContainer = styled.div`
  width: 100%;
  font-size: 16px;
`;

const Reviews = (props) => {
  const Reviews = props.dataset;
  console.log('user', props.loggedinUser);
  return (
    <ParentContainer>
      {Reviews.map((review) => {
        console.log('review', review);
        return (
          <ReviewItem
            user_id={props.loggedinUser ? props.loggedinUser._id : ''}
            user_photo={props.loggedinUser ? props.loggedinUser.photo : ''}
            id={review._id}
            review={review}
            updater={props.updater}
            user_token={props.loggedinUser ? props.loggedinUser.jwt : ''}
          />
        );
      })}
    </ParentContainer>
  );
};

Reviews.propTypes = {
  dataset: PropTypes.array,
};

export default withRouter(withTheme(Reviews));
