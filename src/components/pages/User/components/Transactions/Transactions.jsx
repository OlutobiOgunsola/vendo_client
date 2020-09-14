import React, { useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';

import TransactionItem from '@/components/UI/interface/account/Transaction';

import Loader from '@/components/widgets/UI/Loader';
import Alert from '@/components/widgets/UI/Alert';
import emptyTransactions from '@/assets/images/lottie/emptyTransactions.json';

import { getTransactionsByUserID } from '@/actions/transaction';

import FilterComponent from '../Filters/Filters';

const ParentContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.dark_background};
  height: auto;
`;

const Container = styled.div`
  width: 880px;
  margin: 40px auto;
  padding: 40px 0px;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.dark_background};
  @media (max-width: 900px) {
    width: 747px;
  }
  @media (max-width: 800px) {
    width: 647px;
  }
  @media (max-width: 700px) {
    flex-flow: column nowrap;
    padding: 40px 50px;
    width: calc(100% - 100px);
  }
  @media (max-width: 500px) {
    flex-flow: column nowrap;
    padding: 40px 10px;
    box-sizing: border-box;
    width: calc(100% - 40px);
  }
  @media (max-width: 400px) {
    flex-flow: column nowrap;
    width: calc(100% - 40px);
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

const Transactions = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [alerts, addAlert] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [mounted, setMounted] = useState(true);
  const loginStatus = props.user.loggedIn;

  const { match } = props;
  const user_id = props.user_id;

  const toggleLoading = (payload) => {
    return setLoading(payload);
  };

  useEffect(() => {
    setFetching(true);

    // get all user transactions
    const fetchTransactions = async (_id) => {
      let foundTransactions = await props.getTransactionsByUserID(_id);
      console.log('f0und transcations', foundTransactions);
      if (mounted) {
        setTransactions(foundTransactions);
        !transactions ? setFetching(true) : setFetching(false);
        setFetching(false);
      }
      // return null;
    };

    if (user_id) {
      fetchTransactions(user_id);
    }
    return () => {
      setMounted(false);
    };
  }, []);

  const LottieOptions = {
    loop: false,
    autoplay: true,
    animationData: emptyTransactions,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <ParentContainer>
      {alerts.map((alert) => {
        return (
          <Alert type={alert.type} key={alert.text}>
            {alert.text}
          </Alert>
        );
      })}
      <Container>
        {isLoading && <Loader />}
        {isFetching && <Loader transition={0.2} />}
        <FilterComponent />
        {!transactions && (
          <>
            <Lottie options={LottieOptions} height={300} width={300} />
            <EmptyStateText
              style={{
                textAlign: 'center',
                color: `${props.theme.colors.saturated_contrast}`,
              }}
            >
              No transactions yet.
            </EmptyStateText>
            <EmptyStateSubtext>
              Be the first to patronize. Open a transaction.
            </EmptyStateSubtext>
          </>
        )}
        {transactions &&
          transactions.map((transaction) => {
            console.log('transactionnnn', transaction);
            return (
              <TransactionItem
                id={transaction._id}
                domain="visitor"
                type="given"
                user_id={props.loggedinUser._id}
                transaction={transaction}
                key={transaction._id}
                id={transaction._id}
                updater={props.updater}
                user_token={props.loggedinUser.jwt}
              />
            );
          })}
      </Container>
    </ParentContainer>
  );
};

Transactions.propTypes = {
  user: PropTypes.object,
  updater: PropTypes.func,
  loggedinUser: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactionsByUserID: (id) => dispatch(getTransactionsByUserID(id)),
  };
};

const ConnectedTransactions = connect(null, mapDispatchToProps)(Transactions);
export default withTheme(withRouter(ConnectedTransactions));
