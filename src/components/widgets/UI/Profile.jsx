import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import withUser from '@/components/higher-order/withUser';
import DefaultImage from '@/assets/images/icons/account/Profile.svg';
import Alert from './Alert';
import Loader from '@/components/widgets/UI/Loader';

const ParentContainer = styled.div`
  width: 215px;
  height: 400px;
  background: white;
  border-radius: 4px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  @media (max-width: 700px) {
    width: 100%;
    height: 100px;
    margin-bottom: 16px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 32px 16px;
  @media (max-width: 700px) {
    width: 350px;
    margin: 0 auto;
    display: flex;
    padding: 8px 16px;
  }
`;

const P_Photo = styled.span`
  display: block;
`;
const Details = styled.span`
  display: block;
  @media (max-width: 700px) {
    width: 200px;
  }
`;

const NameBar = styled.span`
  display: block;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @media (max-width: 700px) {
    margin: 0;
    text-align: left;
  }
`;
const FirstName = styled.p`
  font-family: 'Noto Sans Regular';
  font-size: 18px;
  text-transform: uppercase;
  display: inline;
  color: ${(props) => props.theme.colors.alternate_light_background};
  @media (max-width: 700px) {
    font-size: 14px;
    margin: 0;
  }
`;

const LastName = styled.p`
  font-family: 'Noto Sans Bold';
  font-size: 18px;
  text-transform: uppercase;
  display: inline;
  margin-left: 4px;
  color: ${(props) => props.theme.colors.saturated_font_darker};
  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

const Bio = styled.p`
  font-family: 'Josefin Sans Light';
  font-size: 14px;
  line-height: 14px;
  color: ${(props) => props.theme.colors.alternate_light_background};
  margin: 4px 0px;
  height: 112px;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  @media (max-width: 700px) {
    height: 60px;
    font-size: 12px;
    line-height: 12px;
    -webkit-line-clamp: 5;
  }
`;

const Header = styled.p`
  font-family: 'Noto Sans Regular';
  font-size: 12px;
  margin: 8px 0px;
  color: ${(props) => props.theme.colors.saturated_contrast};
  @media (max-width: 700px) {
    display: none;
  }
`;

const Picture = styled.span`
  width: 100px;
  height: 100px;
  position: relative;
  display: block;
  margin: 0px auto 16px auto;
  @media (max-width: 700px) {
    margin: 0px 16px 0px 0px;
    width: 84px;
    height: 84px;
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: none;
  display: block;
  margin: 0 auto;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.25);
  @media (max-width: 700px) {
    width: 84px;
    height: 84px;
  }
`;

const Ellipse = styled.span`
  display: inline-block;
  position: absolute;
  top: 40%;
  left: 40%;
  z-index: 99;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  @media (max-width: 700px) {
    top: 32px;
    left: 32px;
  }
`;
const ProfileWidget = (props) => {
  const [loading, setLoading] = useState(false);

  const p_photo = props.user.user.photo;
  const [profilePhoto, setProfilePhoto] = useState(p_photo);

  const loginStatus = props.user.loggedIn;
  useEffect(() => {
    !loginStatus ? setLoading(true) : setLoading(false);
    p_photo ? setProfilePhoto(p_photo) : setProfilePhoto('');
  }, [loginStatus, p_photo]);

  const userImage = p_photo || DefaultImage;
  return (
    <ParentContainer>
      <Container>
        {loading && <Loader />}
        {!loading && (
          <>
            <P_Photo>
              <Picture>
                <Image src={userImage} />
                <Ellipse />
              </Picture>
            </P_Photo>
            <Details>
              <NameBar>
                <FirstName>{props.user.user.firstname || 'John'}</FirstName>
                <LastName>{props.user.user.lastname || 'Doe'}</LastName>
              </NameBar>
              <Header>Bio</Header>
              <Bio>
                {props.user.user.bio ||
                  'No bio available. Please edit your personal details'}
              </Bio>
            </Details>
          </>
        )}
      </Container>
    </ParentContainer>
  );
};

export default withUser(ProfileWidget);
