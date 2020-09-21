import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, withTheme } from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from '@/components/widgets/UI/Loader';

import DefaultImage from '@/assets/images/icons/account/Profile.svg';
import TransactionItem from '@/components/UI/interface/account/Transaction.jsx';
import ReviewItem from '@/components/UI/interface/account/Review.jsx';

import FilterComponent from '@/components/widgets/UI/Filters';

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

  const [transactions, setTransactions] = useState(transactionsArray);

  const sortBy = (sortOrder) => {
    const transactionClone = [...transactions];

    switch (sortOrder) {
      case 'rating':
        const sortedRating = transactionClone.sort((a, b) => {
          return a.rating > b.rating;
        });
        return setTransactions(sortedRating);
      case 'newest':
        const sortedNewest = transactionClone.sort((a, b) => {
          return a.createdAt > b.createdAt;
        });
        return setTransactions(sortedNewest);
    }
  };

  return (
    <>
      <ParentContainer id="list_transaction">
        <Container>
          <FilterComponent handleChange={sortBy} />
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
