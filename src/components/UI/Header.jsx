import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import withUser from '@/components/higher-order/withUser';
import axios from 'axios';

import HeaderProfile from '@/components/UI/interface/home/HeaderProfile.jsx';
import HeaderSignIn from '@/components/UI/buttons/Header_Sign_In.jsx';
import defaultPhoto from '@/assets/images/icons/account/Profile.svg';
import Logo from '@/components/UI/interface/home/Logo.jsx';
import AddIcon from '@/assets/images/icons/Add.svg';
import NotificationIcon from '@/assets/images/icons/Notification.svg';
import TransactionIcon from '@/assets/images/icons/Transaction.svg';
import setAlert from '@/assets/helperFunctions/alerts';
import Alert from '../widgets/UI/Alert';
import { clearUser } from '@/actions/user';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faSearch,
  faLongArrowAltRight,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import NotificationSVG from './interface/home/Notification';
import NotificationItem from '../widgets/UI/Notification';
import { sort } from '@/assets/helperFunctions/sort';

const ParentContainer = styled.header`
  width: 100%;
  height: 70px;
  /* overflow: hidden; */
  display: flex;
  flex-flow: row nowrap;
  font-size: 16px;
  align-items: center;
  box-sizing: border-box;
  margin: 0;
  box-shadow: ${(props) =>
    props.useOwnBackground ? '0px 2px 5px rgba(0, 0, 0, 0.5)' : ''};
  padding: 10px 100px;
  @media (max-width: 880px) {
    padding: ${(props) => (props.usePagePadding ? '' : '10px 50px')};
  }
  @media (max-width: 700px) {
    padding: ${(props) => (props.usePagePadding ? '' : '10px 50px')};
  }
  @media (max-width: 500px) {
    padding: ${(props) => (props.usePagePadding ? '' : '10px 20px')};
  }
  @media (max-width: 400px) {
    width: 100%;
    padding: 8px;
  }
  background: ${(props) =>
    props.useOwnBackground ? props.theme.colors.dark_background : ''};
`;

const LogoContainer = styled.svg`
  width: 42px;
  height: 38px;
  margin: 0px 40px 0px 0px;
  display: inline-block;
  @media (max-width: 400px) {
    /* margin: 0px 10px 0px 0px;
    box-sizing: border-box; */
    display: none;
  }
`;

const SearchBox = styled.input`
  background: rgba(196, 207, 212, 0.2);
  width: 250px;
  height: 30px;
  border: none;
  border-radius: 4px;
  padding: 7px 16px;
  box-sizing: border-box;
  line-height: 19px;
  outline: none;
  margin: 0;
  display: inline-block;
  color: white;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  :-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  @media (max-width: 970px) {
    width: 300px;
  }
  @media (max-width: 740px) {
    margin-right: 32px;
  }
  @media (max-width: 400px) {
    width: 186px;
  }
`;

const NameBox = styled.span`
  transition: all 1s ease-in-out;
  font-size: 1em;
  color: white;
  margin: 0px 16px 0px 0px;
  @media (max-width: 970px) {
    margin: 0px 8px 0px 0px;
  }

  @media (max-width: 740px) {
    display: none;
  }
`;

const IconsBox = styled.div`
  max-width: 104px;
  height: 20px;
  display: flex;
  align-items: center;
  margin: 0px 16px;
  position: relative;
  @media (max-width: 970px) {
    margin: 0px 8px;
  }
  @media (max-width: 800px) {
    display: none;
  }
`;

const Add = styled.img`
  margin: 0px 8px;
  opacity: 0.6;
  transition: all 0.25s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;
const Notification = styled.svg`
  margin: 0px 8px;
  opacity: 0.6;
  transition: all 0.25s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;
const Transaction = styled.img`
  margin: 0px 8px;
  opacity: 0.6;
  transition: all 0.25s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const FloatRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
`;

