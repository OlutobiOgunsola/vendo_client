import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProfilePin from '@/assets/images/icons/profile/ProfilePin.svg';
import { useState } from 'react';

const Container = styled.span`
  position: relative;
  opacity: 0.8;
  transition: all 0.25s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;
const Pin = styled.img`
  height: 35px;
  width: 35px;
`;
const ProfilePhoto = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  position: absolute;
  z-index: 2;
  left: 2.5px;
  top: 0.5px;
`;

const HeaderProfile = (props) => {
  const logout = () => {
    props.click();
  };
  return (
    <Container>
      <Pin src={ProfilePin} />
      <ProfilePhoto
        src={props.profilePhoto}
        alt={`A photo of ${props.username}`}
        onClick={logout}
      />
    </Container>
  );
};

HeaderProfile.propTypes = {
  username: PropTypes.string,
  userPhoto: PropTypes.string,
};

export default HeaderProfile;
