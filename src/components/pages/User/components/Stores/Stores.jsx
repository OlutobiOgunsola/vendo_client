import React, { useState, useEffect } from 'react';
import styled, { withTheme, keyframes } from 'styled-components';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStore } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { slideInUp } from 'react-animations';

import Loader from '@/components/widgets/UI/Loader';
import Alert from '@/components/widgets/UI/Alert';
import emptyTransactions from '@/assets/images/lottie/emptyTransactions.json';
import defaultImage from '@/assets/images/store/DefaultImage.png';

import { getTransactionsByUserID } from '@/actions/transaction';

import FilterComponent from '@/components/widgets/UI/Filters';
import { sort } from '@/assets/helperFunctions/sort';

const slideIn = keyframes`${slideInUp}`;
const ParentContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.dark_background};
  height: auto;
  font-size: 16px;
`;

const Container = styled.div`
  width: 880px;
  margin: 0px auto;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.dark_background};
  @media (max-width: 900px) {
    width: 747px;
  }
  @media (max-width: 800px) {
    width: 647px;
  }
  @media (max-width: 700px) {
    flex-flow: column nowrap;
  }
  @media (max-width: 670px) {
    flex-flow: column nowrap;
    width: 100%;
  }
  @media (max-width: 570px) {
    flex-flow: column nowrap;
    box-sizing: border-box;
  }
  @media (max-width: 400px) {
    flex-flow: column nowrap;
  }
`;

const EmptyStateText = styled.h5`
  text-align: center;
  color: ${(props) => props.theme.colors.saturated_contrast};
  margin: 16px 0px 8px 0px;
  width: 100%;
`;
const EmptyStateSubtext = styled.p`
  font-size: 12px;
  text-align: center;
  width: 100%;
  margin: 0px 0px 40px 0px;
  color: ${(props) => props.theme.colors.saturated_contrast};
`;

const StoreContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  background: ${(props) => props.theme.colors.review_background};
  border: none;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0rem;
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
    width: 3rem;
    height: 3rem;
  }
  @media (max-width: 400px) {
    width: 2rem;
    height: 2rem;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const Details = styled.div`
  width: calc(100% - 7rem);
  @media (max-width: 620px) {
    width: calc(100% - 4rem);
  }
  @media (max-width: 400px) {
    width: calc(100% - 2.5rem);
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

const StoreCategory = styled.p`
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
  width: 10rem;
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
    transform: scaleX(1.1);
    box-shadow: 0px 4px 10px ${(props) => props.theme.colors.yellow_20};
    .fa-icon {
      left: 2px;
      margin-left: 3px;
      opacity: 1;
    }
  }
  @media (max-width: 620px) {
    font-size: 0.65rem;
  }
`;

const Stores = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [alerts, addAlert] = useState([]);
  const [stores, setStores] = useState([]);
  const [mounted, setMounted] = useState(true);
  const [sortOrder, setSortOrder] = useState('newest');
  const [show, setShow] = useState(null);
  const loginStatus = props.user.loggedIn;

  const { match } = props;
  const user_id = props.user_id;
  const user_name = props.user_name;

  const toggleLoading = (payload) => {
    return setLoading(payload);
  };

  useEffect(() => {
    setFetching(true);

    // get all user transactions
    const fetchStores = async () => {
      let foundStores = props.user.registered_stores;
      if (mounted) {
        setStores(foundStores);
        setFetching(false);
      }
    };

    if (user_id) {
      fetchStores();
    }
    return () => {
      setMounted(false);
    };
  }, [user_id]);

  const LottieOptions = {
    loop: false,
    autoplay: true,
    animationData: emptyTransactions,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const sortBy = (sortOrder) => {
    const storesClone = [...stores];

    switch (sortOrder) {
      case 'rating':
        const sortedRating = storesClone.sort((a, b) => {
          return a.rating > b.rating;
        });
        return setStores(sortedRating);
      case 'newest':
        const sortedNewest = storesClone.sort((a, b) => {
          return a.createdAt > b.createdAt;
        });
        return setStores(sortedNewest);
    }
  };

  return (
    <ParentContainer>
      {alerts.map((alert) => {
        return (
          <Alert type={alert.type} key={alert.text}>
            {alert.text}
          </Alert>
        );
      })}
      <Container>
        {isLoading && <Loader />}
        {isFetching && <Loader transition={0.2} />}
        <FilterComponent handleChange={sortBy} />
        {!stores && (
          <>
            <Lottie options={LottieOptions} height={300} width={300} />
            <EmptyStateText
              show={show}
              style={{
                textAlign: 'center',
                color: `${props.theme.colors.saturated_contrast}`,
              }}
            >
              No stores yet.
            </EmptyStateText>
            <EmptyStateSubtext show={show}>
              User has not added any stores
            </EmptyStateSubtext>
          </>
        )}
        {stores &&
          stores.map((store) => {
            console.log(store);
            return (
              <StoreContainer key={store._id}>
                <PhotoFancyBorder>
                  <Photo src={store.photo || defaultImage} />
                </PhotoFancyBorder>
                <Details>
                  <TitleBar>
                    <NameBar>
                      <strong>{`${
                        store.name ? store.name.toUpperCase() : store.address
                      }`}</strong>
                    </NameBar>
                    {store.category && (
                      <StoreCategory>{store.category}</StoreCategory>
                    )}
                  </TitleBar>
                  <Rating>{`${
                    store.rating ? store.rating : 0
                  }% rating`}</Rating>
                  <Bio>{store.bio ? store.bio : 'No bio'}</Bio>
                  <ProfileActions>
                    <Action to={`/stores/${store.address}`}>
                      View Store
                      <FontAwesomeIcon className="fa-icon" icon={faStore} />
                    </Action>
                    <Action to={'#'}>
                      Bookmark
                      <FontAwesomeIcon className="fa-icon" icon={faHeart} />
                    </Action>
                  </ProfileActions>
                </Details>
              </StoreContainer>
            );
          })}
      </Container>
    </ParentContainer>
  );
};

Stores.propTypes = {
  user: PropTypes.object,
  updater: PropTypes.func,
  loggedinUser: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactionsByUserID: (id) => dispatch(getTransactionsByUserID(id)),
  };
};

const ConnectedStores = connect(null, mapDispatchToProps)(Stores);
export default withTheme(withRouter(ConnectedStores));
