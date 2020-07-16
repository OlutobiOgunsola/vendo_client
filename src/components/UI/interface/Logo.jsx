import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.svg`
  fill: ${(props) => props.theme.colors.yellow};
  transition: all 0.2s ease-in-out;
  &:hover {
    fill: ${(props) => props.theme.colors.white};
    cursor: pointer;
  }
`;

const Logo = (props) => {
  return (
    <LogoContainer viewBox="0 0 43 45">
      <path d="M14.1646 44.6415L33.2146 11.4933C33.2146 11.4933 44.0643 12.181 35.0774 25.1621C26.0905 38.1431 14.1646 44.6415 14.1646 44.6415Z" />
      <path d="M8.22154 11.4933L32.0655 11.4933C32.0655 11.4933 29.115 16.6599 28.4229 17.7714C23.9112 24.7925 13.3134 21.256 8.22154 16.3033C3.12969 11.3506 8.22154 11.4933 8.22154 11.4933Z" />
    </LogoContainer>
  );
};

export default Logo;
