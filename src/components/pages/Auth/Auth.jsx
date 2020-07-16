import React, { useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import BackgroundLight from '@/assets/images/backgrounds/auth/SVGLight.svg';
import BackgroundDark from '@/assets/images/backgrounds/auth/SVGDark.svg';
import Logo from '@/components/UI/interface/Logo';
import Button from '@/components/UI/buttons/Button';

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
  height: 300px;
  margin: 20px auto;
  box-sizing: border-box;
  padding: 10px 20px;
  input[type='checkbox']:checked + label {
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
  border: none;
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
    border: 0.5px solid ${(props) => props.theme.colors.dark_background};
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

const Auth = (props) => {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [pwdType, setPwdType] = useState('password');
  const [AcctType, setAcctType] = useState('');
  const [persist, setPersist] = useState(false);

  const focusClass = document.querySelectorAll('.focus');

  const toggle = () => {
    const items = document.querySelectorAll('.toggle');

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
    const value = e.target.value;
  };
  const signupSubmit = (e) => {
    e.preventDefault();
    const value = e.target.value;
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

  const accountType = (e) => {
    return setAcctType(e.target.value);
  };

  const persistSignin = (e) => {
    return setPersist(e.target.value);
  };

  const signin = (data) => {
    const copy = Object.assign({}, data);
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
            transition_fill_color={props.theme.colors.font_primary}
            onClick={toggle}
            margin={'0 auto'}
            to={'#'}
            className="toggle"
          >
            {login ? 'Sign Up >' : 'Sign In >'}
          </Button>
        </Presentation>
        <Inputs>
          {login && <Header className="toggle">Sign back into Vendo</Header>}
          {!login && (
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
          )}
          {login && (
            <FormGroup onSubmit={loginSubmit}>
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
                  placeholder="Username"
                  onChange={usernameChange}
                  color={inputColor()}
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
                className="toggle"
                display={'block'}
                transition_fill={props.theme.colors.yellow}
                transition_fill_color={props.theme.colors.dark_background}
                border={'none'}
                margin={'16px 0px'}
                to={'#'}
              >
                {login ? 'Submit' : 'Proceed'}
              </Button>
            </FormGroup>
          )}
          {!login && (
            <FormGroup onSubmit={signupSubmit}>
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
                  placeholder="Username"
                  onChange={usernameChange}
                  color={inputColor()}
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
                />
              </InputGroup>
              <Checkbox
                type="radio"
                name="client_account"
                className="toggle"
                onChange={accountType}
              />
              <Label
                htmlFor="vendor_account"
                display={'inline-block'}
                className="toggle"
                onChange={accountType}
              >
                Vendor account
              </Label>
              <Checkbox type="radio" name="client_account" className="toggle" />
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
                display={'block'}
                transition_fill={props.theme.colors.yellow}
                transition_fill_color={props.theme.colors.dark_background}
                border={'none'}
                margin={'16px 0px'}
              >
                {login ? 'Submit' : 'Proceed'}
              </Button>
            </FormGroup>
          )}
        </Inputs>
      </Container>
    </ParentContainer>
  );
};

export default withTheme(Auth);
