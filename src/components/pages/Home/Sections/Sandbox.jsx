import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

import SandboxLogo from '@/components/UI/interface/home/SandboxLogo';
import PadLogoSmall from '@/assets/images/icons/sandbox/Padlock_2.svg';
import PadLogoBig from '@/assets/images/icons/sandbox/Padlock.svg';
import SandboxBG from '@/assets/images/backgrounds/home/sandboxImage.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

const ParentContainer = styled.div`
  display: flex;
  /* background: url(${SandboxBG}); */
  align-items: center;
  width: 100%;
  @media (min-width: 1280px) {
    height: 500px;
  }
  @media (min-width: 880px) and (max-width: 1279px) {
    height: 500px;
  }
  @media (min-width: 533px) and (max-width: 879px) {
    height: 500px;
  }
  @media (max-width: 532px) {
    height: 500px;
  }
  @media (max-width: 670px) {
    height: 700px;
  }
`;

const Modal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  background: ${(props) => props.theme.colors.dark_background};
  padding: 0;
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

const Action = styled(Link)`
  position: relative;
  z-index: 9;
  display: inline-block;
  line-height: 50px;
  width: 100%;
  height: 50px;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
  color: ${(props) =>
    props.borders
      ? `${props.theme.colors.yellow}`
      : `${props.theme.colors.saturated_contrast}`};
  border: ${(props) =>
    props.borders ? `1px solid ${props.theme.colors.yellow}` : 'none'};
  border-radius: 4px;
  transition: all 0.5s ease-in-out;
  text-decoration: none;
  .fa-icon {
    width: 0px;
    position: relative;
    left: 0px;
    margin-left: 0px;
    transition: all 1s ease-in-out;
    opacity: 0;
    color: ${(props) => props.theme.colors.dark_background};
  }
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.dark_background};
    /* box-shadow: 0px 4px 10px ${(props) => props.theme.colors.yellow_20}; */
    .fa-icon {
      width: 24px;
      left: 8px;
      margin-left: 0px;
      opacity: 1;
    }
    border: none;
  }
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    top: -0.5px;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${(props) => props.theme.colors.yellow};
    z-index: -1;
    transform: scaleX(0);
    transition-property: transform;
    -webkit-transform-origin: 0 50%;
    transform-origin: 0 50%;
    -webkit-transition-property: transform;
    transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  &:hover:before {
    transform: scaleX(1);
  }
  @media (max-width: 1000px) {
    width: 400px;
  }
  @media (max-width: 900px) {
    width: 300px;
  }
`;

const Sandbox = (props) => {
  useEffect(() => {
    AOS.init({ duration: 500 });
    AOS.refresh();
  }, []);
  return (
    <ParentContainer>
      <Modal>
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
            <Action
              data-aos="fade-up-left"
              data-aos-duration="1000"
              to={'#'}
              borders="true"
            >
              Try for <strong>FREE</strong>
              <FontAwesomeIcon className="fa-icon" icon={faLongArrowAltRight} />
            </Action>
          </CopyContainer>
        </Container>
      </Modal>
    </ParentContainer>
  );
};

export default Sandbox;
