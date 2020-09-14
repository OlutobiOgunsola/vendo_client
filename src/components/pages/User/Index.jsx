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

import UserIndex from './components/Index/Index';
import ConnectedTransactions from './components/Transactions/Transactions';
import withUser from '@/components/higher-order/withUser';
import Footer from '@/components/UI/Footer';
import Header from '@/components/UI/Header';
import Loader from '@/components/widgets/UI/Loader';
import Alert from '@/components/widgets/UI/Alert';
import { loadUser } from '@/actions/user';

import empty404 from '@/assets/images/lottie/404.json';
import defaultImage from '@/assets/images/icons/account/Profile.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faLongArrowAltRight,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

const ParentContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.dark_background};
  height: auto;
`;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
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
  }
  @media (max-width: 800px) {
  }
  @media (max-width: 700px) {
    flex-flow: column nowrap;
    padding: 40px 50px;
  }
  @media (max-width: 500px) {
    flex-flow: column nowrap;
    padding: 40px 10px;
    box-sizing: border-box;
  }
  @media (max-width: 400px) {
    flex-flow: column nowrap;
  }
`;

const ProfileActions = styled.div`
  height: 50px;
  width: 100%;
  margin: 16px auto;
  display: flex;
  justify-content: space-between;
`;

const Action = styled(Link)`
  display: inline-block;
  height: 100%;
  line-height: 50px;
  width: ${(props) => (props.width ? props.width : '48%')};
  margin: 0 auto;
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
  }
`;

const UserProfile = styled.section`
  width: 100%;
  height: auto;
  background: ${(props) => {
    return props.background_cover_image
      ? `url(${props.background_cover_image})`
      : props.theme.colors.dark_background;
  }};
  /* margin: 40px 0px; */
`;

const UserModal = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  background: rgba(0, 0, 0, 0.2);
  padding: 24px 0px;
`;

const UserImage = styled.img`
  height: 150px;
  width: 150px;
  border: solid 8px ${(props) => props.theme.colors.yellow};
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  top: 10%;
`;
const UserDetails = styled.div`
  width: calc(100% - 182px);
  display: inline-block;
  display: inherit;
  flex-flow: column nowrap;
  margin-left: auto;
  box-sizing: border-box;
  padding: 16px;
  border-bottom: 2px solid ${(props) => props.theme.colors.light_background};
`;
const UserDetailsContainer = styled.div`
  max-width: 880px;
  height: auto;
  margin: 0px auto 40px auto;
  display: flex;
  flex-flow: row nowrap;
`;
const NameBar = styled.span`
  display: block;
  width: 100%;
  text-align: left;
  h1 {
    margin: 0;
    margin-left: 8px;
    display: inline-block;
    font-family: 'Noto Sans Regular';
    font-size: 32px;
    color: ${(props) => props.theme.colors.yellow};
  }
  h2 {
    display: inline-block;
    font-family: 'Noto Sans Regular';
    font-weight: 300;
    font-size: 32px;
    color: ${(props) => props.theme.colors.saturated_contrast};
    margin: 0;
  }
`;
const Handle_And_Rating = styled.div`
  margin: 8px 0px;
`;
const Handle = styled.span`
  margin: 0;
  padding-right: 16px;
  border-right: solid 1px ${(props) => props.theme.colors.saturated_contrast};
  font-family: 'Josefin Sans Light';
  color: ${(props) => props.theme.colors.yellow};
