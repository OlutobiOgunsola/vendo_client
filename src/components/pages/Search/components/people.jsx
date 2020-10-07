import React from 'react';
import styled, { withTheme, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { slideInUp } from 'react-animations';

import {
  faEnvelope,
  faUser,
  faStoreAltSlash,
} from '@fortawesome/free-solid-svg-icons';

import defaultStoreImage from '@/assets/images/store/DefaultImage.png';
import defaultImage from '@/assets/images/icons/account/Profile.svg';
import StarRatings from 'react-star-ratings/build/star-ratings';
import ReactTooltip from 'react-tooltip';

const slideIn = keyframes`${slideInUp}`;

const ParentContainer = styled.div`
  width: 100%;
  font-size: 16px;
`;

const PersonContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  background: ${(props) => props.theme.colors.review_background};
  border: none;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 8px;
  box-sizing: border-box;
  animation: 0.25s ${slideIn};
  @media (max-width: 620px) {
    padding: 1rem 0.5rem;
  }
`;

const PhotoFancyBorder = styled.span`
  width: 6rem;
  height: 6rem;
  padding: 0.25rem;
  box-sizing: border-box;
  border-radius: 50%;
  border: solid 2px ${(props) => props.theme.colors.yellow};
  @media (max-width: 620px) {
    width: 4rem;
    height: 4rem;
  }
  @media (max-width: 400px) {
    width: 3rem;
    height: 3rem;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const Stores = styled.div`
  display: inline-block;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  height: auto;
`;

const Store = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  &:first-child {
    margin-right: 0rem;
  }
  border-radius: 50%;
`;
const Details = styled.div`
  width: calc(100% - 7rem);
  @media (max-width: 620px) {
    width: calc(100% - 5rem);
  }
  @media (max-width: 400px) {
    width: calc(100% - 3.5rem);
  }
`;

const TitleBar = styled.header`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  height: auto;
`;

const NameBar = styled.h5`
  display: inline;
  font-size: 1rem;
  font-family: 'Noto Sans Regular';
  color: ${(props) => props.theme.colors.saturated_contrast};
  margin: 0.5rem 0rem;
  strong {
    color: ${(props) => props.theme.colors.yellow};
    margin-left: 0.25rem;
  }
`;

const AccountType = styled.p`
  display: inline;
  padding: 0.25rem;
  border-radius: 4px;
  border: none;
  font-size: 0.6rem;
  background: ${(props) => props.theme.colors.yellow};
  color: ${(props) => props.theme.colors.dark_background};
`;

const Rating = styled.p`
  margin: 0.5rem 0rem;
  font-size: 0.75rem;
  font-family: 'Josefin Sans Light';
  color: ${(props) => props.theme.colors.saturated_contrast};
`;

const Bio = styled.p`
  width: 100%;
  margin: 0.5rem 0rem;
  font-size: 0.75rem;
  font-family: 'Josefin Sans Light';
  color: ${(props) => props.theme.colors.saturated_contrast};
`;

const ProfileActions = styled.div`
  height: 30px;
  width: 100%;
  margin: 16px auto;
  display: flex;
  justify-content: start;
`;

const Action = styled(Link)`
  display: inline-block;
  height: 100%;
  line-height: 30px;
  width: ${(props) => (props.width ? props.width : '48%')};
  margin: 0 1rem 0 0;
  text-align: center;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.light_background};
  color: ${(props) =>
    props.borders
      ? `${props.theme.colors.yellow}`
      : `${props.theme.colors.saturated_contrast}`};
  border: ${(props) =>
    props.borders ? `1px solid ${props.theme.colors.yellow}` : 'none'};
  border-radius: 4px;
  transition: all 0.25s ease-in-out;
  text-decoration: none;
  .fa-icon {
    position: relative;
    left: 0px;
    margin-left: 4px;
    transition: all 0.5s ease-in-out;
    opacity: 0;
    color: ${(props) => props.theme.colors.dark_background};
  }
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.yellow};
    color: ${(props) => props.theme.colors.dark_background};
    width: ${(props) => (props.hover_width ? props.hover_width : '48.5%')};
    box-shadow: 0px 4px 10px ${(props) => props.theme.colors.yellow_20};
    .fa-icon {
      left: 8px;
      margin-left: 6px;
      opacity: 1;
    }
  }
  @media (max-width: 620px) {
    font-size: 0.75rem;
  }
`;

const People = (props) => {
  const People = props.dataset;
  return (
    <ParentContainer>
      {People.map((person) => {
        return (
          <PersonContainer key={person._id}>
            <PhotoFancyBorder>
              <Photo src={person.photo || defaultImage} />
            </PhotoFancyBorder>
            <Details>
              <TitleBar>
                <NameBar>
                  {`${person.firstname ? person.firstname : ''}`}
                  <strong>{`${
                    person.lastname
                      ? person.lastname.toUpperCase()
                      : person.username
                  }`}</strong>
                </NameBar>
                {person.accountType === 'Vendor' && (
                  <AccountType>Vendor</AccountType>
                )}
              </TitleBar>
              <Rating>{`@${person.username}`}</Rating>
              <Bio>{person.bio ? person.bio : 'No bio'}</Bio>
              {person.registered_stores.length > 0 && (
                <Stores>
                  <ReactTooltip effect="solid" />
                  {person.registered_stores.map((store) => {
                    return (
                      <Store
                        data-tip={`${store.name.toUpperCase()} <br />${store.category.map(
                          (cat) => {
                            return cat;
                          },
                        )} <br /> ${store.rating} of 5 <br /> ${
                          store.transactions.length
                        } transactions completed <br />  ${
                          store.reviews.length
                        } reviews received`}
                        data-class="tooltip"
                        data-multiline={true}
                        //   data-aos="fade-in"
                        key={store._id}
                        src={store.photo || defaultStoreImage}
                        platform={store.platform}
                      />
                    );
                  })}
                </Stores>
              )}
              <ProfileActions>
                <Action to={`/users/${person.username}`}>
                  Visit Page
                  <FontAwesomeIcon className="fa-icon" icon={faUser} />
                </Action>
                {person.email && (
                  <Action to={'#'}>
                    Send Mail
                    <FontAwesomeIcon className="fa-icon" icon={faEnvelope} />
                  </Action>
                )}
              </ProfileActions>
            </Details>
          </PersonContainer>
        );
      })}
    </ParentContainer>
  );
};

People.propTypes = {
  dataset: PropTypes.array,
};

export default withRouter(withTheme(People));
