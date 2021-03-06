import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled, { withTheme, keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faLock,
  faEyeSlash,
  faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons';
import { fadeIn } from 'react-animations';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser, loadUser } from '@/actions/user';

import AOS from 'aos';
import 'aos/dist/aos.css';

import signin_400 from '@/assets/images/backgrounds/auth/signin_400.jpg';
import signup_400 from '@/assets/images/backgrounds/auth/signup_400.jpg';
import Logo from '@/components/UI/interface/home/Logo';
import Button from '@/components/UI/buttons/Button';
import Alert from '@/components/widgets/UI/Alert';
import setAlert from '@/assets/helperFunctions/alerts';

const Spin = keyframes`
  from{
    transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }
`;

const FadeIn = keyframes(`${fadeIn}`);

const ParentContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.colors.dark_background};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  overflow: hidden;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  /* background: ${(props) => props.theme.colors.page_background}; */
  background: #637b84;
  border: none;
  border-radius: 0px 4px 4px 0px;
  display: flex;
  flex-flow: row nowrap;
  margin: 0 auto;
  position: relative;
  z-index: 99;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  @media (max-width: 880px) {
    width: 100%;
    height: 100%;
    flex-flow: column nowrap;
  }
  @media (max-width: 630px) {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 430px) {
    width: 100%;
    height: 100%;
    flex-flow: column nowrap;
  }
`;

const Presentation = styled.div`
  transition: all 1s ease-in-out;
  width: 600px;
  height: 100vh;
  background-image: ${(props) =>
    props.login ? `url(${signin_400})` : `url(${signup_400})`};
  background-size: cover;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 1px 0px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  align-items: center;
  justify-content: center;
  @media (max-width: 1000px) {
    width: 400px;
  }
  @media (max-width: 880px) {
    width: 100%;
    height: 300px;
  }
  @media (max-width: 630px) {
    width: 100%;
    height: 300px;
  }
  @media (max-width: 430px) {
    width: 100%;
    height: 300px;
  }
`;
const Inputs = styled.div`
  width: calc(100% - 600px);
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .focused {
    outline: none;
    border-radius: 8px;
    border: 0.5px solid ${(props) => props.theme.colors.dark_background};
  }
  @media (max-width: 1000px) {
    width: calc(100% - 400px);
  }
  @media (max-width: 880px) {
    width: 100%;
    height: calc(100% - 300px);
  }
  @media (max-width: 630px) {
    width: 100%;
    height: calc(100% - 200px);
  }
  @media (max-width: 430px) {
    width: 100%;
    height: calc(100% - 200px);
  }
`;

const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8));
  top: 0;
  left: 0;
  border: none;
  padding: 32px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  @media (max-width: 630px) {
    width: 100%;
    height: 100%;
    flex-flow: column nowrap;
  }
  @media (max-width: 430px) {
    width: 100%;
    padding: 16px;
  }
`;

const LogoContainer = styled.div`
  width: 30px;
  height: 30px;
  z-index: 9;
`;

const Copy = styled.div`
  text-align: left;
  position: relative;
  padding: 16px 0px;
  margin: 0 auto 32px 0;
`;

const Headline = styled.h2`
  margin: 0;
  color: white;
  font-family: 'Oxygen Bold';
  font-size: 32px;
  text-transform: uppercase;
  position: relative;
  z-index: 9;
  transition: all 0.25s ease-in-out;
`;

const SubHeader = styled.p`
  width: 300px;
  height: 36px;
  margin: 16px auto 24px auto;
  text-transform: uppercase;
  transition: all 0.25s ease-in-out;
  color: white;
  font-family: 'Josefin Sans Light';
  font-size: 18px;
  line-height: 24px;
  position: relative;
  z-index: 9;
  @media (max-width: 500px) {
    width: 250px;
    font-size: 14px;
    margin: 8px auto 16px auto;
  }
`;

const FormGroup = styled.form`
  width: 300px;
  height: auto;
  margin: 20px auto;
  box-sizing: border-box;
  padding: 10px 20px;
  input[type='checkbox']:checked + label {
    color: ${(props) => props.theme.colors.dark_background};
  }
  input[type='radio']:checked + label {
    color: ${(props) => props.theme.colors.dark_background};
  }
`;

