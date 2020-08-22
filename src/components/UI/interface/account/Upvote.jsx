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

const Upvote = (props) => {
  return (
    <IconContainer fillCol={props.fillCol} viewBox="0 0 20 20">
      <path d="M1 14.973h18a1.002 1.002 0 00.824-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A1 1 0 001 14.974z" />
    </IconContainer>
  );
};

export default Upvote;
