import React, { useLayoutEffect, useEffect } from 'react';
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
    border-bottom: solid 0.5px
      ${(props) => props.theme.colors.saturated_contrast_20};
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
      border-bottom: none;
      background: rgba(0, 0, 0, 0);
    }
    p {
      border-bottom: hidden !important;
      background: rgba(0, 0, 0, 0) !important;
    }
  }

  @media (max-width: 620px) {
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    .selected {
      font-size: 10px;
      font-family: 'Josefin Sans Regular';
    }
  }
`;

const LinkItem = styled.button`
  p {
    display: inline;
  }
  width: 100%;
  height: 2.5rem;
  @media (max-width: 620px) {
    width: 40px;
    height: 2rem;
    p {
      display: none;
    }
    &:hover {
      font-size: 10.5px;
      text-decoration: none;
      color: ${(props) => props.theme.colors.saturated_contrast};
      border-bottom: 1px solid ${(props) => props.theme.colors.yellow};
    }
  }
  background: none;
  border: none;
  margin-bottom: 0.5rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  box-sizing: border-box;
  border-radius: 4px 4px 0px 0px;
  padding: 0.5rem 0.5rem;
  font-family: 'Josefin Sans Light';
  text-align: left;
  transition: all 0.25s ease-in-out;
  color: ${(props) => props.theme.colors.saturated_contrast_80};
  .fa-icon {
    width: 1.25rem;
    margin-left: auto;
    margin-right: 0 !important;
    margin: 0;
    padding: 0;
    transition: all 0.25s ease-in-out;
    color: ${(props) => props.theme.colors.saturated_contrast_20};
  }

  &:hover {
    font-size: 12.5px;
    text-decoration: none;
    color: ${(props) => props.theme.colors.saturated_contrast};
    border-bottom: 1px solid ${(props) => props.theme.colors.yellow};
    cursor: pointer;
  }
  &:focus {
    border: none;
    outline: none;
  }

  @media (min-width: 620px) {
    width: 100%;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 0.75rem 0.25rem;
  }
`;

const Navbar = (props) => {
  const all = useRef(null);
  const users = useRef(null);
  const stores = useRef(null);
  const reviews = useRef(null);
  const transactions = useRef(null);
  const refArray = [all, users, stores, transactions, reviews];
  const filtered = props.active;
  useLayoutEffect(() => {
    refArray.forEach((ref) => {
      return ref.current.classList.remove('selected');
    });
  }, []);

  useEffect(() => {
    if (filtered) {
      refArray.forEach((ref) => {
        if (ref.current.dataset.name === filtered) {
          ref.current.classList.add('selected');
        }
      });
    }
  }, []);
  const setDisplay = (e) => {
    e.preventDefault();
    refArray.forEach((ref) => {
      return ref.current.classList.remove('selected');
    });
    const target = e.target;
    const value = target.dataset.name;
    target.classList.add('selected');
    return props.setDisplay(value);
  };

  const noPropagate = (e) => {
    e.stopPropagation();
  };
  return (
    <ParentContainer>
      <Container>
        <LinkItem
          className="nav-link-item"
          // activeClassName="selected"
          to="#"
          id="all-items"
          data-name="all"
          ref={all}
          onClick={setDisplay}
        >
          <p data-name="all" onClick={noPropagate}>
            All
          </p>
          <FontAwesomeIcon
            data-name="all"
            className="fa-icon"
            icon={faFileArchive}
          />
        </LinkItem>
        <LinkItem
          className="nav-link-item"
          // activeClassName="selected"
          to="#"
          id="users-items"
          data-name="users"
          ref={users}
          onClick={setDisplay}
        >
          <p data-name="users" onClick={noPropagate}>
            Users
          </p>
          <FontAwesomeIcon
            className="fa-icon"
            data-name="users"
            icon={faUsers}
          />
        </LinkItem>
        <LinkItem
          className="nav-link-item"
          // activeClassName="selected"
          to="#"
          id="stores-items"
          data-name="stores"
          ref={stores}
          onClick={setDisplay}
        >
          <p data-name="stores" onClick={noPropagate}>
            Stores
          </p>
          <FontAwesomeIcon
            className="fa-icon"
            data-name="stores"
            icon={faStore}
          />
        </LinkItem>
        <LinkItem
          className="nav-link-item"
          // activeClassName="selected"
          to="#"
          id="reviews-items"
          data-name="reviews"
          ref={reviews}
          onClick={setDisplay}
        >
          <p data-name="reviews" onClick={noPropagate}>
            Reviews
          </p>
          <FontAwesomeIcon
            className="fa-icon"
            data-name="reviews"
            icon={faClipboard}
          />
        </LinkItem>
        <LinkItem
          className="nav-link-item"
          // activeClassName="selected"
          to="#"
          id="transactions-items"
          data-name="transactions"
          ref={transactions}
          onClick={setDisplay}
        >
          <p data-name="transactions" onClick={noPropagate}>
            Transactions
          </p>
          <FontAwesomeIcon
            className="fa-icon"
            data-name="transactions"
            icon={faCreditCard}
          />
        </LinkItem>
      </Container>
    </ParentContainer>
  );
};

export default Navbar;