const Header = styled.h2`
  margin: 0;
  font-family: 'Noto Sans Bold';
  font-size: 20px;
  color: ${(props) => props.theme.colors.saturated_contrast};
  text-align: center;
  transition: all 0.25s ease-in-out;
`;

const Input = styled.input`
  width: 250px;
  height: 40px;
  background: rgba(255,255,255,0.1);
  /* background: ${(props) =>
    props.theme.colors.alternate_light_background_10}; */
  border-radius: 4px;
  border: ${(props) => {
    const col = props.pwdCol;
    if (col) {
      return `2px solid ${col}`;
    } else {
      return props.valid ? 'none' : '1px solid #ff9494';
    }
  }};
  box-sizing: border-box;
  padding: 8px 32px;
  transition: all 0.25s ease-in-out;
  color: ${(props) => props.theme.colors.saturated_contrast};
  font-family: 'Oxygen Regular', 'Font Awesome 5 Solid' !important;
  font-size: 14px;
  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.colors.saturated_contrast};
  }
  &::placeholder {
    color: ${(props) => props.theme.colors.saturated_contrast};
  }

  &:focus {
    outline: none;
    border-radius: 8px;
    border: ${(props) => {
      const col = props.pwdCol;
      if (col) {
        return `2px solid ${col}`;
      } else {
        return `0.5px solid ${props.theme.colors.dark_background}`;
      }
    }};
    background: ${(props) => props.theme.colors.light_background_10};
    color: ${(props) => props.theme.colors.saturated_contrast};
  }
`;

const Checkbox = styled.input`
  margin: 8px;
  transition: all 0.25s ease-in-out;
  position: relative;
  z-index: 9;
`;

const Label = styled.label`
  display: ${(props) => props.display};
  font-family: 'Josefin Sans Regular';
  font-size: 14px;
  color: ${(props) => props.theme.colors.yellow};
  width: ${(props) => props.width || '100px'};
  transition: all 0.25s ease-in-out;
  line-height: 20px;
`;

const InputGroup = styled.span`
  display: block;
  width: auto;
  height: auto;
  position: relative;
  margin: 8px 0px;
  box-sizing: border-box;
  transition: all 0.25s ease-in-out;
  .valid {
    border-color: '#4bb543';
  }
  .invalid {
    border-color: '#ff9494';
  }
  .fa-icon {
    transition: all 0.25s ease-in-out;

    position: absolute;
    transform: translate(10px, 12px);
    color: ${(props) => props.theme.colors.saturated_contrast};
  }
  .push-right {
    transition: all 0.25s ease-in-out;

    position: absolute;
    color: ${(props) => props.theme.colors.saturated_contrast};
    transform: translate(210px, 12px);
    &:hover {
      cursor: pointer;
    }
  }
`;

const Spinner = styled.span`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border-style: dashed hidden;
  border-color: ${(props) => props.theme.colors.dark_background};
  border-width: 1px;
  margin: 8px;
  display: ${(props) => (props.displayProp ? '' : 'none')};
  animation: ${Spin} 2s linear infinite;
`;

const ErrorMsg = styled.p`
  color: #ff9494;
  font-size: 14px;
  font-family: 'Josefin Sans Light';
  width: 200px;
  margin: 16px auto 0px auto;
  text-align: center;
`;

const BigCircle = styled.span`
  animation: 3s ${FadeIn};
  position: absolute;
  left: 200px;
  top: 30%;
  z-index: 1;
  width: 400px;
  height: 400px;
  background: ${(props) => props.theme.colors.yellow_80};
  border: none;
  border-radius: 50%;
  @media (max-width: 600px) {
    width: 300px;
    height: 300px;
    left: 20px;
    top: 50%;
  }
`;
const Big2Circle = styled.span`
  animation: 3s ${FadeIn};
  position: absolute;
  left: 20px;
  top: 5%;
  z-index: 1;
  width: 60px;
  height: 100px;
  background: ${(props) => props.theme.colors.yellow_40};
  border: none;
  border-radius: 50%;
`;
const Big4Circle = styled.span`
  animation: 3s ${FadeIn};
  position: absolute;
  left: 80%;
  top: 5px;
  z-index: 1;
  width: 20px;
  height: 20px;
  background: ${(props) => props.theme.colors.alternate_light_background_40};
  border: none;
  border-radius: 50%;
`;

