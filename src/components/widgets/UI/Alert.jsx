import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { slideInLeft } from 'react-animations';

const slideInAnimation = keyframes`${slideInLeft}`;

const ParentContainer = styled.div`
  width: 100%;
  height: 0;
  position: ${(props) => (props.position ? props.position : 'relative')};
  top: 0;
  left: 0
  '';
  font-size: 16px;
  z-index: 9999999999999;
  transition: all 1s ease-in-out;
  background: ${(props) => {
    switch (props.type) {
      case 'error':
        return `${props.theme.colors.alert_background_red}`;
      case 'success':
        return `${props.theme.colors.alert_background_green}`;
      case 'warning':
        return `${props.theme.colors.alert_background_amber}`;
      default:
        return null;
    }
  }};
`;

const Container = styled.div`
  width: 100%;
  height: 0;
  text-align: center;
  transition: all 1s ease-in-out;
`;

const Text = styled.p`
  font-size: 14px;
  font-family: 'Josefin Sans Light';
  color: white;
  margin: 0.5rem 0rem;
  box-sizing: border-box;
  color: ${(props) => {
    switch (props.type) {
      case 'error':
        return `${props.theme.colors.alert_text_red}`;
      case 'success':
        return `${props.theme.colors.alert_text_green}`;
      case 'warning':
        return `${props.theme.colors.alert_text_amber}`;
      default:
        return null;
    }
  }};
  @media (max-width: 700px) {
    font-size: 12px;
    margin: 9px 0rem;
  }
  @media (max-width: 500px) {
    font-size: 10px;
    margin: 10px 0rem;
  }
`;

const Alert = (props) => {
  const [open, setOpen] = useState(false);
  const parent = useRef(null);
  const child = useRef(null);
  const refArray = [parent, child];
  useEffect(() => {
    setOpen(true);
  }, []);
  useEffect(() => {
    if (open) {
      refArray.forEach((ref) => {
        if (ref.current) {
          ref.current.style.height = '30px';
        }
      });
    }

    const timer = setTimeout(() => {
      refArray.forEach((ref) => {
        if (ref.current) {
          ref.current.style.height = '0px';
        }
      });
      setOpen(false);
      clearTimeout(timer);
    }, 3000);
  }, [open]);
  return (
    <ParentContainer
      position={props.position}
      ref={parent}
      id="parent"
      type={props.type}
    >
      <Container ref={child}>
        <Text data-aos="fade-in" data-aos-duration="1500" type={props.type}>
          {props.children}
        </Text>
      </Container>
    </ParentContainer>
  );
};

export default Alert;
