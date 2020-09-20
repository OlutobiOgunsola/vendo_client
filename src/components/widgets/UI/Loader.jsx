import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const Spin = keyframes`
  from{
    transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }
`;

const ParentContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: ${(props) => props.theme.colors.dark_background_60};
  z-index: 999999999999;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  transition: ${(props) => `all ${props.transition || 2}s ease-in-out`};
`;

const Spinner = styled.span`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border-style: dashed hidden;
  border-color: ${(props) => props.theme.colors.yellow};
  border-width: 3px;
  display: block;
  animation: ${Spin} 2s linear infinite;
`;

const Loader = (props) => {
  useEffect(() => {
    const parent = document.getElementById('cont');
    setTimeout(() => {
      parent.style.opacity = 1;
    }, 1000);
  }, []);
  return (
    <ParentContainer id="cont" transition={props.transition}>
      <Spinner />
    </ParentContainer>
  );
};

export default Loader;
