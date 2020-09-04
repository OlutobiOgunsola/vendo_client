import React from 'react';
import styled, { keyframes } from 'styled-components';
import { slideInLeft } from 'react-animations';

const slideInAnimation = keyframes`${slideInLeft}`;

const ParentContainer = styled.div`
  width: 40%;
  height: 30px;
  position: fixed;
  top: 36px;
  left: 30%;
  z-index: 9999999999999;
  transition: all 1s ease-in-out;
  background: ${(props) => {
    switch (props.type) {
      case 'error':
        return `${props.theme.colors.alert_background_red}`;
      case 'success':
        return `${props.theme.colors.alert_background_green}`;
    }
  }};
  animation: 1s ${slideInAnimation};
`;

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 30px;
  font-family: 'Josefin Sans Light';
  color: ${(props) => {
    switch (props.type) {
      case 'error':
        return `${props.theme.colors.alert_text_red}`;
      case 'success':
        return `${props.theme.colors.alert_text_green}`;
      case 'warning':
        return `${props.theme.colors.alert_text_amber}`;
    }
  }};
  @media (max-width: 700px) {
    font-size: 12px;
  }
  @media (max-width: 500px) {
    font-size: 9px;
  }
`;

const Alert = (props) => {
  return (
    <ParentContainer id="parent" type={props.type}>
      <Container>
        <Text type={props.type}>{props.children}</Text>
      </Container>
    </ParentContainer>
  );
};

export default Alert;
