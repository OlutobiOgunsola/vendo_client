import React from 'react';
import styled from 'styled-components';
import withUser from '@/components/higher-order/withUser';

const ParentContainer = styled.div`
  width: 215px;
  height: 400px;
  background: white;
  border-radius: 4px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 16px;
`;

const NameBar = styled.span`
  display: block;
  width: 100%;
  text-align: center;
`;
const FirstName = styled.p`
  font-family: 'Noto Sans Regular';
  font-size: 18px;
  text-transform: uppercase;
  display: inline;
  color: ${(props) => props.theme.colors.alternate_light_background};
`;

const LastName = styled.p`
  font-family: 'Noto Sans Bold';
  font-size: 18px;
  text-transform: uppercase;
  display: inline;
  margin-left: 4px;
  color: ${(props) => props.theme.colors.saturated_font_darker};
`;

const Bio = styled.p`
  font-family: 'Josefin Sans Light';
  font-size: 14px;
  color: ${(props) => props.theme.colors.alternate_light_background};
`;

const Header = styled.p`
  font-family: 'Noto Sans Regular';
  font-size: 12px;
  color: ${(props) => props.theme.colors.saturated_contrast};
`;
const ProfileWidget = (props) => {
  console.log(props);
  return (
    <ParentContainer>
      <Container>
        <NameBar>
          <FirstName>{props.user.user.f_name || 'John'}</FirstName>
          <LastName>{props.user.user.f_name || 'Doe'}</LastName>
        </NameBar>
        <Header>Bio</Header>
        <Bio>
          {props.user.user.bio ||
            'No bio available. Please edit your personal details'}
        </Bio>
      </Container>
    </ParentContainer>
  );
};

export default withUser(ProfileWidget);
