import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import withUser from '@/components/higher-order/withUser';
import axios from 'axios';

import HeaderProfile from '@/components/UI/interface/HeaderProfile.jsx';
import HeaderSignIn from '@/components/UI/buttons/Header_Sign_In.jsx';
import defaultPhoto from '@/assets/images/icons/account/Profile.svg';
import Logo from '@/components/UI/interface/Logo.jsx';
import AddIcon from '@/assets/images/icons/Add.svg';
import NotificationIcon from '@/assets/images/icons/Notification.svg';
import TransactionIcon from '@/assets/images/icons/Transaction.svg';
import setAlert from '@/assets/helperFunctions/alerts';
import Alert from '../widgets/UI/Alert';
import { clearUser } from '@/actions/user';
import { connect } from 'react-redux';

const ParentContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin: 0;
  padding: ${(props) => (props.usePagePadding ? '' : '10px 200px')};
  @media (max-width: 900px) {
    padding: ${(props) => (props.usePagePadding ? '' : '10px 100px')};
  }
  @media (max-width: 700px) {
    padding: ${(props) => (props.usePagePadding ? '' : '10px 50px')};
  }
  @media (max-width: 500px) {
    padding: ${(props) => (props.usePagePadding ? '' : '10px 20px')};
  }
  @media (max-width: 400px) {
    width: 100%;
  }
  background: ${(props) =>
    props.useOwnBackground ? props.theme.colors.dark_background : ''};
`;

const LogoContainer = styled.svg`
  width: 42px;
  height: 38px;
  margin: 0px 40px 0px 0px;
  display: inline-block;
  @media (max-width: 400px) {
    margin: 0px 10px 0px 0px;
    box-sizing: border-box;
  }
`;

const SearchBox = styled.input`
  background: rgba(196, 207, 212, 0.2);
  width: 386px;
  height: 32px;
  border: none;
  border-radius: 4px;
  padding: 7px 24px;
  box-sizing: border-box;
  line-height: 19px;
  outline: none;
  margin: 0;
  display: inline-block;
  color: white;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  :-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  @media (max-width: 970px) {
    width: 300px;
  }
  @media (max-width: 740px) {
    margin-right: 32px;
  }
  @media (max-width: 400px) {
    width: 186px;
  }
`;

const NameBox = styled.span`
  transition: all 1s ease-in-out;
  font-size: 1em;
  color: white;
  margin: 0px 16px 0px 0px;
  @media (max-width: 970px) {
    margin: 0px 8px 0px 0px;
  }

  @media (max-width: 740px) {
    display: none;
  }
`;

const IconsBox = styled.div`
  max-width: 104px;
  height: 20px;
  display: flex;
  align-items: center;
  margin: 0px 16px;
  @media (max-width: 970px) {
    margin: 0px 8px;
  }
  @media (max-width: 800px) {
    display: none;
  }
`;

const Add = styled.img`
  margin: 0px 8px;
`;
const Notification = styled.img`
  margin: 0px 8px;
`;
const Transaction = styled.img`
  margin: 0px 8px;
`;

const FloatRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
`;

const Header = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState({});
  const [alerts, addAlert] = useState([]);
  const [mounted, setMounted] = useState(true);

  const cancel = axios.CancelToken;
  const source = cancel.source();

  useEffect(() => {
    if (props.user.loggedIn) {
      if (mounted) {
        setLoggedIn(true);
        setUserObj({
          name: props.user.user.firstname || props.user.user.username,
          photo: props.user.user.photo,
        });
      }
    }
    return () => {
      source.cancel();
    };
  }, [props.user]);

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  const logout = () => {
    console.log('logout clicked');
    return axios
      .get(`${process.env.REACT_APP_API_PREFIX}/api/auth/logout`, {
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.clear();
          props.clearUser();
          if (mounted) {
            setAlert(addAlert, 'success', 'Successfully logged out');
          }
          return props.history.push('/');
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request cancelled', err.message);
        }
        if (mounted) {
          setAlert(addAlert, 'error', 'An error occured. Please try again');
        }
      });
  };

  const firstName = userObj.name || 'User';
  const photo = userObj.photo || defaultPhoto;

  return (
    <ParentContainer
      usePagePadding={props.usePagePadding}
      useOwnBackground={props.useOwnBackground}
    >
      {alerts.map((alert) => {
        return (
          <Alert type={alert.type} key={alert.text}>
            {alert.text}
          </Alert>
        );
      })}
      {window.location.pathname === '/' && (
        <LogoContainer data-aos="fade-right">
          <Logo />
        </LogoContainer>
      )}
      {window.location.pathname !== '/' && (
        <LogoContainer>
          <Logo />
        </LogoContainer>
      )}
      {loggedIn && (
        <>
          <SearchBox placeholder="Search" type="search" />
          <FloatRight>
            <NameBox>Hello, {firstName} </NameBox>
            <IconsBox>
              <Add src={AddIcon} />
              <Notification src={NotificationIcon} />
              <Transaction src={TransactionIcon} />
            </IconsBox>
            <HeaderProfile
              username={firstName}
              profilePhoto={photo}
              click={logout}
            />
          </FloatRight>
        </>
      )}
      {!loggedIn && <HeaderSignIn component={Link}>Sign In</HeaderSignIn>}
    </ParentContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearUser: () => {
      dispatch(clearUser());
    },
  };
};

export default connect(null, mapDispatchToProps)(withRouter(withUser(Header)));
