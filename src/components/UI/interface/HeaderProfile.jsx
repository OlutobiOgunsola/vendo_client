import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProfilePin from '@/assets/images/icons/profile/ProfilePin.svg';

const Container = styled.span`
  position: relative;
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
  return (
    <Container>
      <Pin src={ProfilePin} />
      <ProfilePhoto
        src={props.profilePhoto}
        alt={`A photo of ${props.username}`}
      />
    </Container>
  );
};

HeaderProfile.propTypes = {
  username: PropTypes.string,
  userPhoto: PropTypes.string,
};

export default HeaderProfile;
