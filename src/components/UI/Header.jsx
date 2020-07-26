import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import withUser from '@/components/higher-order/withUser';

import HeaderProfile from '@/components/UI/interface/HeaderProfile.jsx';
import HeaderSignIn from '@/components/UI/buttons/Header_Sign_In.jsx';
import defaultPhoto from '@/assets/images/user/defaultUser.png';
import Logo from '@/components/UI/interface/Logo.jsx';
import AddIcon from '@/assets/images/icons/Add.svg';
import NotificationIcon from '@/assets/images/icons/Notification.svg';
import TransactionIcon from '@/assets/images/icons/Transaction.svg';

const ParentContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin: 0;
  /* position: absolute;
  top: 0;
  left: 0; */
  padding: ${(props) => (props.usePagePadding ? '' : '10px 200px')};
  @media (max-width: 900px) {
    padding: ${(props) => (props.usePagePadding ? '' : '10px 100px')};
  }
  @media (max-width: 700px) {
    padding: ${(props) => (props.usePagePadding ? '' : '10px 500px')};
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
  const [user, setUser] = useState(
    props.user || {
      user: {},
    },
  );
  useEffect(() => {
    if (props.user.loggedIn) {
      setLoggedIn(true);
      setUserObj({
        name: props.user.user.firstname || props.user.user.username,
        photo: props.user.user.userPhoto,
      });
    }
  }, [props.user]);

  const firstName = userObj.name || 'User';
  const photo = userObj.photo || defaultPhoto;

  return (
    <ParentContainer
      usePagePadding={props.usePagePadding}
      useOwnBackground={props.useOwnBackground}
    >
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
            <HeaderProfile username={firstName} profilePhoto={photo} />
          </FloatRight>
        </>
      )}
      {!loggedIn && <HeaderSignIn component={Link}>Sign In</HeaderSignIn>}
    </ParentContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default withUser(Header);
// export default withUser(connect(mapStateToProps)(Header));
// export default Header;
