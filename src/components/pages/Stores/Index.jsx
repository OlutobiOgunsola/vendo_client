import React, { useState, useEffect } from 'react';
import styled, { withTheme, keyframes } from 'styled-components';
import Lottie from 'react-lottie';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import StarRatings from 'react-star-ratings';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';

import StoreIndex from './components/Index';
import AddStore from './components/Add';

import withUser from '@/components/higher-order/withUser';
import Footer from '@/components/UI/Footer';
import Header from '@/components/UI/Header';
import Loader from '@/components/widgets/UI/Loader';
import Alert from '@/components/widgets/UI/Alert';
import TransactionsIndex from './components/Transactions/Index';

import empty404 from '@/assets/images/lottie/404.json';
import defaultImage from '@/assets/images/icons/account/Profile.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLongArrowAltRight,
  faEnvelope,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { setAlert } from '@/actions/alerts';

const ParentContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.page_background};
  height: auto;
  font-size: 16px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 880px;
  margin: 2.5rem auto;
  box-sizing: border-box;
  border-radius: 4px;
  border: none;
  padding: 4rem 3rem;
  background: ${(props) => props.theme.colors.dark_background};
  /* padding: 20px; */

  hr {
    width: 100%;
    height: 0.1px;
    margin: 32px auto;
    border: none;
    opacity: 0.6;
    background: ${(props) => props.theme.colors.alternate_light_background_10};
  }

  @media (max-width: 900px) {
    width: 50rem;
  }
  @media (max-width: 800px) {
    width: 40rem;
  }
  @media (max-width: 700px) {
    width: 37rem;
    flex-flow: column nowrap;
    padding: 40px 50px;
  }
  @media (max-width: 620px) {
    width: 33rem;
    flex-flow: column nowrap;
    padding: 40px 10px;
    box-sizing: border-box;
  }

  @media (max-width: 540px) {
    width: 30rem;
    flex-flow: column nowrap;
    padding: 40px 10px;
    box-sizing: border-box;
  }
  @media (max-width: 500px) {
    padding: 40px 5px;
    width: 27rem;
    flex-flow: column nowrap;
  }
  @media (max-width: 440px) {
    padding: 40px 5px;
    width: 23rem;
    flex-flow: column nowrap;
  }
  @media (max-width: 400px) {
    width: 100%;
    padding: 0.5rem;
    flex-flow: column nowrap;
  }
`;

const ProfileActions = styled.div`
  height: 50px;
  width: 100%;
  margin: 16px auto;
  display: flex;
  justify-content: space-between;
  @media (max-width: 580px) {
    height: 30px;
  }
`;

const Action = styled(Link)`
  display: inline-block;
  height: 100%;
  line-height: 50px;
  width: ${(props) => (props.width ? props.width : '48%')};
  text-align: center;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.dark_background};
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
      left: 16px;
      margin-left: 12px;
      opacity: 1;
    }
    @media (max-width: 600px) {
      .fa-icon {
        left: 8px;
        margin-left: 8px;
        opacity: 1;
      }
    }

    @media (max-width: 450px) {
      .fa-icon {
        left: 4px;
        margin-left: 4px;
        opacity: 1;
      }
    }
  }

  @media (max-width: 900px) {
    font-size: 0.8rem;
  }

  @media (max-width: 580px) {
    font-size: 0.75rem;
    line-height: 30px;
  }
`;

const StoreProfile = styled.section`
  width: 100%;
  height: auto;
  background: ${(props) => {
    return props.background_cover_image
      ? `url(${props.background_cover_image})`
      : props.theme.colors.dark_background;
  }};
`;

const StoreModal = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  /* padding: 24px 0px; */
  box-sizing: border-box;
`;

