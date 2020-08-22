import React from 'react';
import styled, { keyframes, withTheme } from 'styled-components';

import Logo from '@/components/UI/interface/home/Logo';

const rotate = keyframes`
0% {
  transform: rotate(0deg);
}
50%{
  transform: rotate(180deg);
}
100% {
  transform: rotate(360deg);
}
`;

const bulge = keyframes`
 0% {
     width: 100px;
     height: 100px;
 }
 50% {
     width: 110px;
     height: 110px;
 }
 100% {
     width: 100px;
     height: 100px;
 }
`;

const ParentContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme.colors.dark_background};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  margin: 0 auto;
  width: 300px;
  height: 300px;
  display: flex;
  padding: 0px 25px;
  box-sizing: border-box;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;
const Borders = styled.span`
  height: 250px;
  width: 250px;
  border: 2px solid ${(props) => props.theme.colors.yellow};
  border-radius: 50%;
  border-style: solid hidden hidden hidden;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  animation: ${rotate} 1s linear infinite;
  margin: 0px;
`;

const LogoContainer = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  margin: 0px;
  display: inline-block;
  animation: ${bulge} 1s linear infinite;
`;

const Loading = (props) => {
  return (
    <ParentContainer>
      <Container>
        <Borders theme={props.theme} />
        <LogoContainer>
          <Logo />
        </LogoContainer>
      </Container>
    </ParentContainer>
  );
};

export default withTheme(Loading);
