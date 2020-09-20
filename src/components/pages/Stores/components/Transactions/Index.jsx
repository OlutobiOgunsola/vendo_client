import React, { useState, useEffect } from 'react';
import styled, { withTheme, keyframes } from 'styled-components';
import Lottie from 'react-lottie';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import StarRatings from 'react-star-ratings';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  withRouter,
} from 'react-router-dom';

import TransactionPage from './components/transaction';
import TransactionList from './components/list';
import AddTransaction from './components/add';

import withUser from '@/components/higher-order/withUser';
import Footer from '@/components/UI/Footer';
import Header from '@/components/UI/Header';
import Loader from '@/components/widgets/UI/Loader';
import Alert from '@/components/widgets/UI/Alert';

import defaultImage from '@/assets/images/icons/account/Profile.svg';

const ParentContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.page_background};
  height: auto;
`;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.dark_background};
  /* padding: 20px; */

  hr {
    width: 100%;
    height: 0.1px;
    margin: 32px auto;
    border: none;
    opacity: 0.6;
    background: ${(props) => props.theme.colors.alternate_light_background_10};
  }

  @media (max-width: 900px) {
  }
  @media (max-width: 800px) {
  }
  @media (max-width: 700px) {
    flex-flow: column nowrap;
    padding: 40px 50px;
  }
  @media (max-width: 500px) {
    flex-flow: column nowrap;
    padding: 40px 10px;
    box-sizing: border-box;
  }
  @media (max-width: 400px) {
    flex-flow: column nowrap;
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

const TransactionsIndex = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [alerts, addAlert] = useState([]);
  const [mounted, setMounted] = useState(true);
  const [transactionsArray, setTransactionsArray] = useState([]);
  const [transaction, setTransaction] = useState({
    store_id: {
      photo: '',
      _id: '',
      name: '',
    },
  });

  const { match } = props;

  const store_id = props.store_id;
  const owner = props.owner;
  const handle = props.handle;

  const toggleLoading = (payload) => {
    return setLoading(payload);
  };

  useEffect(() => {
    setLoading(true);
    const getStoreTransactions = async (store_id) => {
      return axios
        .get(
          `${process.env.REACT_APP_API_PREFIX}/api/transactions/all/${store_id}`,
        )
        .then((res) => {
          if (res.status === 200) {
            const result = res.data.data;
            setTransactionsArray(result);
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (store_id) {
      getStoreTransactions(store_id);
    }
  }, [store_id]);

  useEffect(() => {
    // props.setRoute(true);
  }, []);

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

        <Switch>
          <Route
            path={`${match.url}/`}
            exact
            component={() => {
              return (
                <TransactionList
                  updater={addAlert}
                  loggedinUser={props.user}
                  transactions={transactionsArray}
                />
              );
            }}
          />
          <Route
            path={`${match.url}/add`}
            exact
            component={() => {
              return (
                <AddTransaction
                  updater={addAlert}
                  loggedinUser={props.user}
                  store_id={props.store_id}
                />
              );
            }}
          />
          <Route
            path={`${match.url}/:transaction_id`}
            component={() => {
              return (
                <TransactionPage
                  updater={addAlert}
                  loggedinUser={props.user}
                  store_id={props.store_id}
                />
              );
            }}
          />
        </Switch>
      </Container>
    </ParentContainer>
  );
};

export default withTheme(withRouter(TransactionsIndex));
