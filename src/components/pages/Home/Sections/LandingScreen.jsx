import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { slideInUp, slideInDown, fadeIn } from 'react-animations';

import Loading from '@/components/UI/interface/home/Loading';
import landingImage from '@/assets/images/backgrounds/LandingImage.jpg';
import Header from '@/components/UI/Header';
import Pen from '@/components/UI/interface/home/RectanglePen.jsx';
import DownChevronIcon from '@/components/UI/interface/home/DownChevron.jsx';
import { withRouter } from 'react-router';
import { TimelineMax, CSSPlugin, gsap } from 'gsap/all';

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
  margin: 0px;
  font-size: 16px;
  .stagger {
    opacity: 1;
  }
  overflow: hidden;
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
  margin: 60px auto 0px 100px;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  text-align: left;
  @media (max-width: 1000px) {
    height: 300;
    width: 400px;
    margin: 70px auto 38px 50px;
  }
  @media (max-width: 500px) {
    width: 340px;
    height: 300px;
    margin: 166px auto 28px 20px;
    align-items: flex-start;
  }
  @media (max-width: 360px) {
    width: 300px;
    height: 300px;
    margin: 166px auto 28px 20px;
    align-items: flex-start;
  }
`;
const JumboContainer = styled.span`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
`;
const Jumbo = styled.h1`
  color: ${(props) => props.theme.colors.yellow};
  font-family: 'Oxygen Bold', 'Sans Serif';
  font-size: 2.5rem;
  margin: 1rem 0rem;
  width: calc(100%-110px);
  text-align: left;
  display: inline-block;
  b {
    color: white;
    font-family: 'Oxygen Bold', 'Sans Serif';
    width: 110px;
    display: inline-block;
    position: relative;
    z-index: 9;
  }
  @media (max-width: 1100px) {
    font-size: 2rem;
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
  display: inherit;
  flex-flow: row nowrap;
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
  @media (max-width: 1000px) {
    font-size: 18px;
  }
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

const Image = styled.img`
  width: 40%;
  height: 60%;
  position: absolute;
  top: 20%;
  left: 60%;
  opacity: 1;
  border-radius: 4px;
  border: none;
  box-shadow: 2px 10px 20px rgba(0, 0, 0, 0.4);
  z-index: 999;
  @media (max-width: 1000px) {
    width: 40%;
    height: 40%;
    top: 30%;
    left: 60%;
  }
  @media (max-width: 760px) {
    display: none;
  }
`;

const LandingScreen = (props) => {
  useEffect(() => {
    AOS.init({ duration: 500 });
    AOS.refresh();
  }, []);
  useEffect(() => {
    gsap.registerPlugin(CSSPlugin);
    const tl = new TimelineMax();
    tl.from('#copy-container', {
      duration: 1,
      opacity: 0,
      x: 300,
      ease: 'ease',
    })
      .to(
        '.stagger',
        {
          opacity: 1,
          marginLeft: 0,
          stagger: 0.4,
          duration: 1,
          ease: 'ease',
        },
        '<-0.2',
      )
      .from('#jumbo-bold', {
        x: window.innerWidth < 1000 ? 1000 : 2000,
        duration: 1,
        opacity: 0,
        ease: 'bounce',
      })
      .from(
        '#landing-image',
        {
          x: '70%',
          top: '200px',
          opacity: 0,
          duration: 3,
          ease: 'ease-in',
        },
        '<-1',
      )
      .from('#down-chevron', {
        duration: 3,
        opacity: 1,
        y: 200,
      });
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
        <Image src={landingImage} id="landing-image" />
        <CopyContainer id="copy-container">
          <JumboContainer id="jumbo-container" className="anim stagger">
            <Jumbo id="jumbo-text" className="anim1">
              All your reviews, in one{' '}
              <b id="jumbo-bold" className="anim1">
                place
              </b>
            </Jumbo>
          </JumboContainer>

          <SubHeading id="subheading-container" className="anim stagger">
            <PenIcon id="pen-icon" className="anim2">
              <Pen />
            </PenIcon>
            <SubHeadingCopy id="subheading-copy" className="anim2">
              Vendor reviews at your fingertips, anywhere, anytime
            </SubHeadingCopy>
          </SubHeading>
          <SearchInput
            value={searchString}
            onChange={handleInput}
            onKeyDown={processSearch}
            type="search"
            placeholder="Search for a vendor"
            id="search"
            className="anim stagger"
          />
        </CopyContainer>
        <DownChevronContainer>
          <DownChevron id="down-chevron">
            <DownChevronIcon />
          </DownChevron>
        </DownChevronContainer>
      </Modal>
    </ParentContainer>
  );
};

export default withRouter(LandingScreen);
