import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '@/components/UI/interface/home/Logo.jsx';
import AOS from 'aos';

const ParentContainer = styled.footer`
  background: ${(props) => props.theme.colors.footer_background};
  display: flex;
  align-items: center;
  @media (min-width: 1280px) {
    padding: 0px 200px;
    height: 300px;
  }
  @media (min-width: 751px) and (max-width: 1279px) {
    padding: 0px 100px;
    height: 300px;
  }
  @media (min-width: 481px) and (max-width: 750px) {
    padding: 0px 20px;
    height: 496px;
  }
  @media (max-width: 480px) {
    padding: 0px 10px;
    height: 600px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 880px;
  height: 208px;
  box-sizing: border-box;
  padding: 8px 0px;
  display: flex;
  flex-flow: row nowrap;
  margin: 0 auto;
  @media (max-width: 750px) {
    height: 416px;
  }
  @media (max-width: 480px) {
    height: 600px;
    width: 300px;
    flex-flow: row wrap;
    .order-1 {
      order: 1;
    }
    .order-2 {
      order: 2;
    }
  }
`;

const CompanyInfo = styled.div`
  width: 25%;
  height: 200px;
  display: inline-block;
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
  padding: 10px;
  @media (max-width: 670px) {
    justify-content: center;
  }
  @media (max-width: 580px) {
    height: 300px;
  }
  @media (max-width: 480px) {
    width: 200px;
    height: 250px;
  }
`;

const LogoContainer = styled.svg`
  width: 42px;
  min-height: 38px;
  max-height: 70px;
  margin: 2px;
  display: block;
  @media (max-width: 400px) {
    margin: 0px 10px 0px 0px;
    box-sizing: border-box;
  }
`;

const InfoCopy = styled.p`
  width: 100%;
  height: 80px;
  line-height: 20px;
  font-size: 16px;
  font-family: 'Josefin Sans Light';
  color: ${(props) => props.theme.colors.saturated_contrast};
  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (max-width: 580px) {
    height: 250px;
  }
  @media (max-width: 480px) {
    font-size: 16px;
    height: 120px;
  }
`;

const Copyright = styled.p`
  width: 100px;
  height: 14px;
  font-size: 11px;
  font-family: 'Oxygen Bold';
  font-weight: 100;
  color: ${(props) => props.theme.colors.saturated_contrast};
`;

const TitleBar = styled.div`
  height: 20px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const Title = styled.h6`
  margin: 0;
  width: 150px;
  height: 18px;
  font-family: 'Oxygen Bold';
  font-size: 16px;
  color: ${(props) => props.theme.colors.saturated_contrast};
`;

const Line = styled.hr`
  width: 100%;
  height: 1px;
  margin: 12px auto;
  border: none;
  background: ${(props) => props.theme.colors.saturated_contrast};
`;

const LinkBar = styled.div`
  height: 110px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 750px) {
    flex-flow: row wrap;
    width: 500px;
    height: 306px;
  }
  @media (max-width: 700px) {
    flex-flow: row wrap;
    width: 400px;
    height: 306px;
  }
  @media (max-width: 600px) {
    flex-flow: row wrap;
    width: 100%;
    height: 306px;
  }
  @media (max-width: 400px) {
    flex-flow: row wrap;
    width: 300px;
    height: 306px;
  }
`;

const Links = styled.div`
  width: 75%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 10px;
  @media (max-width: 750px) {
    width: 70%;
    height: 306px;
  }
  @media (max-width: 480px) {
    width: 100%;
    height: 306px;
    padding: 0px;
  }
`;

const LinkGroup = styled.div`
  margin: 0;
  width: 150px;
  height: 150px;
  display: flex;
  flex-flow: column nowrap;
  @media (max-width: 1032px) {
    width: 130px;
  }
  @media (max-width: 932px) {
    width: 100px;
  }
  @media (max-width: 750px) {
    width: 150px;
  }
  @media (max-width: 500px) {
    width: 100px;
  }
`;

const LinkItem = styled(Link)`
  font-family: 'Josefin Sans Light';
  font-size: 16px;
  height: 20px;
  margin: 4px 0px;
  box-sizing: border-box;
  color: ${(props) => props.theme.colors.saturated_contrast};
  text-decoration: none;
  transition: all 0.5s ease-in-out;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  @media (max-width: 932px) {
    font-size: 14px;
  }
`;

const Footer = (props) => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <ParentContainer>
      <Container>
        <CompanyInfo className="order-2">
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <InfoCopy>
            Vendo is the online platform for Vendor Verification across Africa.
            Sign up for free to start writing or receiving reviews.
          </InfoCopy>
          <Copyright>&copy; VENDO {year}</Copyright>
        </CompanyInfo>
        <Links className="order-1">
          <LinkBar>
            <LinkGroup>
              <TitleBar>
                <Title>FEATURED</Title>
              </TitleBar>
              <Line />
              <LinkItem to="">By Category</LinkItem>
              <LinkItem to="">By Location</LinkItem>
              <LinkItem to="">Top Vendors</LinkItem>
              <LinkItem to="">Weekly Picks</LinkItem>
            </LinkGroup>
            <LinkGroup>
              <TitleBar>
                <Title>FAQ</Title>
              </TitleBar>
              <Line />
              <LinkItem to="">Users</LinkItem>
              <LinkItem to="">Vendors</LinkItem>
              <LinkItem to="">Transactions</LinkItem>
              <LinkItem to="">Sandbox</LinkItem>
            </LinkGroup>
            <LinkGroup>
              <TitleBar>
                <Title>SUPPORT</Title>
              </TitleBar>
              <Line />
              <LinkItem to="">Write a Review</LinkItem>
              <LinkItem to="">Report a Bug</LinkItem>
              <LinkItem to="">Contact Us</LinkItem>
              <LinkItem to="">Report a Vendor</LinkItem>
            </LinkGroup>
            <LinkGroup>
              <TitleBar>
                <Title>PRICING</Title>
              </TitleBar>
              <Line />
              <LinkItem to="">Single User</LinkItem>
              <LinkItem to="">Enterprise</LinkItem>
              <LinkItem to="">Request a Demo</LinkItem>
              <LinkItem to="">Try Premium</LinkItem>
            </LinkGroup>
          </LinkBar>
        </Links>
      </Container>
    </ParentContainer>
  );
};

export default Footer;