const NotifDropdown = styled.div`
  width: 300px;
  height: auto;
  padding: 0.5rem;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.light_background};
  border: none;
  border-radius: 4px;
  position: absolute;
  z-index: 999999999999999999999999;
  left: -100px;
  top: 30px;
  box-shadow: 0px 20x 4px rgba(0, 0, 0, 0.2);
`;

const Menu = styled.div`
  width: 300px;
  height: auto;
  padding: 0.5rem;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.light_background};
  border: none;
  border-radius: 4px;
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  z-index: 999999999999999999999999;
  left: -100px;
  top: 30px;
  box-shadow: 0px 20x 4px rgba(0, 0, 0, 0.2);

  .fa-icon {
    display: inline;
  }
`;

const MenuLink = styled(Link)`
  color: ${(props) => props.theme.colors.saturated_contrast};
  display: block;
  height: 2rem;
  width: 100%;
  border-bottom: solid 0.5px ${(props) => props.theme.colors.saturated_contrast};
  opacity: 0.8;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const ProfileActions = styled.div`
  height: 40px;
  width: 150px;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-left: auto;
  @media (max-width: 500px) {
    width: 100px;
    font-size: 0.75rem;
  }
`;

const Action = styled(Link)`
  position: relative;
  z-index: 9;
  display: inline-block;
  height: 100%;
  line-height: 40px;
  width: ${(props) => (props.width ? props.width : '48%')};
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
  color: ${(props) =>
    props.borders
      ? `${props.theme.colors.yellow}`
      : `${props.theme.colors.saturated_contrast}`};
  border: ${(props) =>
    props.borders ? `1px solid ${props.theme.colors.yellow}` : 'none'};
  border-radius: 4px;
  transition: all 0.5s ease-in-out;
  text-decoration: none;
  .fa-icon {
    width: 0px;
    position: relative;
    left: 0px;
    margin-left: 0px;
    transition: all 1s ease-in-out;
    opacity: 0;
    color: ${(props) => props.theme.colors.dark_background};
    display: none;
  }
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.dark_background};
    /* box-shadow: 0px 4px 10px ${(props) => props.theme.colors.yellow_20}; */
    .fa-icon {
      width: 24px;
      left: 8px;
      margin-left: 0px;
      opacity: 1;
      display: inline-block;
    }
    border: none;
  }
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    top: -0.5px;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${(props) => props.theme.colors.yellow};
    z-index: -1;
    transform: scaleX(0);
    transition-property: transform;
    -webkit-transform-origin: 0 50%;
    transform-origin: 0 50%;
    -webkit-transition-property: transform;
    transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  &:hover:before {
    transform: scaleX(1);
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
  margin: 0px 0px 16px 0px;
  color: ${(props) => props.theme.colors.saturated_contrast};
`;

const Header = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [userObj, setUserObj] = useState({});
  const [alerts, addAlert] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const user = props.user;

  const cancel = axios.CancelToken;
  const source = cancel.source();

  useEffect(() => {
    if (props.user.loggedIn) {
      if (mounted) {
        setLoggedIn(true);
        setUserObj({
          name: props.user.user.firstname || props.user.user.username,
          photo: props.user.user.photo,
        });

        //get new notifications
        const newNotifications = props.user.user.notifications.filter(
          (notif) => {
            return notif.status === 'new';
          },
        );
        if (newNotifications.length > 0) {
          setNewNotifications(true);
        }
        if (user.loggedIn) {
          setNotifications(user.user.notifications);
        }
      }
    }

    return () => {
      source.cancel();
    };
  }, [user]);

  const logout = () => {
    return axios
      .get(`${process.env.REACT_APP_API_PREFIX}/api/auth/logout`, {
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.clear();
          props.clearUser();
          return props.history.push('/');
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Request cancelled', err.message);
        }
      });
  };

  const openTransactions = () => {
    return props.history.push('/account/transactions');
  };

  const openNotifications = () => {
    return props.history.push('/notifications');
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchString((prev) => {
      return value;
    });
  };

  const processSearch = (e) => {
    if (e.key === 'Enter') {
      props.history.push(`/search?query=${searchString}`);
    }
  };

  const goHome = () => {
    if (props.user.loggedIn) {
      return props.history.push('/account/settings');
    } else {
      return props.history.push('/');
    }
  };

  const viewNotifs = () => {
    return setShowNotifs(true);
  };
  const hideNotifs = () => {
    return setShowNotifs(false);
  };

  const showMenuItems = () => {
    return setShowMenu(true);
  };

  const hideMenuItems = () => {
    return setShowMenu(false);
  };

  const firstName = userObj.name || 'User';
  const photo = userObj.photo || defaultPhoto;
  console.log('notificaioint', notifications);

  return (
    <ParentContainer
      usePagePadding={props.usePagePadding}
      useOwnBackground={props.useOwnBackground}
    >
      {alerts.map((alert) => {
        return (
          <Alert type={alert.type} key={alert.text}>
            {alert.text}
          </Alert>
        );
      })}
      {window.location.pathname === '/' && (
        <LogoContainer data-aos="fade-right" data-aos-duration="2000">
          <Logo />
        </LogoContainer>
      )}
      {window.location.pathname !== '/' && (
        <>
          <LogoContainer onClick={goHome}>
            <Logo />
          </LogoContainer>
          <SearchBox
            placeholder="Search"
            type="search"
            onKeyUp={processSearch}
            onChange={handleSearch}
          />
        </>
      )}
      {loggedIn && (
        <>
          <FloatRight>
            <NameBox>Hello, {firstName} </NameBox>
            <IconsBox>
              {showNotifs && (
                <NotifDropdown
                  onMouseEnter={viewNotifs}
                  onMouseLeave={hideNotifs}
                >
                  {notifications
                    .sort(sort('latestFirst'))
                    .map((notification) => {
                      return (
                        <NotificationItem
                          notification={notification}
                          photo={notification.author_id.photo}
                        />
                      );
                    })}
                  {notifications.length === 0 && (
                    <>
                      <EmptyStateText>No Notifications</EmptyStateText>
                      <EmptyStateSubtext>
                        You have no new notifications
                      </EmptyStateSubtext>
                    </>
                  )}
                </NotifDropdown>
              )}
              {showMenu && (
                <Menu onMouseEnter={showMenuItems} onMouseLeave={hideMenuItems}>
                  <ul>
                    <li>
                      <MenuLink>Overview</MenuLink>
                    </li>
                    <li>
                      <MenuLink>Transactions</MenuLink>
                    </li>
                    <li>
                      <MenuLink>My Profile</MenuLink>
                    </li>
                    <li>
                      <MenuLink>Billing</MenuLink>
                    </li>
                    <li>
                      <MenuLink>Notifications</MenuLink>
                    </li>
                    <li>
                      <MenuLink>
                        <FontAwesomeIcon className="fa-icon" icon={faUpload} />
                        Logout
                      </MenuLink>
                    </li>
                  </ul>
                </Menu>
              )}
              <Add src={AddIcon} />
              <Notification
                onClick={openNotifications}
                onMouseEnter={viewNotifs}
                onMouseLeave={hideNotifs}
              >
                <NotificationSVG notif={newNotifications} />
              </Notification>
              <Transaction src={TransactionIcon} onClick={openTransactions} />
            </IconsBox>
            <HeaderProfile
              username={firstName}
              profilePhoto={photo}
              mouseenter={showMenuItems}
              mouseleave={hideMenuItems}
            />
          </FloatRight>
        </>
      )}
      {!loggedIn && (
        <ProfileActions>
          <Action to={`/auth`} borders="true" width="200px" hover_width="220px">
            Sign in
            <FontAwesomeIcon className="fa-icon" icon={faLongArrowAltRight} />
          </Action>
        </ProfileActions>
      )}
    </ParentContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearUser: () => {
      dispatch(clearUser());
    },
  };
};

export default connect(null, mapDispatchToProps)(withRouter(withUser(Header)));
