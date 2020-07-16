import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled(Link)`
  width: 100px;
  height: 40px;
  border: 1px solid white;
  border-radius: 4px;
  line-height: 40px;
  text-align: center;
  text-decoration: none;
  color: white;
  margin-left: auto;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: white;
    color: #182a30;
  }
`;

const HeaderSignIn = (props) => {
  return <Button to="/auth">Sign In</Button>;
};

export default HeaderSignIn;
