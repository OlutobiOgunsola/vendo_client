import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

const Button = styled(Link)`
  width: 120px;
  height: 40px;
  padding: 0.25rem;
  font-size: 16px;
  font-family: 'Josefin Sans Light';
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
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const HeaderSignIn = (props) => {
  const navigate = () => {
    const location = props.location.pathname;
    localStorage.setItem('vendo_prev_location_url', JSON.stringify(location));
  };
  return (
    <Button to="/auth" onClick={navigate}>
      Sign In
    </Button>
  );
};

export default withRouter(HeaderSignIn);
