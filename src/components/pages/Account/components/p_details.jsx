import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled, { withTheme, keyframes } from 'styled-components';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import { fadeIn } from 'react-animations';

import { editUser, setUserPhoto } from '@/actions/user';

import Input from '@/components/widgets/UI/Input';
import Button from '@/components/UI/buttons/Button';
import Edit from '@/assets/images/icons/account/Edit.svg';
import setAlert from '@/assets/helperFunctions/alerts';
import InputRow from '@/components/widgets/UI/InputRow';
// import storesArray from '@/assets/fixtures/stores';
import DefaultImage from '@/assets/images/store/DefaultImage.png';

const storeAnimation = keyframes`${fadeIn}`;

const ParentContainer = styled.div`
  width: 100%;
  height: 100%;
  font-size: 16px;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;

  hr {
    width: 100%;
    height: 0.1px;
    margin: 32px auto;
    border: none;
    opacity: 0.6;
    background: ${(props) => props.theme.colors.alternate_light_background_10};
  }

  @media (max-width: 700px) {
    hr {
      margin: 24px auto;
    }
  }

  @media (max-width: 500px) {
    hr {
      margin: 12px auto;
    }
  }
`;
// section headlines
const S_Head = styled.h3`
  display: inline;
  font-family: 'Noto Sans Regular';
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.saturated_font_darker};
  margin: 0;
`;

const Form = styled.form`
  opacity: ${(props) => {
    return props.active ? 1 : 0.5;
  }};
  transition: all 0.5s ease-in-out;
`;

const Header = styled.span`
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 60px;
  &:first-child {
    margin-top: 32px;
  }
  @media (max-width: 700px) {
    margin-top: 48px;
  }
  @media (max-width: 500px) {
    margin-top: 32px;
    &:first-child {
      margin-top: 24px;
    }
  }
`;

const EditIcon = styled.img`
  display: inline-block;
  height: 20px;
  width: 20px;
  opacity: 0.8;
  margin-left: auto;
  transition: all 0.25s ease-in-out;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const Stores = styled.div`
  width: 100%;
  height: auto;
`;

const Store = styled.img`
  width: 95px;
  height: 95px;
  animation: 1s ${storeAnimation};
  box-sizing: border-box;
  border-style: solid;
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
  display: inline-block;
  margin: 4px 16px 0px 0px;
  &:first-child {
    margin-left: 0px;
  }
  &:nth-child(6) {
    margin-left: 0px;
  }
  border-radius: 50%;

  @media (max-width: 700px) {
    width: 55px;
    height: 55px;
    margin: 2px 4px;
    border-width: 3px;
  }
  @media (max-width: 500px) {
    width: 35px;
    height: 35px;
    margin-left: 2px 4px;
    border-width: 1px;
  }
`;

const AddStoreButton = styled(Button)`
  width: 6rem;
  height: 6rem;
  display: inline-block;
  margin: 0.5rem 0rem;
  border: dashed 4px ${(props) => props.theme.colors.saturated_contrast_60};
  border-radius: 4px;
  position: relative;
  &:before {
    content: '+';
    font-size: 2rem;
    color: ${(props) => props.theme.colors.saturated_contrast_60};
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: grid;
    place-items: center;
  }
