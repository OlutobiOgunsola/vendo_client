import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import withUser from '@/components/higher-order/withUser';

import HeaderProfile from '@/components/UI/interface/HeaderProfile.jsx';
import HeaderSignIn from '@/components/UI/buttons/Header_Sign_In.jsx';
import userPhoto from '@/assets/images/user/SergiePhoto.png';
import Logo from '@/components/UI/interface/Logo.jsx';
import AddIcon from '@/assets/images/icons/Add.svg';
import NotificationIcon from '@/assets/images/icons/Notification.svg';
import TransactionIcon from '@/assets/images/icons/Transaction.svg';

const ParentContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  @media (max-width: 400px) {
    width: 100%;
  }
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
  @media (max-width: 970px) {
    width: 250px;
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
  color: #c4cfd4;
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
  const cookies = {
    user: false,
  };

  const [f_name, setf_name] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(
    props.user || {
      user: {},
    },
  );
  useEffect(() => {
    // AOS.init({ duration: 2000 });
    // AOS.refresh();
    if (user) {
      setLoggedIn(false);
      setUser({
        user: {
          name: user.name,
          photo: user.userPhoto,
        },
      });
    }
  }, []);

  const firstName = user.user.name ? user.user.name.split(' ')[0] : 'User';

  return (
    <ParentContainer>
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
              username={user.user.name}
              profilePhoto={user.user.photo}
            />
          </FloatRight>
        </>
      )}
      {!loggedIn && <HeaderSignIn component={Link}>Sign In</HeaderSignIn>}
    </ParentContainer>
  );
};
// export default withUser(Header);
export default Header;
