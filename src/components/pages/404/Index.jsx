import React from 'react';
import styled, { withTheme, keyframes } from 'styled-components';
import Footer from '@/components/UI/Footer';
import Header from '@/components/UI/Header';
import Lottie from 'react-lottie';

import empty404 from '@/assets/images/lottie/404.json';

const ParentContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.dark_background};
  height: auto;
`;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.dark_background};
  /* padding: 20px; */

  hr {
    width: 100%;
    height: 0.1px;
    margin: 32px auto;
    border: none;
    opacity: 0.6;
    background: ${(props) => props.theme.colors.alternate_light_background_10};
  }

  @media (max-width: 900px) {
  }
  @media (max-width: 800px) {
  }
  @media (max-width: 700px) {
    flex-flow: column nowrap;
    padding: 40px 50px;
  }
  @media (max-width: 500px) {
    flex-flow: column nowrap;
    padding: 40px 10px;
    box-sizing: border-box;
  }
  @media (max-width: 400px) {
    flex-flow: column nowrap;
  }
`;

const EmptyStateText = styled.h5`
  text-align: center;
  color: ${(props) => props.theme.colors.saturated_contrast};
  margin: 16px 0px 8px 0px;
  width: 100%;
`;
const EmptyStateSubtext = styled.p`
  font-size: 12px;
  text-align: center;
  width: 100%;
  margin: 0px 0px 40px 0px;
  color: ${(props) => props.theme.colors.saturated_contrast};
`;

const Page404 = (props) => {
  // destructure pathname from useLocation hook

  const LottieOptions = {
    loop: true,
    autoplay: true,
    animationData: empty404,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <ParentContainer>
      <Header useOwnBackground />
      <Container>
        <Lottie options={LottieOptions} height={300} width={300} />
        <EmptyStateText
          style={{
            textAlign: 'center',
            color: `${props.theme.colors.saturated_contrast}`,
          }}
        >
          Oops! You seem to have followed a bad link.
        </EmptyStateText>
        <EmptyStateSubtext>Back to home</EmptyStateSubtext>
      </Container>
      <Footer />
    </ParentContainer>
  );
};

export default withTheme(Page404);
