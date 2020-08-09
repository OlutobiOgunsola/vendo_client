import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled, { withTheme, keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser, loadUser } from '@/actions/user';

import AOS from 'aos';
import 'aos/dist/aos.css';

import BackgroundLight from '@/assets/images/backgrounds/auth/SVGLight.svg';
import BackgroundDark from '@/assets/images/backgrounds/auth/SVGDark.svg';
import Logo from '@/components/UI/interface/Logo';
import Button from '@/components/UI/buttons/Button';

const Spin = keyframes`
  from{
    transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }
`;

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
  width: 750px;
  height: 400px;
  background: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: 0px 4px 4px 0px;
  display: flex;
  flex-flow: row nowrap;
  margin: 0 auto;
  position: relative;
  z-index: 99;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  @media (max-width: 880px) {
    width: 600px;
  }
  @media (max-width: 630px) {
    width: 400px;
    height: 600px;
    flex-flow: column nowrap;
  }
  @media (max-width: 430px) {
    width: 300px;
    height: 600px;
    flex-flow: column nowrap;
  }
`;

const Presentation = styled.div`
  transition: all 1s ease-in-out;
  width: 300px;
  height: 400px;
  background: ${(props) => {
    return props.login
      ? props.theme.colors.auth_background_1
      : props.theme.colors.auth_background_2;
  }};
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  align-items: center;
  justify-content: center;
  @media (max-width: 630px) {
    width: 400px;
    height: 200px;
  }
  @media (max-width: 430px) {
    width: 300px;
    height: 200px;
  }
`;
const Inputs = styled.div`
  width: 450px;
  height: auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .focused {
    outline: none;
    border-radius: 8px;
    border: 0.5px solid ${(props) => props.theme.colors.dark_background};
  }
  @media (max-width: 880px) {
    width: 300px;
  }
  @media (max-width: 630px) {
    width: 400px;
    height: 400px;
  }
  @media (max-width: 430px) {
    width: 300px;
    height: 400px;
  }
`;

const Svg_background = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  @media (max-width: 630px) {
    width: 400px;
    height: 200px;
    flex-flow: column nowrap;
  }
  @media (max-width: 430px) {
    width: 300px;
  }
`;

const LogoContainer = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 9;
  top: 20px;
  left: 20px;
`;

const Headline = styled.h2`
  margin: 0;
  color: ${(props) => props.theme.colors.font_high_contrast};
  font-family: 'Oxygen Bold';
  font-size: 32px;
  margin: 0 auto;
  position: relative;
  z-index: 9;
  transition: all 0.25s ease-in-out;
`;

const SubHeader = styled.p`
  width: 240px;
  height: 36px;
  margin: 16px auto;
  transition: all 0.25s ease-in-out;
  color: ${(props) => props.theme.colors.font_high_contrast};
  font-family: 'Josefin Sans Light';
  font-size: 18px;
  position: relative;
  z-index: 9;
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
  color: ${(props) => props.theme.colors.dark_background_40};
  text-align: center;
  transition: all 0.25s ease-in-out;
`;

const Input = styled.input`
  width: 250px;
  height: 40px;
  background: ${(props) => props.theme.colors.alternate_light_background_10};
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
  color: ${(props) => props.color || props.theme.colors.saturated_contrast};
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
    color: ${(props) => props.theme.colors.dark_background};
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
  color: ${(props) => props.theme.colors.saturated_contrast};
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
  position: absolute;
  left: -100px;
  top: 60%;
  z-index: 1;
  width: 400px;
  height: 400px;
  background: ${(props) => props.theme.colors.yellow_80};
  border: none;
  border-radius: 50%;
`;
const Big2Circle = styled.span`
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

const Auth = (props) => {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [pwdType, setPwdType] = useState('password');
  const [acctType, setAcctType] = useState('Client');
  const [persist, setPersist] = useState(false);
  const [validating, setValidating] = useState(false);
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [error, setError] = useState('');
  const [pwdStrength, setPwdStrength] = useState('weak');
  const [loginValid, setLoginValid] = useState(true);

  // cleanup after unmounting from dom
  useEffect(() => {
    return () => {
      setLogin(true);
      setUsername('');
      setPassword('');
      setRepeatPassword('');
      setPwdType('password');
      setAcctType('Client');
      setPersist(false);
      setValidating(false);
      setUsernameValid(true);
      setPasswordValid(true);
      setError('');
      setPwdStrength('weak');
      setLoginValid(true);
    };
  }, []);
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
            props.history.push('/account');
          } else {
            setError('Invalid credentials');
          }
        })
        .catch((err) => {
          setValidating(false);
          setLoginValid(false);
          setError('Invalid credentials');
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
          return props.history.push('/account');
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
      <Container>
        <Presentation login={login}>
          <Svg_background
            src={
              props.theme.scheme === 'dark' ? BackgroundLight : BackgroundDark
            }
          />
          <LogoContainer>
            <Logo />
          </LogoContainer>
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
            margin={'0 auto'}
            to={'#'}
            className="toggle"
          >
            {login ? 'Sign Up >' : 'Sign In >'}
          </Button>
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
              {' '}
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
              />
              <Label
                htmlFor="persist_signin"
                display={'inline-block'}
                className="toggle"
                width={'200px'}
              >
                Keep me signed in
              </Label>
              <Button
                width={250}
                height={40}
                fill={props.theme.colors.dark_background}
                color={props.theme.colors.white}
                className="toggle"
                display={'block'}
                transition_fill={props.theme.colors.yellow}
                transition_color={props.theme.colors.white}
                border={'none'}
                onClick={loginSubmit}
                margin={'16px 0px'}
                to={'#'}
              >
                Submit
              </Button>
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
              <Button
                width={250}
                height={40}
                fill={props.theme.colors.dark_background}
                className="toggle"
                color={props.theme.colors.white}
                display={'block'}
                transition_fill={props.theme.colors.yellow}
                transition_color={props.theme.colors.white}
                border={'none'}
                margin={'16px 0px'}
                onClick={signupSubmit}
                to={'#'}
              >
                Proceed
              </Button>
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