`;

const P_Details = (props) => {
  const [f_name, setF_name] = useState('');
  const [l_name, setL_name] = useState('');
  const [u_name, setU_name] = useState('');
  const [mounted, setMounted] = useState(true);
  const [u_nameValid, setU_NameValid] = useState(true);
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [validatedEmail, setValidatedEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [p_photo, setP_Photo] = useState('');
  const [p_detailsActive, setP_Details] = useState(false);
  const [acctActive, setAcctActive] = useState(false);

  const stores = props.user.user.registered_stores || [];
  const [storesArray, setStoresArray] = useState(stores);

  useEffect(() => {
    if (mounted) {
      setStoresArray(stores);
    }
    return () => {
      setMounted(false);
    };
  }, [stores]);

  // const storesArray = props.user.user.stores || [];
  const toggleP_DetailsActive = (active) => {
    return setP_Details(!p_detailsActive);
  };
  const toggleAcctActive = (active) => {
    return setAcctActive(!acctActive);
  };

  const setUname = (uname) => {
    return setU_name(uname);
  };

  const handleU_Name = (u_name) => {
    if (u_name === props.user.user.username) {
      return null;
    }
    const headers = {
      'Content-Type': 'application/json',
    };
    const data = {
      username: u_name,
    };
    return axios
      .post(
        `${process.env.REACT_APP_API_PREFIX}/api/users/verify/`,
        data,
        {
          'Content-Type': 'application/json',
          'Content-Transfer-Encoding': 'application/json',
          Accept: '*/*',
        },
        { headers },
      )
      .then((res) => {
        if (res.data.data) {
          setU_NameValid(false);
          setAlert(props.updater, 'error', 'Username is taken. Try another');
        } else {
          setU_NameValid(true);
          setAlert(props.updater, 'success', 'Username valid');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleF_Name = (fname) => {
    return setF_name(fname);
  };

  const handleL_Name = (lname) => {
    return setL_name(lname);
  };

  const handleBio = (bio) => {
    return setBio(bio);
  };

  const handle_Email = (email) => {
    return setEmail(email);
  };

  const validateEmail = () => {
    setEmailValid(true);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email_Regex_Test = regex.test(email);
    if (!email_Regex_Test) {
      setEmailValid(false);
      return setAlert(
        props.updater,
        'error',
        'Use email format "email@example.com"',
      );
    }
    if (!email) {
      setEmailValid(true);
      return null;
    }
    if (email !== props.user.user.email) {
      const emailObj = { email: email.toLowerCase() };
      const headers = {
        'Content-Type': 'application/json',
        Accept: '*/*',
      };
      props.loading(true);
      return axios
        .post(
          `${process.env.REACT_APP_API_PREFIX}/api/users/verify`,
          emailObj,
          headers,
        )
        .then((res) => {
          console.log(res.data.data);
          if (res.data.data === false) {
            setEmailValid(true);
            props.loading(false);
            setValidatedEmail(email);

            return setAlert(props.updater, 'success', 'Email validated');

            //implement logic to send an email to the users email address with token for verifying email
          } else {
            setEmailValid(false);
            props.loading(false);
            return setAlert(
              props.updater,
              'error',
              'Email is taken, please try another',
            );
          }
        })
        .catch((err) => {
          console.log('unsuccessful res', err);
        });
    }
  };

  const submit = () => {
    console.log('submitting form');
    const userObj = {};
    // console.log(f_name, l_name, bio, email);

    // if (f_name !== props.user.user.firstname) {
    userObj.firstname = f_name;
    // } else if (l_name !== props.user.user.lastname) {
    userObj.lastname = l_name;
    // } else if (bio !== props.user.user.bio) {
    userObj.bio = bio;
    // } else
    if (email && emailValid) {
      userObj.email = validatedEmail.toLowerCase();
    }

    axios.defaults.withCredentials = true;

    const headers = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      authorization: `Bearer ${props.user.user.jwt}`,
    };

    if (!p_detailsActive && !u_name) {
      return setAlert(
        props.updater,
        'info',
        'You need to click the edit icon at the top',
      );
    } else if (!f_name && !l_name && !bio) {
      return setAlert(
        props.updater,
        'error',
        'No field edited. Please correct',
      );
    } else {
      props.loading(true);
      if (typeof p_photo === 'object') {
        uploadImage();
      }
      if (u_name !== props.user.user.username && u_nameValid) {
        userObj.username = u_name.toLowerCase();
      }

      return axios
        .put(
          `${process.env.REACT_APP_API_PREFIX}/api/users/edit/${props.user.user._id}`,
          userObj,
          { headers, withCredentials: true },
        )
        .then((res) => {
          console.log('response reveived');
          if (res.status === 200) {
            props.editUser(userObj);
            props.loading(false);
            return setAlert(
              props.updater,
              'success',
              'You have successfully updated your details',
            );
          }
        })
        .catch((err) => {
          props.loading(false);
          return setAlert(
            props.updater,
            'error',
            'Error saving user details. Please try again',
          );
        })
        .finally(() => {
          props.loading(false);
          if (p_detailsActive) {
            return setP_Details(false);
          } else if (acctActive) {
            return setAcctActive(false);
          }
        });
    }
  };

  const setImgData = (data) => {
    // set image into state
    return setP_Photo(data);
  };

  const uploadImage = () => {
    const formData = new FormData();

    // append image that has been set into state by setImage
    formData.append('avatar', p_photo);
    const headers = {
      Accept: '*/*',
    };
    const vendo_id = localStorage.getItem('vendo_id');
    return axios
      .put(
        `${process.env.REACT_APP_API_PREFIX}/api/users/edit/addP_Photo/${props.user.user._id}`,
        formData,
        { headers },
      )
      .then((res) => {
        if (res.status === 200) {
          setP_Photo(res.data.data.photo);
          return props.setUserPhoto(res.data.data.photo);
        }
        setAlert(
          props.updater,
          'success',
          'Profile photo updated successfully!',
        );
      })
      .catch((err) => {
        setAlert(props.updater, 'error', 'Error updating profile photo!');
      });
  };

  return (
    <ParentContainer>
      <Container>
        <ReactTooltip effect={'solid'} />
        {props.user.user.accountType === 'Vendor' && (
          <>
            <Header>
              <S_Head>LINKED STORES</S_Head>
            </Header>
            <hr />
            <Stores>
              {storesArray.length > 0 &&
                storesArray.map((store) => {
                  return (
                    <Store
                      data-tip={store.name}
                      key={store._id}
                      src={store.photo || DefaultImage}
                      platform={store.platform}
                    />
                  );
                })}
              <AddStoreButton to={'/stores/add'} />
            </Stores>
          </>
        )}
        <Header>
          <S_Head>ACCOUNT</S_Head>
          <EditIcon src={Edit} onClick={toggleAcctActive} />
        </Header>
        <hr />
        <Form active={acctActive}>
          <InputRow label="Username">
            <Input
              useLabelAnimation={true}
              inputType={'input'}
              left="14px"
              readOnly={!acctActive}
              verify={handleU_Name}
              handleChange={setUname}
              value={props.user.user.username || ''}
              // pass setalert down to file picker component so it can alert if file is large or wrong format
              setAlert={setAlert}
              // pass "updater" function from Account component down for use by input picker component
              updater={props.updater}
              class={{
                name: 'u_name',
                type: 'text',
                fill: `${props.theme.colors.alternate_light_background_10}`,
                color: `${props.theme.colors.saturated_contrast_60}`,
                p_color: `${props.theme.colors.saturated_contrast_20}`,
                padding: '8px',
                placeholder: 'Username',
                label: { display: 'none' },
              }}
            />
          </InputRow>
          <InputRow>
            <Button
              to={'#'}
              height="40"
              width="100"
              fill={props.theme.colors.dark_background}
              transition_color={'white'}
              margin="16px 0 0 auto"
              onClick={submit}
            >
              Done
            </Button>
          </InputRow>
        </Form>
        <Header>
          <S_Head>PERSONAL DETAILS</S_Head>
          <EditIcon src={Edit} onClick={toggleP_DetailsActive} />
        </Header>
        <hr />
        <Form active={p_detailsActive}>
          <InputRow label="Profile Photo">
            <Input
              useLabelAnimation={true}
              inputType={'imagepicker'}
              left="14px"
              readOnly={!p_detailsActive}
              handleChange={null}
              // pass setalert down to file picker component so it can alert if file is large or wrong format
              setAlert={setAlert}
              // pass store to the alert function
              store={props.store}
              // pass "updater" function from Account component down for use by input picker component
              updater={props.updater}
              // pass image updater to input
              setImage={setImgData}
              // set default image if available
              currentPhoto={props.user.user.photo}
              class={{
                name: 'p_photo',
                type: 'file',
                fill: `${props.theme.colors.alternate_light_background_10}`,
                color: `${props.theme.colors.saturated_contrast_60}`,
                p_color: `${props.theme.colors.saturated_contrast_20}`,
                padding: '8px',
                placeholder: 'Profile Photo',
                label: { display: 'none' },
              }}
            />
          </InputRow>
          <InputRow label="First Name">
            <Input
              useLabelAnimation={true}
              inputType={'input'}
              left="14px"
              readOnly={!p_detailsActive}
              handleChange={handleF_Name}
              value={props.user.user.firstname || ''}
              class={{
                name: 'f_name',
                type: 'text',
                fill: `${props.theme.colors.alternate_light_background_10}`,
                color: `${props.theme.colors.saturated_contrast_60}`,
                p_color: `${props.theme.colors.saturated_contrast_20}`,
                padding: '8px',
                placeholder: 'First name',
                label: { display: 'none' },
              }}
            />
          </InputRow>
          <InputRow label="Last Name">
            <Input
              useLabelAnimation={true}
              inputType={'input'}
              left="14px"
              readOnly={!p_detailsActive}
              handleChange={handleL_Name}
              value={props.user.user.lastname || ''}
              class={{
                name: 'l_name',
                type: 'text',
                fill: `${props.theme.colors.alternate_light_background_10}`,
                color: `${props.theme.colors.saturated_contrast_60}`,
                p_color: `${props.theme.colors.saturated_contrast_20}`,
                padding: '8px',
                placeholder: 'Last name',
                label: { display: 'none' },
              }}
            />
          </InputRow>
          <InputRow label="Email Address">
            <Input
              useLabelAnimation={true}
              inputType={'input'}
              left="14px"
              readOnly={!p_detailsActive}
              verify={validateEmail}
              handleChange={handle_Email}
              value={props.user.user.email || ''}
              class={{
                name: 'email',
                type: 'email',
                fill: `${props.theme.colors.alternate_light_background_10}`,
                color: `${props.theme.colors.saturated_contrast_60}`,
                p_color: `${props.theme.colors.saturated_contrast_20}`,
                padding: '8px',
                placeholder: 'Email address',
                label: { display: 'none' },
              }}
              valid={emailValid}
            />
          </InputRow>

          <InputRow label="Bio">
            <Input
              inputType={'textarea'}
              useLabelAnimation={true}
              left="14px"
              readOnly={!p_detailsActive}
              handleChange={handleBio}
              value={props.user.user.bio || ''}
              class={{
                name: 'bio',
                type: 'textarea',
                columns: '30',
                rows: '30',
                height: '100',
                width: '350',
                fill: `${props.theme.colors.alternate_light_background_10}`,
                color: `${props.theme.colors.saturated_contrast_60}`,
                p_color: `${props.theme.colors.saturated_contrast_20}`,
                padding: '8px',
                placeholder: 'Bio',
                label: { display: 'none' },
              }}
            />
          </InputRow>
          <InputRow>
            <Button
              to={'#'}
              height="40"
              width="100"
              fill={props.theme.colors.dark_background}
              transition_color={'white'}
              margin="16px 0 0 auto"
              onClick={submit}
            >
              Done
            </Button>
          </InputRow>
        </Form>
        <Header>
          <S_Head>ACCOUNT</S_Head>
          {/* <EditIcon src={Edit} onClick={toggleActive} /> */}
        </Header>
        <hr />
        <InputRow label="Account Type">
          <Input
            useLabelAnimation={false}
            inputType={'input'}
            left="14px"
            readOnly={true}
            handleChange={() => {
              return null;
            }}
            value={props.user.user.accountType || ''}
            class={{
              name: 'account-type',
              type: 'text',
              fill: `${props.theme.colors.alternate_light_background_10}`,
              color: `${props.theme.colors.saturated_contrast_60}`,
              p_color: `${props.theme.colors.saturated_contrast_20}`,
              padding: '8px',
              placeholder: 'Account Type',
              label: { display: 'none' },
            }}
          />
        </InputRow>
        <InputRow label="Billing Tier">
          <Input
            useLabelAnimation={false}
            inputType={'input'}
            left="14px"
            readOnly={true}
            handleChange={() => {
              return null;
            }}
            value={props.user.user.billingTier || 'Free Tier'}
            class={{
              name: 'billing-type',
              type: 'text',
              fill: `${props.theme.colors.alternate_light_background_10}`,
              color: `${props.theme.colors.saturated_contrast_60}`,
              p_color: `${props.theme.colors.saturated_contrast_20}`,
              padding: '8px',
              placeholder: 'Billing Tier',
              label: { display: 'none' },
            }}
          />
        </InputRow>
      </Container>
    </ParentContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (arg) => dispatch(editUser(arg)),
    setUserPhoto: (arg) => dispatch(setUserPhoto(arg)),
  };
};

export default connect(null, mapDispatchToProps)(withTheme(P_Details));
