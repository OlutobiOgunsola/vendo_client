import React from 'react';
import styled from 'styled-components';

const IconContainer = styled.svg`
  fill: ${(props) => props.fillCol};
  transition: all 0.2s ease-in-out;
  opacity: 0.8;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const Downvote = (props) => {
  return (
    <IconContainer fillCol={props.fillCol} viewBox="0 0 20 20">
      <path d="M9.176 14.569a.998.998 0 001.644 0l9-13A1 1 0 0018.998 0h-18a1.002 1.002 0 00-.822 1.569l9 13z" />
    </IconContainer>
  );
};

export default Downvote;