const ProfileActions = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 16px;
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
  width: 100%;
  line-height: 40px;
  width: ${(props) => (props.width ? props.width : '100%')};
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

const Auth = (props) => {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [pwdType, setPwdType] = useState('password');
  const [acctType, setAcctType] = useState('Client');
  const [persist, setPersist] = useState(true);
  const [validating, setValidating] = useState(false);
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [error, setError] = useState('');
  const [pwdStrength, setPwdStrength] = useState('weak');
  const [loginValid, setLoginValid] = useState(true);
  const [alerts, addAlert] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 500 });
    AOS.refresh();
  }, []);

  // function for toggling between login and signup states
  const toggle = () => {
    const items = document.querySelectorAll('.toggle');

    //clear password state
    setPassword('');
    setRepeatPassword('');
    setError('');
    setValidating(false);

    setUsernameValid(true);
    setPasswordValid(true);
    setLoginValid(true);

    //get all items and perform transform in a loop
    items.forEach((item) => {
      item.style.transform = 'translatey(-20px)';
      item.style.opacity = 0;

      return setTimeout(() => {
        item.style.transform = 'translatey(0px)';
        item.style.opacity = 1;
        setLogin(!login);
      }, 500);
    });
  };

  const usernameChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    return setUsername(value);
  };
  const passwordChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    return setPassword(value);
  };
  const onRepeatPassword = (e) => {
    e.preventDefault();
    const value = e.target.value;
    return setRepeatPassword(value);
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoginValid(true);
    const user = {};
    user.username = username.toString();
    user.password = password.toString();
    user.persist_login = persist;

    const headers = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      withCredentials: true,
    };

    if (username && password) {
      setValidating(true);
      return axios
        .post(
          `${process.env.REACT_APP_API_PREFIX}/api/auth/login`,
          user,
          headers,
        )
        .then(async (result) => {
          setValidating(false);
          if (result.status === 200) {
            if (persist) {
              localStorage.setItem('vendo_id', result.data.data._id);
            }
            props.setUser(result.data.data);
            props.loadUser(result.data.data._id);
            setAlert(addAlert, 'success', 'Successfully logged in!');
            const destination = JSON.parse(
              localStorage.getItem('vendo_prev_location_url'),
            );
            const timer = setTimeout(() => {
              if (!destination) {
                props.history.push('/account/settings');
              }
              if (destination) {
                props.history.push(destination);
              }
              return clearTimeout(timer);
            }, 2000);
            return;
          } else {
            setError('Invalid credentials');
            setAlert(addAlert, 'error', 'Error logging in!');
          }
        })
        .catch((err) => {
          console.log(err);
          setValidating(false);
          setLoginValid(false);
          setError('Invalid credentials. Please try again');
        });
    } else {
      setError('Invalid details. Please correct highlighted fields');
      setLoginValid(false);
    }
  };
  const signupSubmit = (e) => {
    e.preventDefault();
    setUsernameValid(true);
    setPasswordValid(true);
    const headers = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      withCredentials: true,
    };
    const user = {};
    user.username = username.toString();
    user.password = password.toString();
    user.accountType = acctType.toString();
    user.validateLogout = true;
    if (!username) {
      return setUsernameValid(false);
    }
    if (!password) {
      return setPasswordValid(false);
    }
    validateUsername();
    if (username && password && usernameValid && passwordValid && acctType) {
      setValidating(true);
      return axios
        .post(
          `${process.env.REACT_APP_API_PREFIX}/api/auth/signup`,
          user,
          headers,
        )
        .then((res) => {
          setValidating(false);
          localStorage.setItem('vendo_id', res.data.data._id);
          props.setUser(res.data.data);
          props.loadUser(res.data.data._id);
          setAlert(addAlert, 'success', 'Successfully signed up!');
          const destination = JSON.parse(
            localStorage.getItem('vendo_prev_location_url'),
          );
          const timer = setTimeout(() => {
            if (!destination) {
              props.history.push('/account/settings');
            }
            if (destination) {
              props.history.push(destination);
            }
            return clearTimeout(timer);
          }, 2000);
          return;
        })
        .catch((err) => {
          setValidating(false);
          // display error message to user
          setError('Error signing up. Please try again');
        });
    } else {
      setError('Invalid details. Please correct highlighted fields');
    }
  };

  const inputColor = () => {
    if (username !== '') {
      return `props.theme.colors.dark_background`;
    }
    return;
  };

  const viewPwd = () => {
    return pwdType === 'password' ? setPwdType('text') : setPwdType('password');
  };

  const persistSignin = (e) => {
    return setPersist(!persist);
  };

  const validateUsername = (e) => {
    if (username) {
      console.log('validating username');
      setValidating(true);
      const regex = /^[A-Za-z0-9_]+$/;
      const u_name = username.toString();
      const valid = regex.test(u_name);
      if (valid) {
        return axios
          .post(
            `${process.env.REACT_APP_API_PREFIX}/api/users/verify/`,
            { username: u_name },
            {
              'Content-Type': 'application/json',
              'Content-Transfer-Encoding': 'application/json',
              Accept: '*/*',
            },
          )
          .then((res) => {
            if (res.data.data) {
              setUsernameValid(false);
              setError('Username is taken. Try another');
            } else {
              setUsernameValid(true);
              setError('');
            }
            setValidating(false);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setValidating(false);
          });
      } else {
        return setError('Username can only contain letters and numbers');
      }
    }
  };

  const testPassword = () => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    const strong = strongRegex.test(password);
    const medium = mediumRegex.test(password);

    console.log(pwdStrength);

    if (strong) {
      setPwdStrength('strong');
    } else if (medium) {
      setPwdStrength('medium');
    } else {
      setPwdStrength('weak');
    }
  };

  const pwdColor = () => {
    if (password) {
      if (pwdStrength === 'strong') {
        return '#4bb543';
      } else if (pwdStrength === 'medium') {
        return '#ffa500';
      } else {
        return '#ff9494';
      }
    } else {
      return ``;
    }
  };

  const validatePassword = () => {
    if (password) {
      if (password === repeatPassword) {
        setError('');
        return setPasswordValid(true);
      } else {
        setError('Passwords do not match!');
        return setPasswordValid(false);
      }
    }
  };

  const setVendor = () => {
    setAcctType('Vendor');
  };
  const setClient = () => {
    setAcctType('Client');
  };

  return (
    <ParentContainer>
      {alerts.map((alert) => {
        return (
          <Alert position={'fixed'} type={alert.type} key={alert.text}>
            {alert.text}
          </Alert>
        );
      })}
      <Container>
        <Presentation login={login}>
          <Modal>
            <LogoContainer
              onClick={() => {
                return props.history.push('/');
              }}
            >
              <Logo />
            </LogoContainer>
            <Copy>
              <Headline className="toggle">
                {login ? 'Welcome' : 'Hi There!!'}
              </Headline>
              <SubHeader className="toggle">
                {login
                  ? 'Please input your details to continue to Vendo'
                  : 'Sign up to start writing or receiving reviews on Vendo'}
              </SubHeader>
              <Button
                width={130}
                height={40}
                border={`1px solid ${props.theme.colors.font_high_contrast}`}
                position={'relative'}
                z-index={9}
                transition_fill={'white'}
                transition_color={props.theme.colors.font_primary}
                onClick={toggle}
                margin={'16 auto 0 0'}
                to={'#'}
                className="toggle"
              >
                {login ? 'Sign Up >' : 'Sign In >'}
              </Button>
            </Copy>
          </Modal>
        </Presentation>
        <Inputs>
          {login && (
            <>
              <Header className="toggle">Sign back into Vendo</Header>
              <Spinner displayProp={validating} className="toggle" />
            </>
          )}

          {!login && (
            <>
              <Header className="toggle">
                Create a{' '}
                <b
                  style={{
                    fontWeight: 700,
                    color: `${props.theme.colors.yellow}`,
                  }}
                >
                  FREE
                </b>{' '}
                account
              </Header>
              <Spinner displayProp={validating} className="toggle" />
            </>
          )}
          {error && <ErrorMsg>{error}</ErrorMsg>}
          {login && (
            <FormGroup>
              <InputGroup>
                <Label htmlFor="Username" display={'none'}>
                  Username
                </Label>
                <FontAwesomeIcon className="fa-icon toggle" icon={faUser} />
                <Input
                  autoFocus={true}
                  data-id="1"
                  className="toggle fa fa-user"
                  type="text"
                  name="Username"
                  value={username}
                  valid={true}
                  placeholder="Username"
                  onChange={usernameChange}
                  color={inputColor()}
                  valid={loginValid}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="password" display={'none'}>
                  Password
                </Label>
                <FontAwesomeIcon className="fa-icon toggle" icon={faLock} />
                <FontAwesomeIcon
                  className="fa-icon push-right toggle"
                  icon={faEyeSlash}
                  onClick={viewPwd}
                />
                <Input
                  data-id="2"
                  className="toggle"
                  type={pwdType}
                  name="Password"
                  value={password}
                  placeholder="Password"
                  onChange={passwordChange}
                  color={inputColor()}
                  valid={loginValid}
                />
              </InputGroup>
              <Checkbox
                type="checkbox"
                name="persist_signin"
                className="toggle"
                onClick={persistSignin}
                defaultChecked
              />
              <Label
                htmlFor="persist_signin"
                display={'inline-block'}
                className="toggle"
                width={'200px'}
              >
                Keep me signed in
              </Label>
              <ProfileActions>
                <Action onClick={loginSubmit} to={`#`} borders="true">
                  Submit
                  <FontAwesomeIcon
                    className="fa-icon"
                    icon={faLongArrowAltRight}
                  />
                </Action>
              </ProfileActions>
            </FormGroup>
          )}
          {!login && (
            <FormGroup>
              <InputGroup>
                <Label htmlFor="Username" display={'none'}>
                  Username
                </Label>
                <FontAwesomeIcon className="fa-icon toggle" icon={faUser} />
                <Input
                  autoFocus={true}
                  data-id="1"
                  className="toggle fa fa-user"
                  type="text"
                  name="Username"
                  value={username}
                  onBlur={validateUsername}
                  placeholder="Username"
                  onChange={usernameChange}
                  color={inputColor()}
                  valid={usernameValid}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="password" display={'none'}>
                  Password
                </Label>
                <FontAwesomeIcon className="fa-icon toggle" icon={faLock} />
                <FontAwesomeIcon
                  className="fa-icon push-right toggle"
                  icon={faEyeSlash}
                  onClick={viewPwd}
                />
                <Input
                  data-id="2"
                  className="toggle"
                  type={pwdType}
                  name="Password"
                  value={password}
                  placeholder="Password"
                  onChange={passwordChange}
                  onKeyUp={testPassword}
                  color={inputColor()}
                  pwdCol={pwdColor()}
                  valid={passwordValid}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="password_repeat" display={'none'}>
                  Repeat Password
                </Label>
                <FontAwesomeIcon className="fa-icon toggle" icon={faLock} />
                <Input
                  data-id="2"
                  className="toggle"
                  type={pwdType}
                  name="password_repeat"
                  value={repeatPassword}
                  placeholder="Repeat Password"
                  onChange={onRepeatPassword}
                  color={inputColor()}
                  valid={passwordValid}
                  onKeyUp={validatePassword}
                />
              </InputGroup>
              <Checkbox
                type="radio"
                name="client_account"
                value="client"
                className="toggle"
                onChange={setVendor}
              />
              <Label
                htmlFor="vendor_account"
                display={'inline-block'}
                className="toggle"
                value="vendor"
              >
                Vendor account
              </Label>
              <Checkbox
                type="radio"
                name="client_account"
                className="toggle"
                defaultChecked
                onClick={setClient}
              />
              <Label
                htmlFor="client_account"
                display={'inline-block'}
                className="toggle"
              >
                Client account
              </Label>
              <ProfileActions>
                <Action onClick={signupSubmit} to={`#`} borders="true">
                  Proceed
                  <FontAwesomeIcon
                    className="fa-icon"
                    icon={faLongArrowAltRight}
                  />
                </Action>
              </ProfileActions>
            </FormGroup>
          )}
        </Inputs>
      </Container>
      <BigCircle data-aos="fade-up-right" data-aos-duration="3000" />
      <Big2Circle data-aos="fade-up" data-aos-duration="2000" />
      <Big4Circle data-aos="fade-down" data-aos-duration="3000" />
    </ParentContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    loadUser: (id) => dispatch(loadUser(id)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(withTheme(Auth)));
// export default withTheme(Auth);
