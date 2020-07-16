import React from 'react';
import styled, { withTheme } from 'styled-components';

const LogoContainer = styled.svg`
  fill: ${(props) => props.theme.colors.saturated_contrast};
`;

const NumbersLogo = (props) => {
  return (
    <LogoContainer width="325" height="325" viewBox="0 0 325 325" fill="red">
      <path
        opacity="0.05"
        d="M82 334.483L271.136 0C271.136 0 378.855 6.93941 289.63 137.925C200.405 268.911 82 334.483 82 334.483Z"
        fill={props.theme.colors.font_high_contrast}
      />
      <path
        opacity="0.05"
        d="M22.5376 0.00429273L260 0.00429271C260 0.00429271 230.616 52.4211 223.723 63.6977C178.791 134.93 73.2473 99.0507 22.5376 48.8039C-28.172 -1.44285 22.5376 0.00429273 22.5376 0.00429273Z"
        fill={props.theme.colors.font_high_contrast}
      />
    </LogoContainer>
  );
};

export default withTheme(NumbersLogo);
