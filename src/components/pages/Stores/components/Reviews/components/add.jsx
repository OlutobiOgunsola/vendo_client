import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fadeIn } from 'react-animations';
import InputRow from '@/components/widgets/UI/InputRow';
import Input from '@/components/widgets/UI/Input';
import setAlert from '@/assets/helperFunctions/alerts';
import Alert from '@/components/widgets/UI/Alert';
import { withRouter } from 'react-router';

const fadeInUpAnimation = keyframes`${fadeIn}`;

const ParentContainer = styled.div`
  width: 100%;
  height: auto;
  font-size: 16px;
  position: relative;
  z-index: 9;
  box-sizing: border-box;
  transition: all 0.25s ease-in-out;
`;

const Container = styled.div`
  width: 100%;

  hr {
    width: 100%;
    height: 0.1px;
    margin: 2rem auto;
    border: none;
    opacity: 0.6;
    background: ${(props) => props.theme.colors.alternate_light_background_10};
  }
`;

const Header = styled.span`
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
`;

// section headlines
const S_Head = styled.h3`
  display: inline;
  font-family: 'Noto Sans Regular';
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.saturated_font_darker};
  margin: 0;
`;

const Button = styled.button`
  height: 2.5rem;
  width: 6rem;
  background: ${(props) => props.theme.colors.dark_background};
  margin: 1rem auto;
  border: solid 1px ${(props) => props.theme.colors.saturated_contrast};
  border-radius: 4px;
  color: ${(props) => props.theme.colors.saturated_contrast};
  transition: all 0.25s ease-in-out;
  font-family: 'Josefin Sans Light';
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.dark_background};
    background: white;
  }
`;
const AddReview = (props) => {
  const [transaction, setTransaction] = useState('');
  const [review, setReview] = useState('');
  const [token, setToken] = useState('');
  const [alerts, addAlert] = useState([]);
  const [rating, setRating] = useState(1);
  const store_owner_id = props.store_owner_id;
  const transaction_id = props.transaction_id;

  const { match } = props;

  const handleReview = (review) => {
    return setReview((prev) => {
      return review;
    });
  };

  const handleRating = (rating) => {
    return setRating((prev) => {
      return rating;
    });
  };

  const handleToken = (token) => {
    return setToken((prev) => {
      return token;
    });
  };

  const submit = () => {
    if (!review || !token) {
      return setAlert(addAlert, 'error', 'Please fill all fields');
    }
    const reviewObj = {};
    reviewObj.review = review;
    reviewObj.rating = rating || 1;
    reviewObj.token = token;
    reviewObj.recipient_id = store_owner_id;
    reviewObj.transaction_id = transaction_id;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${props.loggedinUser.jwt}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_PREFIX}/api/reviews/add`, reviewObj, {
        headers,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          props.history.push(`${match.url}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ParentContainer id="add_transaction">
      {alerts.map((alert) => {
        return (
          <Alert type={alert.type} key={alert.text}>
            {alert.text}
          </Alert>
        );
      })}
      <Container>
        <Header>
          <S_Head>REVIEW TRANSACTION</S_Head>
        </Header>
        <hr />
        <InputRow label="Review">
          <Input
            inputType={'textarea'}
            useLabelAnimation={true}
            left="14px"
            handleChange={handleReview}
            value={review}
            valid={() => {
              return review !== '';
            }}
            class={{
              name: 'transaction_description',
              type: 'textarea',
              columns: '30',
              rows: '30',
              height: '100',
              width: '350',
              fill: `${props.theme.colors.alternate_light_background_10}`,
              color: `${props.theme.colors.saturated_contrast_60}`,
              p_color: `${props.theme.colors.saturated_contrast_20}`,
              padding: '8px',
              placeholder: 'Describe your experience with this store',
              label: { display: 'none' },
            }}
          />
        </InputRow>
        <InputRow label="Rating">
          <Input
            useLabelAnimation={true}
            inputType={'select'}
            left="14px"
            handleChange={handleRating}
            value={rating}
            class={{
              name: 'review_rating',
              fill: `${props.theme.colors.alternate_light_background_10}`,
              color: `${props.theme.colors.saturated_contrast_60}`,
              p_color: `${props.theme.colors.saturated_contrast_20}`,
              padding: '8px',
              placeholder: '',
              label: { display: 'none' },
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Input>
        </InputRow>
        <InputRow label="Token">
          <Input
            inputType={'textarea'}
            useLabelAnimation={true}
            left="14px"
            handleChange={handleToken}
            value={token}
            class={{
              name: 'transaction_token',
              type: 'input',
              fill: `${props.theme.colors.alternate_light_background_10}`,
              color: `${props.theme.colors.saturated_contrast_60}`,
              p_color: `${props.theme.colors.saturated_contrast_20}`,
              padding: '8px',
              placeholder: 'Paste token. It is in your mailbox',
              label: { display: 'none' },
            }}
          />
        </InputRow>
        <InputRow displayLabel={false}>
          <label htmlFor={'submit-button'} style={{ display: 'none' }}>
            Submit Review
          </label>
          <Button name={'submit-button'} onClick={submit}>
            Submit
          </Button>
        </InputRow>
      </Container>
    </ParentContainer>
  );
};

AddReview.propTypes = {};

export default withTheme(withRouter(AddReview));
