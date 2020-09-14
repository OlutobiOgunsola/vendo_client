import React, { useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import Header from '@/components/UI/Header';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import Navbar from './components/navbar';

import withUser from '@/components/higher-order/withUser';
import Footer from '@/components/UI/Footer';
import ProfileWidget from '@/components/widgets/UI/Profile';
import Loader from '@/components/widgets/UI/Loader';
import Alert from '@/components/widgets/UI/Alert';

import Reviews from './components/reviews';
import P_Details from './components/p_details';
import Transactions from './components/transactions';

const ParentContainer = styled.div`
  width: 100%;
  /* background: red; */
  background: ${(props) => props.theme.colors.page_background};
  height: auto;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
`;

const Container = styled.div`
  width: 880px;
  margin: 40px auto;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  @media (max-width: 900px) {
    width: 747px;
  }
  @media (max-width: 800px) {
    width: 647px;
  }
  @media (max-width: 700px) {
    flex-flow: column nowrap;
    padding: 0px 50px;
    width: 100%;
  }
  @media (max-width: 500px) {
    flex-flow: column nowrap;
    padding: 0px 10px;
    box-sizing: border-box;
    width: 100%;
  }
  @media (max-width: 400px) {
    flex-flow: column nowrap;
    width: 100%;
  }
`;

const ActionContainer = styled.div`
  width: 633px;
  height: auto;
  box-sizing: border-box;
  padding: 40px 32px;
  border-radius: 4px;
  position: relative;
  z-index: 1;
  background: ${(props) => props.theme.colors.dark_background};
  @media (max-width: 900px) {
    width: 500px;
  }
  @media (max-width: 800px) {
    width: 400px;
  }
  @media (max-width: 700px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    width: 100%;
    padding: 40px 16px;
  }
  @media (max-width: 400px) {
    width: 100%;
    padding: 40px 8px;
  }
`;

const Account = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [alerts, addAlert] = useState([]);
  const [display, setDisplay] = useState('');
  const [mounted, setMounted] = useState(true);
  const loginStatus = props.user.loggedIn;

  const toggleLoading = (payload) => {
    return setLoading(payload);
  };

  useEffect(() => {
    if (mounted) {
      !loginStatus ? setFetching(true) : setFetching(false);
    }
    return () => {
      setMounted(false);
    };
  }, [loginStatus]);

  // destructure pathname from useLocation hook
  const { pathname } = useLocation();
  useEffect(() => {
    // get active state from params
    const currentLocation = pathname.split('/')[2];
    setDisplay(currentLocation);
  }, [display]);

  const getDisplayForm = () => {
    switch (display) {
      case 'settings':
        return (
          <P_Details
            store={alerts}
            updater={addAlert}
            loading={toggleLoading}
            user={props.user}
          />
        );
      case 'reviews':
        return (
          <Reviews
            updater={addAlert}
            loading={toggleLoading}
            user={props.user}
          />
        );
      case 'transactions':
        return (
          <Transactions
            updater={addAlert}
            loading={toggleLoading}
            user={props.user}
          />
        );
    }
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
        <ProfileWidget />
        <ActionContainer>
          <Navbar setDisplay={setDisplay} />
          {isLoading && <Loader />}
          {isFetching && <Loader transition={0.2} />}
          {getDisplayForm()}
        </ActionContainer>
      </Container>
      <Footer />
    </ParentContainer>
  );
};

export default withUser(withTheme(Account), true);
