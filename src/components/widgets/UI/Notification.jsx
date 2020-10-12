import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ParentContainer = styled.div`
  width: 100%;
  height: auto;
  border-radius: 4px;
  font-size: 16px;
  background: ${(props) => {
    return props.seen
      ? props.theme.colors.dark_background
      : props.theme.colors.yellow;
  }};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 0.5rem;
  color: ${(props) => {
    return props.seen
      ? props.theme.colors.saturated_contrast
      : props.theme.colors.dark_background;
  }};
  &:last-child {
    margin-bottom: 0rem;
  }
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 700px) {
    width: 100%;
    height: 100px;
    margin-bottom: 0.25rem;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0.25rem;
  display: flex;
  flex-flow: row nowrap;
  @media (max-width: 700px) {
    width: 350px;
    margin: 0 auto;
    display: flex;
  }
`;

const P_Photo = styled.span`
  display: block;
`;

const Photo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: solid 1px
    ${(props) =>
      props.seen
        ? props.theme.colors.yellow
        : props.theme.colors.dark_background};
  box-sizing: border-box;
  padding: 0.25rem;
`;

const Details = styled.div`
  width: calc(100%-50px);
  height: 100%;
  margin-left: 0.25rem;
  padding: 0.25rem;
  box-sizing: border-box;
`;

const AuthorPhoto = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
`;

const Title = styled.h5`
  margin: 0;
  font-family: 'Noto Sans Regular';
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
  box-sizing: border-box;
`;

const Description = styled.p`
  margin: 0;
  font-family: 'Josefin Sans Light';
  font-size: 0.75rem;
`;

const NotificationItem = (props) => {
  const [loading, setLoading] = useState(false);

  const p_photo = props.photo;
  const [profilePhoto, setProfilePhoto] = useState(p_photo);

  const notification = props.notification;

  const seeNotif = () => {
    return axios
      .get(
        `${process.env.REACT_APP_API_PREFIX}/api/notifications/see/${notification._id}`,
      )
      .then((result) => {
        if (result.status === 200) {
          return null;
        }
      })
      .catch((err) => {
        return null;
      });
  };

  return (
    <ParentContainer
      seen={notification.status === 'seen'}
      onMouseEnter={seeNotif}
      onClick={seeNotif}
    >
      <Container>
        <Photo seen={notification.status === 'seen'}>
          <AuthorPhoto src={notification.author_id.photo}></AuthorPhoto>
        </Photo>
        <Details>
          <Title>{notification.title}</Title>
          <Description>{notification.description}</Description>
        </Details>
      </Container>
    </ParentContainer>
  );
};

export default NotificationItem;
