import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';


import SandboxLogo from '@/components/UI/interface/SandboxLogo';
import PadLogoSmall from '@/assets/images/icons/sandbox/Padlock_2.svg';
import PadLogoBig from '@/assets/images/icons/sandbox/Padlock.svg';

const ParentContainer = styled.div`
  background: ${(props) => props.theme.colors.dark_background};
  display: flex;
  align-items: center;
  @media (min-width: 1280px) {
    padding: 0px 200px;
    height: 500px;
  }
  @media (min-width: 880px) and (max-width: 1279px) {
    padding: 0px 100px;
    height: 500px;
  }
  @media (min-width: 533px) and (max-width: 879px) {
    padding: 0px 50px;
    height: 500px;
  }
  @media (max-width: 532px) {
    padding: 0px 20px;
    height: 500px;
  }
  @media (max-width: 670px) {
    height: 700px;
  }
`;

const Container = styled.div`
  height: 300px;
  width: 880px;
  margin: 0 auto;
  display: flex;
  flex-direction: row nowrap;
  justify-content: space-between;
  position: relative;
  @media (max-width: 1000px) {
    width: 700px;
  }
  @media (max-width: 900px) {
    width: 600px;
    height: 300px;
  }
  @media (max-width: 670px) {
    flex-flow: row wrap;
    width: 300px;
    height: 600px;
    align-items: center;
    justify-content: center;
  }
`;

const LogoContainer = styled.div`
  height: 300px;
  width: 250px;
  box-sizing: border-box;
  padding: 22.5px 0px;
`;

const CopyContainer = styled.div`
  height: 300px;
  width: 530px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  @media (max-width: 1000px) {
    width: 400px;
  }
  @media (max-width: 900px) {
    width: 300px;
    padding: 16px 0px;
  }
`;

const Header = styled.span`
  width: 100%;
  height: 147px;
  display: flex;
  align-items: center;
  @media (max-width: 1000px) {
    height: 127px;
  }
  @media (max-width: 900px) {
    height: 90px;
  }
  @media (max-width: 500px) {
    height: 60px;
  }
`;

const Headline = styled.h2`
  margin: 0;
  font-size: 110px;
  font-family: 'Noto Sans Regular';
  text-align: center;
  display: inline-block;
  color: ${(props) => props.theme.colors.saturated_contrast};
  @media (max-width: 1000px) {
    font-size: 90px;
  }
  @media (max-width: 900px) {
    font-size: 70px;
  }
`;

const Padlock = styled.img`
  width: 60px;
  height: 60px;
  display: inline-block;
  transform: translate(-10px, -60px);
  @media (max-width: 400px) {
    transform: translate(-30px, -40px);
  }
`;

const Copy = styled.p`
  width: 450px;
  height: 60px;
  color: ${(props) => props.theme.colors.saturated_contrast};
  font-size: 20px;
  font-family: 'Josefin Sans Light';
  @media (max-width: 1000px) {
    width: 400px;
  }
  @media (max-width: 900px) {
    width: 300px;
    margin-bottom: 16px;
  }
`;

const CTAButton = styled.button`
  width: 450px;
  height: 50px;
  background: ${(props) => props.theme.colors.yellow};
  border-radius: 8px;
  border: none;
  color: white;
  font-family: 'Noto Sans Regular';
  font-size: medium;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 1000px) {
    width: 400px;
  }
  @media (max-width: 900px) {
    width: 300px;
  }
`;

const BigPadlock = styled.img`
  position: absolute;
  right: -100px;
  margin: 0;
  @media (max-width: 800px) {
    right: 150px;
  }
  @media (max-width: 670px) {
    right: 0;
    left: 0;
    top: 150px;
  }
`;

const Sandbox = (props) => {
  useEffect(() => {
    AOS.init({ duration: 500 });
    AOS.refresh();
  }, []);
  return (
    <ParentContainer>
      <Container>
        <BigPadlock
          src={PadLogoBig}
          data-aos="fade-up-left"
          data-aos-duration="3000"
        />
        <LogoContainer data-aos="fade-right" data-aos-duration="3000">
          <SandboxLogo />
        </LogoContainer>
        <CopyContainer>
          <Header data-aos="fade-down" data-aos-duration="3000">
            <Headline>Sandbox</Headline>
            <Padlock src={PadLogoSmall} />
          </Header>
          <Copy>
            Deposit the funds with us for your transactions. We hold on to the
            money and pay the vendor when you are both satisfied with the
            service rendered.
          </Copy>
          <CTAButton data-aos="fade-up-left" data-aos-duration="1000">
            Try for free >
          </CTAButton>
        </CopyContainer>
      </Container>
    </ParentContainer>
  );
};

export default Sandbox;
