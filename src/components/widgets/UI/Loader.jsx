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
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
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
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border-style: dashed hidden;
  border-color: ${(props) => props.theme.colors.dark_background};
  border-width: 1px;
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
