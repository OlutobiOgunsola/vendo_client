import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboard,
  faUsers,
  faStore,
  faFileArchive,
  faCreditCard,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

const ParentContainer = styled.div`
  width: 100%;
  height: auto;
  @media (max-width: 620px) {
    width: calc(100% - 3rem);
  }
`;
const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: column nowrap;
  .selected {
    background: ${(props) => props.theme.colors.dark_background};
    font-size: 12.5px;
    font-family: 'Josefin Sans Regular';
    text-decoration: none;
    border-bottom: 1px solid
      ${(props) => props.theme.colors.saturated_contrast_20};
    color: ${(props) => props.theme.colors.saturated_contrast};
    .fa-icon {
      color: ${(props) => props.theme.colors.yellow};
    }
  }

  @media (max-width: 620px) {
    flex-flow: row wrap;
  }

  @media (max-width: 480px) {
    .selected {
      font-size: 10px;
      font-family: 'Josefin Sans Regular';
    }
  }
`;

const LinkItem = styled(NavLink)`
  width: fit-content;
  height: 2.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-flow: row nowrap;
  text-decoration: none;
  box-sizing: border-box;
  border-radius: 4px 4px 0px 0px;
  padding: 0.8rem 0.334rem;
  font-family: 'Josefin Sans Light';
  font-size: 12px;
  text-align: left;
  transition: all 0.25s ease-in-out;
  color: ${(props) => props.theme.colors.saturated_contrast_80};
  .fa-icon {
    width: 1.75rem;
    margin-left: auto;
    transition: all 0.25s ease-in-out;
    color: ${(props) => props.theme.colors.saturated_contrast_20};
  }

  &:hover {
    font-size: 12.5px;
    text-decoration: none;
    color: ${(props) => props.theme.colors.saturated_contrast};
    border-bottom: 1px solid ${(props) => props.theme.colors.yellow};
  }

  @media (min-width: 620px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 0.75rem 0.2rem;
  }
`;

const Navbar = (props) => {
  const all = useRef(null);
  const users = useRef(null);
  const stores = useRef(null);
  const reviews = useRef(null);
  const transactions = useRef(null);
  const refArray = [all, users, stores, transactions, reviews];

  useLayoutEffect(() => {
    refArray.forEach((ref) => {
      return ref.current.classList.remove('selected');
    });
  }, []);
  const setDisplay = (e) => {
    refArray.forEach((ref) => {
      return ref.current.classList.remove('selected');
    });
    const target = e.target;
    target.classList.add('selected');
    // return props.setDisplay(id);
  };
  return (
    <ParentContainer>
      <Container>
        <LinkItem
          className="nav-link-item"
          activeClassName="selected"
          to="#all"
          id="all"
          ref={all}
          onClick={setDisplay}
        >
          All
          <FontAwesomeIcon className="fa-icon" icon={faFileArchive} />
        </LinkItem>
        <LinkItem
          className="nav-link-item"
          activeClassName="selected"
          to="#users"
          id="users"
          ref={users}
          onClick={setDisplay}
        >
          Users
          <FontAwesomeIcon className="fa-icon" icon={faUsers} />
        </LinkItem>
        <LinkItem
          className="nav-link-item"
          activeClassName="selected"
          to="#stores"
          id="stores"
          ref={stores}
          onClick={setDisplay}
        >
          Stores
          <FontAwesomeIcon className="fa-icon" icon={faStore} />
        </LinkItem>
        <LinkItem
          className="nav-link-item"
          activeClassName="selected"
          to="#reviews"
          id="reviews"
          ref={reviews}
          onClick={setDisplay}
        >
          Reviews
          <FontAwesomeIcon className="fa-icon" icon={faClipboard} />
        </LinkItem>
        <LinkItem
          className="nav-link-item"
          activeClassName="selected"
          to="#transactions"
          id="transactions"
          ref={transactions}
          onClick={setDisplay}
        >
          Transactions
          <FontAwesomeIcon className="fa-icon" icon={faCreditCard} />
        </LinkItem>
      </Container>
    </ParentContainer>
  );
};

export default Navbar;
