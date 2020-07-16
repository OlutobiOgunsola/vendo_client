import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import userPhoto from '@/assets/images/user/SergiePhoto.png';
import Logo from '@/assets/images/logos/SecondarylogoYellow.svg';

const ParentContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.img`
  width: 42px;
  height: 38px;
  margin: 0px 40px 0px 0px;
  display: inline-block;
`;

const SearchBox = styled.input`
  background: rgba(196, 207, 212, 0.2);
  max-width: 386px;
  height: 32px;
  border: none;
  border-radius: 4px;
  padding: 7px 24px;
  box-sizing: border-box;
  line-height: 19px;
  outline: none;
  margin: 0;
  display: inline-block;
`;

const NameBox = styled.span`
  font-size: 1em;
  color: #c4cfd4;
`;

const IconsBox = styled.div`
  width: 104px;
  height: 20px;
`;

const Add = styled.img``;
const Notification = styled.img``;
const Transaction = styled.img``;

const Header = (props) => {
  const cookies = {
    user: true,
  };

  const [f_name, setf_name] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    loggedIn: false,
    user: {},
  });
  useEffect(() => {
    console.log('Header loaded');
    if (cookies.user) {
      setUser({
        loggedIn: true,
        user: {
          name: 'Chinwe AJIUZINE',
          photo: userPhoto,
        },
      });
    }
  }, []);

  const firstName = user.user.name ? user.user.name.split(' ')[0] : 'User';

  return (
    <ParentContainer>
      <LogoContainer src={`${Logo}`} />
      <SearchBox placeholder="Search" />
      <NameBox>Hello, {firstName} </NameBox>
      <IconsBox>
        <Add />
        <Notification />
        <Transaction />
      </IconsBox>
    </ParentContainer>
  );
};

export default Header;
