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

const PhotoFancyBorder = styled.div`
  width: 35px;
  height: 35px;
  padding: 4px;
  box-sizing: border-box;
  border: solid 1px ${(props) => props.theme.colors.yellow};
  border-radius: 50%;
`;
const ProfilePhoto = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
`;

const HeaderProfile = (props) => {
  const logout = () => {
    props.mouseenter();
  };
  const showMenu = () => {
    return props.mouseenter();
  };
  const hideMenu = () => {
    return props.mouseleave();
  };
  return (
    <Container onMouseEnter={showMenu} onMouseLeave={hideMenu} onClick={logout}>
      {/* <Pin src={ProfilePin} /> */}
      <PhotoFancyBorder>
        <ProfilePhoto
          src={props.profilePhoto}
          alt={`A photo of ${props.username}`}
        />
      </PhotoFancyBorder>
    </Container>
  );
};

HeaderProfile.propTypes = {
  username: PropTypes.string,
  userPhoto: PropTypes.string,
};

export default HeaderProfile;
