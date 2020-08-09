// PERSONAL DETAILS

import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import Input from '@/components/UI/interface/Input';
import Button from '@/components/UI/buttons/Button';
import Edit from '@/assets/images/icons/account/Edit.svg';
import { editUser, setUserPhoto } from '@/actions/user';
import axios from 'axios';
import setAlert from '@/assets/helperFunctions/alerts';
import InputRow from '@/components/widgets/UI/InputRow';
import storesArray from '@/assets/fixtures/stores';

const ParentContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;

  hr {
    width: 100%;
    height: 0.5px;
    margin: 12px auto 32px auto;
    border: none;
    background: ${(props) => props.theme.colors.saturated_contrast};
  }
`;
// section headlines
const S_Head = styled.h3`
  display: inline;
  font-family: 'Noto Sans Regular';
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.dark_background_80};
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
  margin-top: 32px;
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
  background: #ccc;
`;

const P_Details = (props) => {
  const [f_name, setF_name] = useState('');
  const [l_name, setL_name] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [validatedEmail, setValidatedEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [p_photo, setP_Photo] = useState('');
  const [formActive, setFormActive] = useState(false);

  // const storesArray = props.user.user.stores || [];

  const toggleActive = (active) => {
    return setFormActive(!formActive);
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
    const userObj = {
      firstname: f_name,
      lastname: l_name,
      bio,
      email,
    };

    axios.defaults.withCredentials = true;

    const headers = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      authorization: `Bearer ${props.user.user.jwt}`,
    };

    if (!formActive) {
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
      return axios
        .put(
          `${process.env.REACT_APP_API_PREFIX}/api/users/edit/${props.user.user._id}`,
          userObj,
          { headers, withCredentials: true },
        )
        .then((res) => {
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
          return setFormActive(false);
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
        `${process.env.REACT_APP_API_PREFIX}/api/users/edit/addP_Photo/${vendo_id}`,
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
        setAlert(
          props.store,
          props.updater,
          'error',
          'Error updating profile photo!',
        );
      });
  };

  return (
    <ParentContainer>
      <Container>
        <Header>
          <S_Head>LINKED STORES</S_Head>
        </Header>
        <Stores>
          {storesArray.map((store) => {
            return;
          })}
        </Stores>
        <Header>
          <S_Head>PERSONAL DETAILS</S_Head>
          <EditIcon src={Edit} onClick={toggleActive} />
        </Header>
        <hr />
        <Form active={formActive}>
          <InputRow label="Profile Photo">
            <Input
              useLabelAnimation={true}
              inputType={'imagepicker'}
              left="14px"
              readOnly={!formActive}
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
                color: `${props.theme.colors.dark_background_60}`,
                p_color: `${props.theme.colors.dark_background_20}`,
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
              readOnly={!formActive}
              handleChange={handleF_Name}
              value={props.user.user.firstname || ''}
              class={{
                name: 'f_name',
                type: 'text',
                fill: `${props.theme.colors.alternate_light_background_10}`,
                color: `${props.theme.colors.dark_background_60}`,
                p_color: `${props.theme.colors.dark_background_20}`,
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
              readOnly={!formActive}
              handleChange={handleL_Name}
              value={props.user.user.lastname || ''}
              class={{
                name: 'l_name',
                type: 'text',
                fill: `${props.theme.colors.alternate_light_background_10}`,
                color: `${props.theme.colors.dark_background_60}`,
                p_color: `${props.theme.colors.dark_background_20}`,
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
              readOnly={!formActive}
              verify={validateEmail}
              handleChange={handle_Email}
              value={props.user.user.email || ''}
              class={{
                name: 'email',
                type: 'email',
                fill: `${props.theme.colors.alternate_light_background_10}`,
                color: `${props.theme.colors.dark_background_60}`,
                p_color: `${props.theme.colors.dark_background_20}`,
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
              readOnly={!formActive}
              handleChange={handleBio}
              value={props.user.user.bio || ''}
              class={{
                name: 'bio',
                type: 'textarea',
                columns: '30',
                rows: '30',
                height: '100',
                fill: `${props.theme.colors.alternate_light_background_10}`,
                color: `${props.theme.colors.dark_background_60}`,
                p_color: `${props.theme.colors.dark_background_20}`,
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
              color: `${props.theme.colors.dark_background_60}`,
              p_color: `${props.theme.colors.dark_background_20}`,
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
              color: `${props.theme.colors.dark_background_60}`,
              p_color: `${props.theme.colors.dark_background_20}`,
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
