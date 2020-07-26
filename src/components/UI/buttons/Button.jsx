import React from 'react';
import styled, { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled(Link)`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: ${(props) => props.border || '1px solid white'};
  background: ${(props) => props.fill || props.theme.colors.dark_background};
  display: ${(props) => props.display || 'block'};
  border-radius: 4px;
  opacity: 0.8;
  line-height: ${(props) => props.height}px;
  text-align: center;
  text-decoration: none;
  font-size: ${(props) => props.font_size || '16px'};
  font-family: ${(props) => props.font_family || 'Noto Sans Regular'};
  color: ${(props) => props.color || 'white'};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
  z-index: ${(props) => props.z_index};
  transition: all 0.5s ease-in-out;
  &:hover {
    opacity: 1;
    background: ${(props) =>
      props.transition_fill || props.theme.colors.dark_background};
    color: ${(props) => props.transition_color || 'white'};
    cursor: pointer;
  }
`;

const Button = (props) => {
  const color = () => {
    if (props.theme.scheme === 'dark') {
      return props.color || 'white';
    } else {
      return props.color;
    }
  };

  const borders = () => {
    if (props.theme.scheme === 'dark') {
      return '1px solid white';
    } else {
      return ` 1px solid ${
        props.border_color || props.theme.colors.dark_background
      }`;
    }
  };
  return (
    <Container to={props.to} {...props} color={color()} borders={borders()}>
      {props.children}
    </Container>
  );
};

export default withTheme(Button);
