import React, { useState, useEffect } from 'react';
import styled, { withTheme, keyframes } from 'styled-components';
import Lottie from 'react-lottie';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import StarRatings from 'react-star-ratings';
import { fadeIn } from 'react-animations';

import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';

import withUser from '@/components/higher-order/withUser';
import Footer from '@/components/UI/Footer';
import ProfileWidget from '@/components/widgets/UI/Profile';
import Header from '@/components/UI/Header';
import Loader from '@/components/widgets/UI/Loader';
import Alert from '@/components/widgets/UI/Alert';
import { loadUser } from '@/actions/user';
import ReviewItem from '@/components/UI/interface/account/Review.jsx';

import empty404 from '@/assets/images/lottie/404.json';
import emptyReview from '@/assets/images/lottie/emptyReview.json';
import emptyTransactions from '@/assets/images/lottie/emptyTransactions.json';

import defaultStoreImage from '@/assets/images/store/DefaultImage.png';

const storeAnimation = keyframes(fadeIn);

const ParentContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.page_background};
  height: auto;
`;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.dark_background};

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
  font-family: 'Josefin Sans Regular';
  color: ${(props) => props.theme.colors.saturated_contrast};
`;
const Rating = styled.span`
  margin: 0;
`;
const Bio = styled.p`
  margin: 0;
  max-height: 64px;
  padding: 8px 0px;
  font-size: 14px;
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

// section headlines
const S_Head = styled.h3`
  display: block;
  font-family: 'Noto Sans Regular';
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.saturated_font_darker};
  margin: 16px 0px 32px 0px;
`;

const Registered_Stores = styled.section`
  max-width: 880px;
  height: auto;
  margin: 40px auto 24px auto;
  box-sizing: border-box;
  padding: 32px 0px;
`;

const Stores = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 32px;
  .tooltip {
    font-size: 16px !important;
    font-family: 'Josefin Sans Light' !important;
    text-align: left !important;
  }
`;

const StoreItem = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-size: 100%;
  animation: 1s ${storeAnimation};
  box-sizing: border-box;
  border-style: solid;
  border-width: 3px;
  display: block;
  opacity: 0.8;
  transition: all 0.25s ease-in-out;

  border-color: ${(props) => {
    switch (props.platform) {
      case 'facebook':
        return '#395185';

      case 'twitter':
        return '#55acee';

      case 'instagram':
        return '#d53f90';

      default:
        return `${props.theme.colors.yellow}`;
    }
  }};
  margin-right: 8px;
  &:last-child {
    margin-right: 0px;
  }
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const ProfileActions = styled.div`
  height: 50px;
  width: 100%;
  margin: 16px auto;
  display: flex;
  justify-content: space-between;
`;

const Action = styled.span`
  display: inline-block;
  height: 100%;
  line-height: 50px;
  width: 48%;
  text-align: center;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.dark_background};
  color: ${(props) => props.theme.colors.saturated_contrast};
  border: none;
  border-radius: 4px;
  transition: all 0.25s ease-in-out;
  &:hover {
    cursor: pointer;
    width: 48.5%;
    box-shadow: 2px 4px 10px ${(props) => props.theme.colors.dark_background_60};
  }
`;

const Reviews = styled.section`
  max-width: 880px;
  height: auto;
  padding: 40px 0px;
  box-sizing: border-box;
  margin: 40px auto 24px auto;
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

  const userRating = Math.ceil(user.rating);
  // const userRating = 4;

  const { match } = props;

  const toggleLoading = (payload) => {
    return setLoading(payload);
  };

  const sortedReviews = user.r_reviews.sort((a, b) => {
    return a.rating - b.rating;
  });

  const topReview = sortedReviews ? sortedReviews[0] : {};

  useEffect(() => {
    const target_user_id = match.params.user_id;
    const getUser = async (id) => {
      return axios
        .get(`${process.env.REACT_APP_API_PREFIX}/api/users/${target_user_id}`)
        .then((res) => {
          console.log(res.data.data);
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
  }, [loginStatus]);

  // destructure pathname from useLocation hook
  const { pathname } = useLocation();
  useEffect(() => {
    // get active state from params
    const currentLocation = pathname.split('/')[2];
    setDisplay(currentLocation);
  }, [display]);

  const getDisplayForm = () => {
    switch (display) {
      case 'add':
        return null;
    }
  };

  const LottieOptions = {
    loop: true,
    autoplay: true,
    animationData: empty404,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const emptyReviewLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyReview,
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
        <UserProfile background_cover_image={user.background_cover_imagemnb}>
          <UserModal>
            <UserDetailsContainer>
              <UserImage src={user.photo} />
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
                  <Handle>{user.email && user.email}</Handle>
                  <Rating>
                    <StarRatings
                      starDimension={'16px'}
                      starSpacing={'4px'}
                      rating={userRating}
                      starRatedColor={props.theme.colors.yellow}
                      starEmptyColor={props.theme.colors.light_background}
                    />
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
                      <Action>{'Begin Transaction'}</Action>
                      <Action>{'Send Mail'}</Action>
                    </ProfileActions>
                  </>
                )}
              </UserDetails>
            </UserDetailsContainer>
          </UserModal>
        </UserProfile>
        {user.accountType === 'Vendor' && (
          <Registered_Stores>
            <S_Head>REGISTERED STORES</S_Head>
            <hr />
            <Stores>
              {user.registered_stores &&
                user.registered_stores.length === 0 && (
                  <EmptyStateText>No Registered Stores</EmptyStateText>
                )}
              {user.registered_stores &&
                user.registered_stores.map((store) => {
                  return (
                    <React.Fragment key={store._id}>
                      <ReactTooltip effect="solid" />
                      <StoreItem
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
                        key={store._id}
                        src={store.photo || defaultStoreImage}
                        platform={store.platform}
                      />
                    </React.Fragment>
                  );
                })}
            </Stores>
          </Registered_Stores>
        )}
        <Reviews>
          <S_Head>TOP REVIEW</S_Head>
          <hr />
          {topReview && (
            <ReviewItem
              user_id={user._id}
              user_photo={user.photo}
              review={topReview}
              id={topReview._id}
              updater={props.updater}
              user_token={user.jwt}
            />
          )}
          {!topReview && (
            <Lottie
              options={emptyReviewLottieOptions}
              height={300}
              width={300}
            />
          )}
        </Reviews>

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
      </Container>
      <Footer />
    </ParentContainer>
  );
};

export default withUser(withTheme(User), false);
