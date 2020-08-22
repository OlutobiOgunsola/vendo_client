import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.svg`
  fill: ${(props) => props.theme.colors.dark_background_60};
  transition: all 0.2s ease-in-out;
  margin: 0;
  &:hover {
    fill: ${(props) => props.theme.colors.dark_background};
    cursor: pointer;
  }
`;

const PaperPlane = (props) => {
  return (
    <LogoContainer width="18" height="18">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8A8 8 0 11-.001 8 8 8 0 0116 8zm-8.354 2.646a.5.5 0 10.708.708l3-3a.5.5 0 000-.708l-3-3a.5.5 0 00-.708.708L9.793 7.5H5a.5.5 0 100 1h4.793l-2.147 2.146z"
      />
    </LogoContainer>
  );
};

export default PaperPlane;
