import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, withTheme } from 'styled-components';
import {
  Link,
  Route,
  withRouter,
  Router,
  Switch,
  useLocation,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fadeIn, slideInUp } from 'react-animations';
import 'aos/dist/aos.css';
import AOS from 'aos';

import DefaultImage from '@/assets/images/backgrounds/search/search_hero.jpg';
import DefaultImage_600 from '@/assets/images/backgrounds/search/search_hero_600.jpg';
import emptyReview from '@/assets/images/lottie/emptyReview.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faStore,
  faLongArrowAltRight,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import ReviewItem from '@/components/UI/interface/account/Review.jsx';

import { getTransaction } from '@/actions/transaction';
import { connect } from 'react-redux';
import setAlert from '@/assets/helperFunctions/alerts';
import { debounce } from '@/assets/helperFunctions/debounce';
import { useCallback } from 'react';
import Header from '@/components/UI/Header';
import Footer from '@/components/UI/Footer';
import Navbar from './components/navbar';
import People from './components/people';

const fadeInUpAnimation = keyframes`${fadeIn}`;
const slideInUpAnimation = keyframes`${slideInUp}`;

const ParentContainer = styled.div`
  background: ${(props) => props.theme.colors.page_background};
  width: 100%;
  height: auto;
  position: relative;
  z-index: 9;
  font-size: 16px;
  box-sizing: border-box;
  transition: all 0.25s ease-in-out;
`;

const Container = styled.div`
  max-width: 880px;
  margin: 40px auto;
  display: flex;
  flex-flow: row nowrap;
  @media (max-width: 900px) {
    width: 50rem;
  }
  @media (max-width: 800px) {
    width: 40rem;
  }
  @media (max-width: 700px) {
    width: 37rem;
  }
  @media (max-width: 620px) {
    width: 33rem;
    flex-flow: column nowrap;
  }

  @media (max-width: 540px) {
    width: 30rem;
  }
  @media (max-width: 500px) {
    padding: 1rem;
    width: 27rem;
  }
  @media (max-width: 440px) {
    width: 23rem;
  }
  @media (max-width: 400px) {
    padding: 1rem 0.5rem;
  }
`;
const Filters = styled.div`
  width: 12.5rem;
  height: auto;
  display: flex;
  flex-flow: column nowrap;
  margin-right: 1rem;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.light_background};
  box-shadow: 1px 2px 5px ${(props) => props.theme.colors.light_background_40},
    0px 2px 30px ${(props) => props.theme.colors.light_background_60};
  padding: 1rem;
  .fa-icon {
    display: inline-block;
    margin-right: 1rem;
    color: ${(props) => props.theme.colors.saturated_contrast};
  }

  @media (max-width: 880px) {
    width: 10rem;
  }

  @media (max-width: 620px) {
    flex-flow: row nowrap;
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  width: calc(100% - 13.5rem);
  height: auto;
  padding: 1rem;
  background: ${(props) => props.theme.colors.light_background};
  hr {
    width: 100%;
    height: 0.1px;
    margin: 32px auto;
    border: none;
    opacity: 0.6;
    background: ${(props) => props.theme.colors.alternate_light_background_10};
  }

  @media (max-width: 880px) {
    width: calc(100% - 11rem);
  }
  @media (max-width: 620px) {
    width: 100%;
  }
`;

const FiltersHeaderContainer = styled.div`
  width: 100%;
  @media (max-width: 620px) {
    width: 3rem;
  }
`;

const FiltersHeader = styled.h5`
  display: inline-block;
  font-size: 1rem;
  font-family: 'Josefin Sans Light';
  color: ${(props) => props.theme.colors.saturated_contrast};
  margin: 1rem 0rem;
  font-weight: 500;
`;

const ExpandGroup = styled(Link)`
  width: 100%;
  text-align: left;
  color: ${(props) => props.theme.colors.saturated_font_darker};
  font-family: 'Josefin Sans Light';
  font-size: 12px;
  opacity: 0.6;
  transition: all 0.25s ease-in-out;
  &:hover {
    opacity: 1;
    cursor: pointer;
    text-decoration: underline;
  }
  .fa-icon {
    margin-right: 4px;
    opacity: 0.6;
    transition: all 0.25s ease-in-out;
    &:hover {
      opacity: 1;
      cursor: pointer;
    }
  }
`;

const SearchBox = styled.input`
  width: 400px;
  height: 60px;
  display: block;
  background: ${(props) => props.theme.colors.light_background_40};
  border: none;
  border-radius: 4px;
  color: white;
  font-family: 'Josefin Sans Light';
  font-size: 24px;
  padding: 0px 8px;
  transition: all 0.25s ease-in-out;
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.2);
  }
  &::-webkit-input-placeholder {
    /* color: rgba(0, 0, 0, 0.7); */
    color: rgba(255, 255, 255, 0.7);
  }
  &::placeholder {
    /* color: rgba(0, 0, 0, 0.7); */
    color: rgba(255, 255, 255, 0.7);
  }
`;

