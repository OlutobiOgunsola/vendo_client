import React from 'react';
import styled, { withTheme } from 'styled-components';

const LogoContainer = styled.svg`
  fill: ${(props) => props.theme.colors.yellow};
`;

const SandboxLogo = (props) => {
  return (
    <LogoContainer width="250" height="255" viewBox="0 0 250 255" fill="none">
      <rect
        x="10.5"
        y="1.2644"
        width="229"
        height="197.276"
        rx="4.5"
        fill={`${props.theme.colors.dark_background}`}
        stroke={`${props.theme.colors.yellow}`}
        strokeWidth="3"
      />
      <rect
        x="0.5"
        y="39.5637"
        width="249"
        height="214.517"
        rx="4.5"
        fill={`${props.theme.colors.dark_background}`}
        stroke={`${props.theme.colors.yellow}`}
        strokeWidth="3"
      />
      <path
        d="M88.4766 220.704L164.201 88.9399C164.201 88.9399 207.328 91.6736 171.605 143.273C135.882 194.873 88.4766 220.704 88.4766 220.704Z"
        fill={`${props.theme.colors.yellow}`}
      />
      <path
        d="M64.8545 88.9397L159.634 88.9397C159.634 88.9397 147.906 109.477 145.155 113.895C127.221 141.804 85.0946 127.747 64.8545 108.06C44.6144 88.3727 64.8545 88.9397 64.8545 88.9397Z"
        fill={`${props.theme.colors.yellow}`}
      />
    </LogoContainer>
  );
};

export default withTheme(SandboxLogo);
