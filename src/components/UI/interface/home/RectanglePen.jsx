import React from 'react';
import styled from 'styled-components';

const PenContainer = styled.svg`
  fill: ${(props) => props.theme.colors.yellow};
`;

const RectanglePen = (props) => {
  return (
    <PenContainer viewBox="0 0 40 40">
      <rect width="40" height="40" rx="10" />
      <g id="pen-svg">
        <path
          d="M24.04 11L29 15.97L27.57 17.38L22.62 12.43L24.04 11V11ZM12 27.28L18.5 20.81C18.4 20.5 18.47 20.11 18.73 19.85C19.12 19.46 19.76 19.46 20.15 19.85C20.54 20.25 20.54 20.88 20.15 21.27C19.89 21.53 19.5 21.6 19.19 21.5L12.72 28L23.33 24.45L26.86 18.09L21.92 13.14L15.55 16.67L12 27.28Z"
          fill="#2B363B"
        />
      </g>
    </PenContainer>
  );
};

export default RectanglePen;
