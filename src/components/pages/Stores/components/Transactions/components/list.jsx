import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, withTheme } from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from '@/components/widgets/UI/Loader';

import DefaultImage from '@/assets/images/icons/account/Profile.svg';
import TransactionItem from '@/components/UI/interface/account/Transaction.jsx';
import ReviewItem from '@/components/UI/interface/account/Review.jsx';

const ParentContainer = styled.div`
  background: ${(props) => props.theme.colors.page_background};
  width: 100%;
  height: auto;
  position: relative;
  z-index: 9;
  box-sizing: border-box;
  transition: all 0.25s ease-in-out;
  margin: 32px auto 0px auto;
  padding: 32px;
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

const TransactionList = (props) => {
  const transactionsArray = props.transactions;

  return (
    <>
      <ParentContainer id="add_transaction">
        <Container>
          {transactionsArray.map((transaction, index) => {
            return (
              <TransactionItem
                user_id={props.loggedinUser._id}
                user_photo={props.loggedinUser.photo}
                transaction={transaction}
                id={transaction._id}
                key={transaction._id}
                updater={props.updater}
                user_token={props.loggedinUser.jwt}
              />
            );
          })}
          {!transactionsArray && <Loader />}
        </Container>
      </ParentContainer>
    </>
  );
};

TransactionList.propTypes = {
  //   user_id: PropTypes.string,
  //   review: PropTypes.object,
  //   user_photo: PropTypes.string,
  //   reviews: PropTypes.array,
  //   getReview: PropTypes.func,
};

export default withTheme(withRouter(TransactionList));
