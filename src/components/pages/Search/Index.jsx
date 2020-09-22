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
import Stores from './components/stores';
import Reviews from './components/reviews';
import Transactions from './components/transactions';

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
  overflow: hidden;
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
    width: 20rem;
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
  box-sizing: border-box;
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
  @media (max-width: 620px) {
    margin-right: 0rem;
    padding: 0.5rem;
  }
`;

const SearchContainer = styled.div`
  width: calc(100% - 13.5rem);
  height: auto;
  padding: 1rem;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.light_background};
  hr {
    width: 100%;
    height: 0.1px;
    margin: 1rem auto;
    border: none;
    opacity: 0.6;
    background: ${(props) => props.theme.colors.alternate_light_background_10};
  }

  @media (max-width: 880px) {
    width: calc(100% - 11rem);
  }
  @media (max-width: 620px) {
    width: 100%;
    padding: 0.5rem;
    hr {
      margin: 0.5rem auto;
    }
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
  @media (max-width: 620px) {
    font-size: 0.75rem;
    margin: 0.5rem 0rem;
  }
  @media (max-width: 400px) {
    font-size: 0.5rem;
    margin: 0.5rem 0rem;
  }
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
  line-height: 60px;

  @media (max-width: 620px) {
    width: 300px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
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
    @media (max-width: 620px) {
      width: 300px;
      font-size: 24px;
    }
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
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.saturated_contrast};
  margin: 16px 0px 32px 0px;
  @media (max-width: 620px) {
    margin: 8px 0px 8px 0px;
    font-size: 0.75rem;
  }
`;

const Search = (props) => {
  const [searchString, setSearchString] = useState('');
  const [error, setError] = useState('');
  const [userResults, setUserResults] = useState([]);
  const [storeResults, setStoreResults] = useState([]);
  const [transactionResults, setTransactionResults] = useState([]);
  const [reviewResults, setReviewResults] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResult] = useState(false);

  // A custom hook that builds on useLocation to parse
  // the query string for you.
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  useEffect(() => {
    // check for filters upon render
    const filter = query.get('filter');
    if (filter) {
      setFilter(filter);
    }
  }, []);

  useEffect(() => {
    const string = query.get('query');
    const filter = query.get('filter');
    console.log('string crazy', string, 'filter crazy', filter);

    if (string) {
      setSearchString(string);
      getStores(searchString, filter);
    }
    return () => null;
  }, []);

  const { match } = props;

  useEffect(() => {
    if (searchString) {
      getStores(searchString);
    }
  }, [searchString]);

  const getStores = useCallback(
    debounce((string, filter) => {
      console.log('string', string, 'filter', filter);
      setLoading(true);
      setNoResult(false);
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
            setLoading(false);
            const noResult =
              results[0].length === 0 &&
              results[1].length === 0 &&
              results[2].length === 0 &&
              results[3].length === 0 &&
              results[4].length === 0;
            if (noResult) {
              setNoResult(true);
            }
            return;
          } else {
            setLoading(false);
            setNoResult(true);
            return;
          }
        })
        .catch((err) => {
          setLoading(false);
          // fail silently
          setNoResult(true);
          return null;
        })
        .finally(() => {
          if (!filter) {
            // props.history.push(`${match.url}?query=${string}`);
          } else {
            // props.history.push(`${match.url}?query=${string}&filter=${filter}`);
          }
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
  };

  const getResults = () => {
    switch (filter) {
      case 'all':
        return (
          <>
            <People dataset={userResults} />
            <Stores dataset={storeResults} />
          </>
        );
      case 'users':
        return <People dataset={userResults} />;
      case 'stores':
        return <Stores dataset={storeResults} />;

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

  const handleNavigation = (nav) => {
    setFilter(nav);
    return props.history.push(
      `${match.url}?query=${searchString}&filter=${filter}`,
    );
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
            <Navbar setDisplay={handleNavigation} active={filter} />
          </Filters>
          <SearchContainer>
            {searchString && (
              <S_Head>
                SHOWING {filter ? filter.toUpperCase() : ''} RESULTS FOR{' '}
                {searchString ? searchString.toUpperCase() : 'EMPTY SEARCH'}
              </S_Head>
            )}
            <hr />
            {noResults && !loading && (
              <S_Head>SEARCH RETURNED NO RESULTS. TRY ANOTHER KEYWORD</S_Head>
            )}
            {loading && <S_Head>LOADING RESULTS...</S_Head>}
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
