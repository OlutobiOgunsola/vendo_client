import React, { Suspense } from 'react';
import styled, { keyframes } from 'styled-components';
import { slideInUp, slideInDown, fadeIn } from 'react-animations';

import Loading from './node_modules/@/components/UI/interface/home/Loading';
import desktopLanding from './node_modules/@/assets/images/backgrounds/desktopLandingMainSnipped.jpg';
import Header from './node_modules/@/components/UI/Header';
import Pen from './node_modules/@/components/UI/interface/home/RectanglePen.jsx.js';
import DownChevronIcon from './node_modules/@/components/UI/interface/home/DownChevron.jsx.js';

const fadeInAnimation = keyframes`${fadeIn}`;
const slideInUpAnimation = keyframes`${slideInUp}`;
const slideInDownAnimation = keyframes`${slideInDown}`;
const bubble = keyframes`
  0% {
    transform: translatey(-10px);
  }

  50% {
    transform: translatey(0px);
  }
  100% {
    transform: translatey(-10px);
  }
`;

const ParentContainer = styled.div`
  width: 100%;
  height: 660px;
  background: url(${desktopLanding});
  background-size: cover;
  margin: 0px;
  animation: 2s ${fadeInAnimation};
`;
const Modal = styled.div`
  height: 640px;
  background: ${(props) => props.theme.colors.dark_background_80};
  padding: 10px 200px;
  @media (max-width: 900px) {
    padding: 10px 100px;
  }
  @media (max-width: 700px) {
    padding: 10px 50px;
  }
  @media (max-width: 500px) {
    padding: 10px 20px;
  }

  .copy-enter {
    opacity: 0.01;
    transform: scale(1.1);
  }

  .copy-enter .copy-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: all 300ms;
  }

  .copy-exit {
    opacity: 1;
    transform: scale(1);
  }

  .copy-exit .copy-exit-active {
    opacity: 0.01;
    transform: scale(1.1);
    transition: all 300ms;
  }
`;

const CopyContainer = styled.div`
  height: 360px;
  width: 386px;
  margin: 80px auto 88px auto;
  display: flex;
  flex-direction: column;
  animation: 1s ${slideInDownAnimation};
  @media (max-width: 700px) {
    height: 300;
    margin: 110px auto 58px auto;
  }
  @media (max-width: 500px) {
    width: 300px;
    height: 300;
    margin: 110px auto 58px auto;
  }
`;

const Headline = styled.h2`
  color: white;
  font-family: 'Dancing Script', 'Arial';
  font-weight: 300;
  font-size: 72px;
  font-weight: light;
  margin: 0px;
  position: relative;
  top: 40px;
  text-align: center;
  @media (max-width: 700px) {
    text-align: left;
    font-size: 50px;
    top: 20px;
  }
`;
const Jumbo = styled.h1`
  color: ${(props) => props.theme.colors.yellow};
  font-family: 'Oxygen Bold', 'Sans Serif';
  font-size: 140px;
  margin: 0px;
  @media (max-width: 700px) {
    font-size: 80px;
  }
`;

const SubHeading = styled.div`
  width: 386px;
  height: 40px;
  @media (max-width: 700px) {
    width: 368px;
  }
  @media (max-width: 900px) {
    width: 368px;
  }
  @media (max-width: 400px) {
    width: 320px;
  }
`;

const PenIcon = styled.svg`
  float: left;
  height: 40px;
  width: 40px;
  display: inline;
  margin-right: 16px;
`;

const SubHeadingCopy = styled.p`
  display: inline;
  height: 40px;
  color: white;
  font-family: 'Josefin Sans Light', 'Sans Serif';
  font-weight: 'lighter';
  font-size: 20px;
  @media (max-width: 400px) {
    font-size: 16px;
  }
`;

const SearchInput = styled.input`
  background: rgba(255, 255, 255, 0.3);
  width: 386px;
  height: 40px;
  border: none;
  border-radius: 4px;
  padding: 7px 24px;
  box-sizing: border-box;
  line-height: 19px;
  outline: none;
  margin-top: 24px;
  color: white;
  font-family: 'Josefin Sans Light', 'Sans Serif';
  font-size: 18px;
  display: inline-block;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  :-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  @media (max-width: 970px) {
    width: 386px;
  }
  @media (max-width: 740px) {
    margin-right: 32px;
  }
  @media (max-width: 480px) {
    width: 270px;
    margin-right: 32px;
  }
`;

const DownChevronContainer = styled.div`
  width: 100%;
  height: 50px;
  animation: 1s ${slideInUpAnimation};
`;
const DownChevron = styled.svg`
  display: block;
  margin: 0 auto;
  width: 30px;
  height: 50px;
  animation: ${bubble} 2s ease-in-out infinite;
`;

const LandingScreen = () => {
  const loading = <Loading />;
  return (
    <ParentContainer>
      <Modal>
        <Header usePagePadding />
        <CopyContainer>
          <Headline>Shop</Headline> <Jumbo>Smart</Jumbo>
          <SubHeading>
            <PenIcon>
              <Pen />
            </PenIcon>
            <SubHeadingCopy>
              Vendor reviews at your fingertips, anywhere, anytime
            </SubHeadingCopy>
          </SubHeading>
          <SearchInput type="search" placeholder="Search for a vendor" />
        </CopyContainer>
        <DownChevronContainer>
          <DownChevron>
            <DownChevronIcon />
          </DownChevron>
        </DownChevronContainer>
      </Modal>
    </ParentContainer>
  );
};

export default LandingScreen;
