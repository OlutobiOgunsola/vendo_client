import React, { Suspense } from 'react';
import styled, { keyframes } from 'styled-components';
import { slideInUp, slideInDown, fadeIn } from 'react-animations';

import Loading from '@/components/UI/interface/home/Loading';
import desktopLanding from '@/assets/images/backgrounds/desktopLandingMainSnipped.jpg';
import Header from '@/components/UI/Header';
import Pen from '@/components/UI/interface/home/RectanglePen.jsx';
import DownChevronIcon from '@/components/UI/interface/home/DownChevron.jsx';

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
  /* background: url(${desktopLanding}); */
  background-size: cover;
  margin: 0px;
  font-size: 16px;
`;
const Modal = styled.div`
  height: 640px;
  background: ${(props) => props.theme.colors.dark_background};
  padding: 10px 100px;
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
  width: 600px;
  margin: 140px auto 0px auto;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  text-align: left;
  animation: 1s ${slideInDownAnimation};
  @media (max-width: 700px) {
    height: 300;
    margin: 130px auto 38px auto;
  }
  @media (max-width: 500px) {
    width: 300px;
    height: 300;
    margin: 150px auto 28px auto;
    align-items: flex-start;
  }
`;

const Jumbo = styled.h1`
  color: ${(props) => props.theme.colors.yellow};
  font-family: 'Oxygen Bold', 'Sans Serif';
  font-size: 2.5rem;
  margin: 1rem 0rem;
  @media (max-width: 700px) {
    font-size: 2rem;
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
  margin: 0.5rem 0rem;
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
  padding: 0.5rem 1.5rem;
  box-sizing: border-box;
  line-height: 19px;
  outline: none;
  margin-top: 1.5rem;
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
          <Jumbo>Shop smart on the internet</Jumbo>
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
