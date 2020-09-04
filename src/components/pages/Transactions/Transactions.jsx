import React, { useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import Lottie from 'react-lottie';

import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';

import withUser from '@/components/higher-order/withUser';
import Footer from '@/components/UI/Footer';
import ProfileWidget from '@/components/widgets/UI/Profile';
import Header from '@/components/UI/Header';
import TransactionItem from '@/components/UI/interface/account/Transaction';

import Loader from '@/components/widgets/UI/Loader';
import Alert from '@/components/widgets/UI/Alert';
import emptyTransactions from '@/assets/images/lottie/emptyTransactions.json';

import Add from './components/add';
import { getTransactionsByUserID } from '@/actions/transaction';
import setAlert from '@/assets/helperFunctions/alerts';

const ParentContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.page_background};
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
  const [display, setDisplay] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [mounted, setMounted] = useState(true);
  const loginStatus = props.user.loggedIn;

  const { match } = props;

  const toggleLoading = (payload) => {
    return setLoading(payload);
  };

  const user_id = match.params.user_id;
  useEffect(() => {
    setFetching(true);

    // get all user transactions
    const fetchTransactions = async (_id) => {
      let foundTransactions = await props.getTransactionsByUserID(_id);
      console.log('foundtransactions', foundTransactions);
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

  // destructure pathname from useLocation hook
  const { pathname } = useLocation();
  useEffect(() => {
    // get active state from params
    const currentLocation = pathname.split('/')[2];
    setDisplay(currentLocation);
  }, [display]);

  const getDisplayForm = () => {
    switch (display) {
      case 'add':
        return <Add />;
    }
  };

  const LottieOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyTransactions,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <ParentContainer>
      <Header useOwnBackground />
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
            return (
              <TransactionItem
                id={transaction._id}
                domain="visitor"
                type="given"
                user_id={props.user.user._id}
                transaction={transaction}
                key={transaction._id}
                id={transaction._id}
                updater={props.updater}
                user_token={props.user.user.jwt}
              />
            );
          })}
      </Container>
      <Footer />
    </ParentContainer>
  );
};

Transactions.propTypes = {};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactionsByUserID: (id) => dispatch(getTransactionsByUserID(id)),
  };
};

const connectedTransactions = connect(null, mapDispatchToProps)(Transactions);
export default withUser(withTheme(connectedTransactions), false);
