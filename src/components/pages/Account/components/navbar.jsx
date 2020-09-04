import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListUl,
  faCreditCard,
  faClipboard,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

const ParentContainer = styled.div`
  width: 100%;
  height: 50px;
`;
const Container = styled.div`
  width: fit-content;
  height: 40px;
  margin: 0px 0px 30px auto;
  border-bottom: 0.5px solid
    ${(props) => props.theme.colors.saturated_contrast_40};
  .active {
    font-size: 12.5px;
    font-family: 'Josefin Sans Regular';
    text-decoration: none;
    color: ${(props) => props.theme.colors.saturated_contrast};
    border-bottom: 2px solid ${(props) => props.theme.colors.yellow};
  }
  .active .fa-icon {
    color: ${(props) => props.theme.colors.saturated_contrast};
  }
  @media (max-width: 480px) {
    .active {
      font-size: 10px;
      font-family: 'Josefin Sans Regular';
    }
  }
`;

const LinkItem = styled(NavLink)`
  margin: 0px 0px 0px 8px;
  &:first-child {
    margin: 0px;
  }
  width: auto;
  height: 40px;
  display: inline-flex;
  flex-flow: row nowrap;
  text-decoration: none;
  box-sizing: border-box;
  padding: 8px 4px;
  font-family: 'Josefin Sans Light';
  font-size: 12px;
  line-height: 16px;
  transition: all 0.25s ease-in-out;
  color: ${(props) => props.theme.colors.saturated_contrast_80};
  .fa-icon {
    transition: all 0.25s ease-in-out;
    margin-right: 4px;
    color: ${(props) => props.theme.colors.saturated_contrast_20};
  }

  &:hover {
    font-size: 12.5px;
    text-decoration: none;
    color: ${(props) => props.theme.colors.saturated_contrast};
    border-bottom: 1px solid ${(props) => props.theme.colors.yellow};
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 8px 2px;
  }
`;
const Navbar = (props) => {
  const setDisplay = (e) => {
    const target = e.target;
    const id = target.id;
    return props.setDisplay(id);
  };
  return (
    <ParentContainer>
      <Container>
        <LinkItem
          activeClassName="active"
          to="/account/overview"
          id="overview"
          onClick={setDisplay}
        >
          <FontAwesomeIcon className="fa-icon" icon={faListUl} />
          Overview
        </LinkItem>
        <LinkItem
          activeClassName="active"
          to="/account/transactions"
          id="transactions"
          onClick={setDisplay}
        >
          <FontAwesomeIcon className="fa-icon" icon={faCreditCard} />
          Transactions
        </LinkItem>
        <LinkItem
          activeClassName="active"
          to="/account/reviews"
          id="reviews"
          onClick={setDisplay}
        >
          <FontAwesomeIcon className="fa-icon" icon={faClipboard} />
          Reviews
        </LinkItem>
        <LinkItem
          activeClassName="active"
          to="/account/settings"
          id="settings"
          onClick={setDisplay}
        >
          <FontAwesomeIcon className="fa-icon" icon={faCog} />
          Settings
        </LinkItem>
      </Container>
    </ParentContainer>
  );
};

export default Navbar;