const StoreImage = styled.img`
  height: 150px;
  width: 150px;
  border: solid 8px ${(props) => props.theme.colors.yellow};
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  top: 10%;
  @media (max-width: 900px) {
    height: 100px;
    width: 100px;
  }

  @media (max-width: 540px) {
    height: 75px;
    width: 75px;
    border: solid 4px ${(props) => props.theme.colors.yellow};
  }
  @media (max-width: 380px) {
    height: 50px;
    width: 50px;
    border: solid 2px ${(props) => props.theme.colors.yellow};
  }
`;
const StoreDetails = styled.div`
  width: calc(100% - 182px);
  display: inline-block;
  display: inherit;
  flex-flow: column nowrap;
  margin-left: auto;
  box-sizing: border-box;
  padding: 16px;
  border-bottom: 2px solid ${(props) => props.theme.colors.light_background};
  @media (max-width: 900px) {
    width: calc(100% - 132px);
  }

  @media (max-width: 540px) {
    width: calc(100% - 93px);
  }

  @media (max-width: 380px) {
    width: calc(100% - 58px);
  }
`;
const StoreDetailsContainer = styled.div`
  max-width: 880px;
  height: auto;
  margin: 0px auto 40px auto;
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
  }

  @media (max-width: 540px) {
    width: 30rem;
  }
  @media (max-width: 500px) {
    width: 27rem;
  }
  @media (max-width: 440px) {
    width: 23rem;
  }
  @media (max-width: 400px) {
    width: 20rem;
  }
`;
const NameBar = styled.span`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  h1 {
    margin: 0;
    margin-left: 8px;
    display: inline-block;
    font-family: 'Noto Sans Regular';
    font-size: 2rem;
    color: ${(props) => props.theme.colors.yellow};
    @media (max-width: 580px) {
      font-size: 1rem;
    }
  }
  h2 {
    display: inline-block;
    font-family: 'Noto Sans Regular';
    font-weight: 300;
    font-size: 2rem;
    color: ${(props) => props.theme.colors.saturated_contrast};
    margin: 0;
    @media (max-width: 580px) {
      font-size: 1rem;
    }
  }
`;
const Handle_And_Rating = styled.div`
  margin: 0.5rem 0rem;
  @media (max-width: 580px) {
    margin: 0.25rem 0rem;
  }
`;
const Handle = styled.span`
  margin: 0;
  padding-right: 1rem;
  border-right: solid 1px ${(props) => props.theme.colors.saturated_contrast};
  font-family: 'Josefin Sans Light';
  color: ${(props) => props.theme.colors.yellow};
  @media (max-width: 580px) {
    padding-right: 0.5rem;
  }
`;
const Rating = styled.span`
  margin: 0;
  margin-left: 1rem;
  font-family: 'Josefin Sans Light';
  font-size: 14px;
  color: ${(props) => props.theme.colors.saturated_contrast};
  strong {
    font-size: 14px;
    font-family: 'Noto Sans Regular';
    font-weight: 500;
    color: ${(props) => props.theme.colors.celtic_blue};
  }
`;
const Bio = styled.p`
  margin: 0;
  max-height: 4rem;
  padding: 0.5rem 0rem;
  font-size: 14px;
  line-height: 1.25rem;
  font-family: 'Josefin Sans Light';
  color: ${(props) => props.theme.colors.saturated_contrast};
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const Tags = styled.div`
  margin: 1rem 0rem;
  display: inline-block;
  max-width: 200px;
  overflow: hidden;