`;
const Rating = styled.span`
  margin: 0;
  margin-left: 16px;
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
  max-height: 64px;
  padding: 8px 0px;
  font-size: 14px;
  line-height: 20px;
  font-family: 'Josefin Sans Light';
  color: ${(props) => props.theme.colors.saturated_contrast};
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const Tags = styled.div`
  margin: 16px 0px;
`;
const TagItem = styled.span`
  padding: 8px;
  background: ${(props) => props.theme.colors.light_background};
  margin-left: 8px;
  box-shadow: 2px 4px 10px ${(props) => props.theme.colors.dark_background_20};
  color: ${(props) => props.theme.colors.saturated_contrast};
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

const User = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [alerts, addAlert] = useState([]);
  const [display, setDisplay] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [mounted, setMounted] = useState(true);
  const loginStatus = props.user.loggedIn;
  const [user, setUser] = useState({
    _id: '',
    registered_stores: [],
    verified: false,
    rating: 0,
    i_reviews: [],
    r_reviews: [],
    i_comments: [],
    r_comments: [],
    i_transactions: [],
    r_transactions: [],
    r_upvotes: [],
    r_downvotes: [],
    c_upvotes: [],
    c_downvotes: [],
  });

  const user_found = user._id !== '' && user._id !== undefined;

  const { match } = props;
  const target_user_id = match.params.user_id;

  const userRating = Math.ceil(user.rating);

  const toggleLoading = (payload) => {
    return setLoading(payload);
  };

  useEffect(() => {
    const getUser = async (id) => {
      return axios
        .get(
          `${process.env.REACT_APP_API_PREFIX}/api/users/user/${target_user_id}`,
        )
        .then((res) => {
          if (mounted) {
            setUser(res.data.data);
          }
        });
    };
    getUser(target_user_id);
    if (mounted) {
      !transactions ? setFetching(true) : setFetching(false);
    }
    return () => {
      setMounted(false);
    };
  }, []);

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
      <Header useOwnBackground />
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
        {!user._id && (
          <>
            <Lottie options={LottieOptions} height={300} width={300} />
            <EmptyStateText
              style={{
                textAlign: 'center',
                color: `${props.theme.colors.saturated_contrast}`,
              }}
            >
              No User Found.
            </EmptyStateText>
            <EmptyStateSubtext>Back to home</EmptyStateSubtext>
          </>
        )}

        {user_found && (
          <>
            <UserProfile
              background_cover_image={user.background_cover_imagemnb}
            >
              <UserModal>
                <UserDetailsContainer>
                  <UserImage src={user.photo || defaultImage} />
                  <UserDetails>
                    <NameBar>
                      {!user.firstname && !user.lastname && user.username && (
                        <h1>{user.username.toLowerCase()}</h1>
                      )}
                      {(user.firstname || user.lastname) && (
                        <>
                          <h2>{user.firstname && user.firstname}</h2>
                          <h1>
                            {user.lastname && user.lastname.toUpperCase()}
                          </h1>
                        </>
                      )}
                    </NameBar>
                    <Handle_And_Rating>
                      <Handle>@{user.username || ''}</Handle>
                      <Rating>
                        <strong>{user.rating > 0 || '0'}%</strong> VENDOR SCORE
                      </Rating>
                    </Handle_And_Rating>
                    <Bio>{user.bio ? user.bio : 'No bio'}</Bio>
                    <Tags>
                      {user.categories && user.categories.length === 0 && (
                        <EmptyStateText>No Category Tags</EmptyStateText>
                      )}
                      {user.categories &&
                        user.categories.map((category) => {
                          return <TagItem key={category}>{category}</TagItem>;
                        })}
                    </Tags>
                    {user.accountType === 'Vendor' && (
                      <>
                        <ProfileActions>
                          <Action to={'#'}>
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
                      </>
                    )}
                  </UserDetails>
                </UserDetailsContainer>
              </UserModal>
            </UserProfile>
            <Router>
              <Switch>
                <Route
                  path={`${match.url}`}
                  exact
                  component={() => {
                    return (
                      <UserIndex
                        user={user}
                        updater={addAlert}
                        loggedinUser={props.user.user}
                      />
                    );
                  }}
                />
                <Route
                  path={`${match.url}/transactions`}
                  component={() => {
                    return (
                      <ConnectedTransactions
                        user={user}
                        user_id={target_user_id}
                        updater={addAlert}
                        loggedinUser={props.user.user}
                      />
                    );
                  }}
                />
              </Switch>
            </Router>{' '}
          </>
        )}
      </Container>
      <Footer />
    </ParentContainer>
  );
};

export default withUser(withTheme(User), false);