const SplashScreen = styled.div`
  height: 300px;
  width: 100%;
  background-image: -webkit-image-set(
    url(${DefaultImage_600}) 1x,
    url(${DefaultImage}) 2x
  );
  background-size: cover;
  background-position: center;
  label {
    color: ${(props) => props.theme.colors.saturated_contrast};
    display: block;
    width: 400px;
    font-size: 32px;
    font-family: 'Josefin Sans Light';
    margin: 16px;
    text-align: center;
  }
`;

const Modal = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
`;

const Row = styled.div`
  width: 100%;
  height: 60rem;
  display: flex;
  flex-flow: column nowrap;
`;

const Results = styled.div`
  width: 100%;
  height: auto;
`;

// section headlines
const S_Head = styled.h3`
  display: block;
  font-family: 'Noto Sans Regular';
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.saturated_contrast};
  margin: 16px 0px 32px 0px;
`;

const Search = (props) => {
  const [searchString, setSearchString] = useState('');
  const [display, setDisplay] = useState('');
  const [error, setError] = useState('');
  const [userResults, setUserResults] = useState([]);
  const [storeResults, setStoreResults] = useState([]);
  const [transactionResults, setTransactionResults] = useState([]);
  const [reviewResults, setReviewResults] = useState([]);
  const [filter, setFilter] = useState('all');

  // A custom hook that builds on useLocation to parse
  // the query string for you.
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  // destructure pathname from useLocation hook
  const { pathname } = useLocation();
  useEffect(() => {
    // initialize aos library
    AOS.init({ duration: 2000 });
    AOS.refresh();
  }, []);

  useEffect(() => {
    const string = query.get('query');
    if (string) {
      setSearchString(string);
      getStores(searchString);
    }
    return () => null;
  }, []);

  const { match } = props;

  useEffect(() => {
    console.log(match);
    if (searchString) {
      getStores(searchString);
    }
  }, [searchString]);

  const getStores = useCallback(
    debounce((string) => {
      return axios
        .post(`${process.env.REACT_APP_API_PREFIX}/api/search`, {
          query: `${string}`,
        })
        .then((result) => {
          if (result.status == 200) {
            const results = result.data.data;
            setUserResults(results[0]);
            setStoreResults(results[1]);
            setTransactionResults(results[2]);
            setReviewResults(results[3]);
            console.log(results);
            return;
          } else {
            setError('Cannot get users');
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          props.history.push(`${match.url}?query=${string}`);
          return;
        });
    }, 500),
    [],
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchString((prevstate) => {
      return value;
    });
    console.log(value);
  };

  const getDisplayForm = () => {
    switch (display) {
      case 'settings':
        return null;
      case 'reviews':
        return null;
      case 'transactions':
        return null;
    }
  };

  const getResults = () => {
    switch (filter) {
      case 'all':
        return <People dataset={userResults} />;
      case 'people':
        return <People dataset={userResults} />;
      default:
        return null;
    }
  };

  const processSearch = (e) => {
    if (e.key === 'Enter') {
      // enter key pressed, submit search
      return getStores();
    }
  };
  return (
    <>
      <ParentContainer id="add_transaction">
        <Header useOwnBackground usePagePadding />
        <SplashScreen>
          <Modal>
            <SearchBox
              id="search-for-anything"
              type="search"
              placeholder="Search for anything"
              autoFocus
              onKeyUp={processSearch}
              onChange={handleSearch}
              value={searchString}
            />
            <label htmlFor="search-for-anything">
              Search for vendors, goods, services, handles, e.t.c
            </label>
          </Modal>
        </SplashScreen>
        <Container>
          <Filters>
            <FiltersHeaderContainer>
              <FontAwesomeIcon className="fa-icon" icon={faFilter} />
              <FiltersHeader>FILTER BY</FiltersHeader>
            </FiltersHeaderContainer>
            <Navbar />
          </Filters>
          <SearchContainer>
            {searchString && (
              <S_Head>
                SHOWING {filter.toUpperCase()} RESULTS FOR{' '}
                {searchString.toUpperCase()}
              </S_Head>
            )}
            <hr />
            <Results>{getResults()}</Results>
          </SearchContainer>
        </Container>
        <Footer />
      </ParentContainer>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransaction: (id) => dispatch(getTransaction(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
  };
};

Search.propTypes = {
  //   user_id: PropTypes.string,
  //   review: PropTypes.object,
  //   user_photo: PropTypes.string,
  //   reviews: PropTypes.array,
  //   getReview: PropTypes.func,
};

export default withTheme(withRouter(Search));
