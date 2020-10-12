import React, { useState, useEffect } from 'react';
import styled, { withTheme, keyframes } from 'styled-components';
import Lottie from 'react-lottie';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import StarRatings from 'react-star-ratings';
import { fadeIn } from 'react-animations';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';

import UserIndex from './components/Index/Index';
import ConnectedTransactions from './components/Transactions/Transactions';
import ConnectedStores from './components/Stores/Stores';
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

const fadeInAnimation = keyframes`${fadeIn}`;

const ParentContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.review_background};
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
    width: 100%;
    flex-flow: column nowrap;
  }
  @media (max-width: 440px) {
    padding: 40px 5px;
    width: 100%;
    flex-flow: column nowrap;
  }
  @media (max-width: 400px) {
    flex-flow: column nowrap;
    padding: 0.5rem;
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
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  /* padding: 24px 0px; */
  box-sizing: border-box;
`;

const UserImageFancyBorder = styled.span`
  height: 150px;
  width: 150px;
  display: inline-block;
  position: absolute;
  top: 10%;
  border: solid 2px ${(props) => props.theme.colors.yellow};
  border-radius: 50%;
  padding: 0.3rem;
  @media (max-width: 900px) {
    height: 100px;
    width: 100px;
  }

  @media (max-width: 540px) {
    height: 75px;
    width: 75px;
    border: solid 2px ${(props) => props.theme.colors.yellow};
    padding: 0.25rem;
  }
  @media (max-width: 380px) {
    height: 50px;
    width: 50px;
    border: solid 1px ${(props) => props.theme.colors.yellow};
    padding: 0.25rem;
  }
`;

const UserImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
`;
const UserDetails = styled.div`
  width: calc(100% - 182px);
  display: inline-block;
  display: inherit;
  flex-flow: column nowrap;
  margin-left: auto;
  box-sizing: border-box;
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.light_background_60};
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
const UserDetailsContainer = styled.div`
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
    color: ${(props) => props.color};
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
  margin: 1rem 0rem;
  @media (max-width: 580px) {
    margin: 0.5rem 0rem;
  }
`;
const TagItem = styled.span`
  padding: 0.5rem;
  background: ${(props) => props.theme.colors.yellow};
  margin-left: 0.5rem;
  border: none;
  border-radius: 4px;
  box-shadow: 2px 4px 10px ${(props) => props.theme.colors.dark_background_20};
  color: ${(props) => props.theme.colors.dark_background};
  &:first-child {
    margin-left: 0px;
  }
  @media (max-width: 580px) {
    font-size: 0.75rem;
    padding: 0.25rem;
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
  const target_user_name = match.params.user_name;
  const target_user_id = user._id;

  const userRating = Math.ceil(user.rating);

  const toggleLoading = (payload) => {
    return setLoading(payload);
  };

  useEffect(() => {
    setLoading(true);
    const getUser = async (target_user_name) => {
      return axios
        .get(
          `${process.env.REACT_APP_API_PREFIX}/api/users/user/${target_user_name}`,
        )
        .then((res) => {
          if (mounted) {
            setUser(res.data.data);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getUser(target_user_name);
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

  const getColor = () => {
    const rating = user_found ? user.rating * 20 : 0;
    switch (rating) {
      case rating > 0 && rating <= 40:
        return `${props.theme.colors.alert_text_red}`;
      case rating > 40 && rating <= 70:
        return `${props.theme.colors.alert_text_amber}`;
      case rating > 70:
        return `${props.theme.colors.alert_text_green}`;
      default:
        return `${props.theme.colors.alert_text_green}`;
    }
  };
  return (
    <ParentContainer>
      <Header useOwnBackground usePagePadding />
      {alerts.map((alert) => {
        return (
          <Alert type={alert.type} key={alert.text}>
            {alert.text}
          </Alert>
        );
      })}
      {user_found && (
        <UserProfile
          background_cover_image={user.background_cover_image}
          data-aos="fade-in"
          data-aos-duration="2000"
        >
          <UserModal>
            <UserDetailsContainer>
              <UserImageFancyBorder>
                <UserImage src={user.photo || defaultImage} />
              </UserImageFancyBorder>
              <UserDetails>
                <NameBar>
                  {!user.firstname && !user.lastname && user.username && (
                    <h1>{user.username.toLowerCase()}</h1>
                  )}
                  {(user.firstname || user.lastname) && (
                    <>
                      <h2>{user.firstname && user.firstname}</h2>
                      <h1>{user.lastname && user.lastname.toUpperCase()}</h1>
                    </>
                  )}
                </NameBar>
                <Handle_And_Rating>
                  <Handle>@{user.username || ''}</Handle>
                  {/* <Rating>
                    <strong color={getColor()}>{user.rating * 20} %</strong>{' '}
                    VENDOR SCORE
                  </Rating> */}
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
      )}

      <Container data-aos="fade-up" data-aos-duration="1000">
        {isLoading && <Loader />}
        {isFetching && <Loader transition={0.2} />}
        {!user._id && !isLoading && (
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
                    user_name={target_user_name}
                    user_id={target_user_id}
                    updater={addAlert}
                    loggedinUser={props.user.user}
                  />
                );
              }}
            />

            <Route
              path={`${match.url}/stores`}
              component={() => {
                return (
                  <ConnectedStores
                    user={user}
                    user_name={target_user_name}
                    user_id={target_user_id}
                    updater={addAlert}
                    loggedinUser={props.user.user}
                  />
                );
              }}
            />
          </Switch>
        )}
      </Container>
      <Footer />
    </ParentContainer>
  );
};

export default withUser(withTheme(User), false);
