import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

import Line from '@/assets/images/icons/Line.svg';

const fadeUpAnimation = keyframes`${fadeIn}`;

const ParentContainer = styled.div`
  animation: 1s ${fadeUpAnimation};
  width: 100%;
  height: 202px;
  background: ${(props) => props.theme.colors.light_background};
  margin: 0;
  padding: 40px 100px;
  box-sizing: border-box;
  @media (max-width: 600px) {
    padding: 40px 50px;
  }
  @media (max-width: 400px) {
    padding: 40px 30px;
  }
`;

const Container = styled.div`
  height: 102px;
  max-width: 880px;
  margin: 0px auto;
  background: ${(props) => props.theme.colors.dark_background_20};
  text-align: center;
  padding: 38px;
  box-sizing: border-box;
  border-radius: 4px;
`;

const Copy = styled.p`
  margin: 0px 0px 5px 0px;
  font-family: 'Mali';
  font-size: 20px;
  color: ${(props) => props.theme.colors.font_high_contrast};
  @media (max-width: 730px) {
    font-size: 15px;
  }
  @media (max-width: 400px) {
    font-size: 10px;
  }
`;

const Underline = styled.div`
  margin: 10px auto;
  width: 64px;
  height: 2px;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.yellow};
  @media (max-width: 400px) {
    width: 32px;
  }
`;

const V_Propstn = (props) => {
  return (
    <ParentContainer>
      <Container>
        <Copy>Get first hand information on internet vendors</Copy>
        <Underline />
      </Container>
    </ParentContainer>
  );
};

export default V_Propstn;
