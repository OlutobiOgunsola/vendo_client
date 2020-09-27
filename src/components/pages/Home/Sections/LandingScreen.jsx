import React, { Suspense, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { slideInUp, slideInDown, fadeIn } from 'react-animations';

import Loading from '@/components/UI/interface/home/Loading';
import desktopLanding from '@/assets/images/backgrounds/desktopLandingMainSnipped.jpg';
import Header from '@/components/UI/Header';
import Pen from '@/components/UI/interface/home/RectanglePen.jsx';
import DownChevronIcon from '@/components/UI/interface/home/DownChevron.jsx';
import { withRouter } from 'react-router';

import AOS from 'aos';
import 'aos/dist/aos.css';

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
  padding: 10px 0px;

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
  margin: 120px auto 0px auto;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  text-align: left;
  @media (max-width: 700px) {
    height: 300;
    width: 400px;
    margin: 130px auto 38px auto;
  }
  @media (max-width: 500px) {
    width: 340px;
    height: 300px;
    margin: 150px auto 28px auto;
    align-items: flex-start;
  }
`;

const Jumbo = styled.h1`
  color: ${(props) => props.theme.colors.yellow};
  font-family: 'Oxygen Bold', 'Sans Serif';
  font-size: 2.5rem;
  margin: 1rem 0rem;
  width: 100%;
  text-align: center;
  @media (max-width: 700px) {
    font-size: 2rem;
    text-align: center;
  }
  @media (max-width: 500px) {
    font-size: 1.5rem;
    text-align: left;
  }
`;

const SubHeading = styled.div`
  /* width: 100%; */
  height: 40px;
  margin: 0 auto;
  @media (max-width: 700px) {
    width: 100%;
  }
  @media (max-width: 900px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    width: 320px;
    margin: 0;
  }
`;

const PenIcon = styled.svg`
  float: left;
  height: 40px;
  width: 40px;
  display: inline-block;
  margin-right: 16px;
`;

const SubHeadingCopy = styled.p`
  display: inline-block;
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
  width: 400px;
  height: 40px;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  /* line-height: 19px; */
  outline: none;
  margin: 1.5rem auto 0rem auto;
  color: white;
  font-family: 'Josefin Sans Light', 'Sans Serif';
  font-size: 1.0125rem;
  display: block;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  :-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  @media (max-width: 600px) {
    width: 100%;
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

const LandingScreen = (props) => {
  useEffect(() => {
    AOS.init({ duration: 500 });
    AOS.refresh();
  }, []);
  const loading = <Loading />;
  const [searchString, setSearchString] = useState('');
  const handleInput = (e) => {
    const value = e.target.value;
    return setSearchString((prev) => {
      return value;
    });
  };
  const search = () => {
    return props.history.push(`/search?query=${searchString}`);
  };

  const processSearch = (e) => {
    if (e.key === 'Enter') {
      return search();
    }
    return null;
  };

  return (
    <ParentContainer>
      <Modal>
        <Header />
        <CopyContainer data-aos="fade-up" data-aos-duration="1000">
          <Jumbo>Shop smart on the internet</Jumbo>
          <SubHeading>
            <PenIcon>
              <Pen />
            </PenIcon>
            <SubHeadingCopy>
              Vendor reviews at your fingertips, anywhere, anytime
            </SubHeadingCopy>
          </SubHeading>
          <SearchInput
            value={searchString}
            onChange={handleInput}
            onKeyDown={processSearch}
            type="search"
            placeholder="Search for a vendor"
          />
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

export default withRouter(LandingScreen);
