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
import AddTransaction from './components/add';

import withUser from '@/components/higher-order/withUser';
import Footer from '@/components/UI/Footer';
import Header from '@/components/UI/Header';
import Loader from '@/components/widgets/UI/Loader';
import Alert from '@/components/widgets/UI/Alert';
import { loadUser } from '@/actions/user';

import empty404 from '@/assets/images/lottie/404.json';
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
  const [route, setRoute] = useState(true);
  const [transaction, setTransaction] = useState({
    store_id: {
      photo: '',
      _id: '',
      name: '',
    },
  });

  const { match } = props;

  const toggleLoading = (payload) => {
    return setLoading(payload);
  };

  useEffect(() => {
    // initialize aos library
    AOS.init({ duration: 2000 });
    AOS.refresh();
  }, []);

  const location = useLocation();

  useEffect(() => {
    //get loaction details
    const loaded = location.pathname.split('/').pop();
    if (loaded !== '' && loaded !== '/' && loaded !== 'transactions') {
      setRoute(true);
    } else {
      setRoute(false);
    }
  }, [match.url]);

  const LottieOptions = {
    loop: true,
    autoplay: true,
    animationData: empty404,
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
        <Router>
          <Switch>
            <Route
              path={`${match.url}/add`}
              component={() => {
                return (
                  <AddTransaction
                    updater={addAlert}
                    loggedinUser={props.user.user}
                  />
                );
              }}
            />
            <Route
              path={`${match.url}/edit/:transaction_id`}
              component={() => {
                return null;
              }}
            />
            <Route
              path={`${match.url}/:transaction_id`}
              component={() => {
                return (
                  <TransactionPage
                    updater={addAlert}
                    loggedinUser={props.user.user}
                  />
                );
              }}
            />
          </Switch>
        </Router>
        {!route && (
          <>
            <Lottie options={LottieOptions} height={300} width={300} />
            <EmptyStateText
              style={{
                textAlign: 'center',
                color: `${props.theme.colors.saturated_contrast}`,
              }}
            >
              No Transaction Found.
            </EmptyStateText>
            <EmptyStateSubtext>Back to home</EmptyStateSubtext>
          </>
        )}
      </Container>
      <Footer />
    </ParentContainer>
  );
};

export default withUser(withTheme(withRouter(TransactionsIndex)), false);
