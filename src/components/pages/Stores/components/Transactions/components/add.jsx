import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fadeIn } from 'react-animations';
import InputRow from '@/components/widgets/UI/InputRow';
import Input from '@/components/widgets/UI/Input';
import Button from '@/components/UI/buttons/Button';
import setAlert from '@/assets/helperFunctions/alerts';
import withUser from '@/components/higher-order/withUser';


const fadeInUpAnimation = keyframes`${fadeIn}`;

const ParentContainer = styled.div`
  width: 100%;
  height: auto;
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
const AddTransaction = (props) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const store_id = props.store_id;
  const owner = props.owner;
  const handle = props.handle;

  const handleTitle = (title) => {
    return setTitle((prev) => {
      return title;
    });
  };

  const handleDesc = (desc) => {
    return setDesc((prev) => {
      return desc;
    });
  };

  useEffect(() => {
    if (owner) {
      props.history.push(`/stores/${handle}`);
    }
  }, [owner]);

  const submit = () => {
    if (!title || !desc) {
      return setAlert(
        props.updater,
        'error',
        'Please fill out title and description',
      );
    }

    console.log('store id', store_id);
    const transactionObj = {};
    transactionObj.title = title;
    transactionObj.description = desc;
    transactionObj.store_id = store_id;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        props.loggedinUser ? props.loggedinUser.jwt : ''
      }`,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_PREFIX}/api/transactions/add`,
        transactionObj,
        {
          headers,
        },
      )
      .then((res) => {
        if (res.status === 200) {
          const _id = res.data.data._id;
          setAlert(props.updater, 'success', 'Successfully added transaction.');
          props.history.push(`/stores/${handle}/transactions/${_id}`);
        }
      })
      .catch((err) => {
        setAlert(props.updater, 'error', 'Error adding transaction.');
      });
  };

  return (
    <ParentContainer id="add_transaction">
      <Container>
        <Header>
          <S_Head>ADD TRANSACTION</S_Head>
        </Header>
        <hr />
        <InputRow label="Title">
          <Input
            useLabelAnimation={true}
            inputType={'input'}
            left="14px"
            handleChange={handleTitle}
            value={title}
            class={{
              name: 'transaction_title',
              type: 'text',
              fill: `${props.theme.colors.alternate_light_background_10}`,
              color: `${props.theme.colors.saturated_contrast_60}`,
              p_color: `${props.theme.colors.saturated_contrast_20}`,
              padding: '8px',
              placeholder: 'Title',
              label: { display: 'none' },
            }}
          />
        </InputRow>
        <InputRow label="Description">
          <Input
            inputType={'textarea'}
            useLabelAnimation={true}
            left="14px"
            handleChange={handleDesc}
            value={desc}
            valid={() => {
              return desc !== '';
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
              placeholder: 'A short description of the transaction',
              label: { display: 'none' },
            }}
          />
        </InputRow>
        <InputRow>
          <Button
            to={'#'}
            height="40"
            width="100"
            fill={props.theme.colors.dark_background}
            transition_color={'white'}
            margin="16px 0 0 auto"
            onClick={submit}
          >
            Add
          </Button>
        </InputRow>
      </Container>
    </ParentContainer>
  );
};

AddTransaction.propTypes = {};

export default withTheme(withRouter(withUser(AddTransaction, true)));