`;
const TagItem = styled.span`
  display: inline-block;
  padding: 0.25rem;
  font-size: 0.75rem;
  background: ${(props) => props.theme.colors.yellow};
  border-radius: 0.25rem;
  border: none;
  margin-left: 0.5rem;
  color: ${(props) => props.theme.colors.dark_background};
  &:first-child {
    margin-left: 0px;
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

const Store = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [alerts, addAlert] = useState([]);
  const [display, setDisplay] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [transactionsRoute, setTransactionsRoute] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [status, setStatus] = useState('exists');
  const [addError, setAddError] = useState(false);
  const loginStatus = props.user.loggedIn;
  const [store, setStore] = useState({
    _id: '',
    description: '',
    name: '',
    categories: [],
    reviews: [],
    transactions: [],
  });
  const [storePhoto, setStore_Photo] = useState(store.photo);

  const store_found = store._id !== '' && store._id !== undefined;

  const owner_id = store_found ? store.owner_id : '';

  const owner = owner_id === props.user.user._id;

  const { match } = props;
  const target_store_name = match.params.store_name;

  const navigateToStore = () => {
    return props.history.push(`/stores/${store.address}`);
  };

  const setTransactionPath = (payload) => {
    return setTransactionsRoute(payload);
  };

  useEffect(() => {
    setLoading(true);
    const getStore = async (id) => {
      return axios
        .get(
          `${
            process.env.REACT_APP_API_PREFIX
          }/api/stores/${target_store_name.toLowerCase()}`,
        )
        .then((res) => {
          if (mounted) {
            setStore(res.data.data);
            setStore_Photo(res.data.data.photo);
            setLoading(false);
          }
        })
        .catch((err) => {
          setAlert(addAlert, 'error', 'Cannot get store!');
          setLoading(false);
          const timeout = setTimeout(() => {
            if (target_store_name !== 'add') {
              // props.history.push(props.history.goBack());
            }
            clearTimeout(timeout);
          }, 3000);
        });
    };
    getStore(target_store_name);
    if (mounted) {
      !transactions ? setFetching(true) : setFetching(false);
    }
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (target_store_name === 'add') {
      if (loginStatus && props.user.user.accountType === 'Vendor') {
        setStatus('new');
        setAddError(false);
      } else {
        setAddError(true);
      }
    }
  }, [loginStatus]);

  // destructure pathname from useLocation hook
  const { pathname } = useLocation();
  useEffect(() => {
    // initialize aos library
    AOS.init({ duration: 2000 });
    AOS.refresh();
  }, []);

  const LottieOptions = {
    loop: true,
    autoplay: true,
    animationData: empty404,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <ParentContainer>
      {isLoading && <Loader />}
      {isFetching && <Loader transition={0.1} />}
      <Header useOwnBackground usePagePadding />
      {alerts.map((alert) => {
        return (
          <Alert type={alert.type} key={alert.text}>
            {alert.text}
          </Alert>
        );
      })}

      {store_found &&
        !transactionsRoute &&
        status !== 'new' &&
        !isLoading &&
        !isFetching && (
          <>
            <StoreProfile background_cover_image={store.background_cover_image}>
              <StoreModal>
                <StoreDetailsContainer>
                  <StoreImage src={storePhoto || defaultImage} />
                  <StoreDetails>
                    <NameBar>
                      <h1 onClick={navigateToStore}>
                        {store.name.toUpperCase()}
                      </h1>
                      <Tags>
                        {store.category.length > 0 &&
                          store.category.map((category) => {
                            return (
                              <TagItem key={category}>
                                {category.toUpperCase()}
                              </TagItem>
                            );
                          })}
                      </Tags>
                    </NameBar>
                    <Handle_And_Rating>
                      <Handle>@{store.address || ''}</Handle>
                      <Rating>
                        <strong>{store.rating > 0 || '0'}%</strong>
                      </Rating>
                    </Handle_And_Rating>
                    <Bio>{store.bio ? store.bio : 'No bio'}</Bio>

                    {!owner && (
                      <ProfileActions>
                        <Action to={`${match.url}/transactions/add`}>
                          New Transaction
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={faLongArrowAltRight}
                          />
                        </Action>
                        <Action to={'#'}>
                          Send Mail{' '}
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={faEnvelope}
                          />
                        </Action>
                      </ProfileActions>
                    )}
                    {owner && (
                      <ProfileActions>
                        <Action to={`${match.url}/edit`}>
                          Edit Store
                          <FontAwesomeIcon className="fa-icon" icon={faEdit} />
                        </Action>
                        <Action to={'#'}>
                          Send Mail{' '}
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={faEnvelope}
                          />
                        </Action>
                      </ProfileActions>
                    )}
                  </StoreDetails>
                </StoreDetailsContainer>
              </StoreModal>
            </StoreProfile>
          </>
        )}

      <Container>
        {!store._id &&
          !isLoading &&
          !isFetching &&
          !addError &&
          status !== 'new' && (
            <>
              <Lottie options={LottieOptions} height={300} width={300} />
              <EmptyStateText
                style={{
                  textAlign: 'center',
                  color: `${props.theme.colors.saturated_contrast}`,
                }}
              >
                No Store Found.
              </EmptyStateText>
              <EmptyStateSubtext>Back to home</EmptyStateSubtext>
            </>
          )}
        {addError && (
          <>
            <Lottie options={LottieOptions} height={300} width={300} />
            <EmptyStateText
              style={{
                textAlign: 'center',
                color: `${props.theme.colors.saturated_contrast}`,
              }}
            >
              You cannot add a store
            </EmptyStateText>
            <EmptyStateSubtext>
              You are running a Client account. Please open a Vendor account to
              add stores.
            </EmptyStateSubtext>
          </>
        )}
        {status === 'new' && !isLoading && !isFetching && (
          <AddStore
            updater={addAlert}
            user={props.user.user}
            loading={setLoading}
          />
        )}
        {status !== 'new' && !isLoading && !isFetching && store_found && (
          // <Router>
          <Switch>
            <Route
              path={`${match.url}`}
              exact
              component={() => {
                return (
                  <StoreIndex
                    store={store}
                    updater={addAlert}
                    loggedinUser={props.user.user}
                  />
                );
              }}
            />

            {/* {store_found && props.user.user._id === store.owner_id && ( */}
            <Route
              path={`${match.url}/edit`}
              exact
              component={() => {
                return (
                  <AddStore
                    updater={addAlert}
                    user={props.user.user}
                    loading={setLoading}
                    store={store}
                    setUserPhoto={setStore_Photo}
                  />
                );
              }}
            />
            {/* )} */}

            <Route
              path={`${match.url}/transactions`}
              component={() => {
                return (
                  <TransactionsIndex
                    updater={addAlert}
                    user={props.user.user}
                    store_id={store._id}
                    store_owner_id={owner_id}
                    handle={store.address}
                    owner={owner}
                    setRoute={setTransactionPath}
                  />
                );
              }}
            />
          </Switch>
          // </Router>
        )}
      </Container>
      <Footer />
    </ParentContainer>
  );
};

export default withUser(withTheme(Store), false);
