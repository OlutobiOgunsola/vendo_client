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
import { withRouter } from 'react-router';
import Alert from '@/components/widgets/UI/Alert';

const storeAnimation = keyframes`${fadeIn}`;

const ParentContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  font-size: 16px;

  hr {
    width: 100%;
    height: 0.1px;
    margin: 2rem auto;
    border: none;
    opacity: 0.6;
    background: ${(props) => props.theme.colors.alternate_light_background_10};
  }

  @media (max-width: 700px) {
    hr {
      margin: 1.5rem auto;
    }
  }

  @media (max-width: 500px) {
    hr {
      margin: 0.75rem auto;
    }
  }
`;
// section headlines
const S_Head = styled.h3`
  display: inline;
  font-family: 'Noto Sans Regular';
  font-size: 1rem;
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
`;

const EditIcon = styled.img`
  display: inline-block;
  height: 1.25rem;
  width: 1.25rem;
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

const AddStore = (props) => {
  const storeProp = props.store;
  const [storename, setStorename] = useState(storeProp ? storeProp.name : '');
  const [handle, setHandle] = useState(storeProp ? storeProp.address : '');
  const [handleValid, setHandleValid] = useState(true);
  const [bio, setBio] = useState(storeProp ? storeProp.bio : '');

  const storePropCategory =
    storeProp && storeProp.category ? storeProp.category : [];
  const [tags, setTags] = useState(storePropCategory[0] || 'Agriculture');
  const [email, setEmail] = useState(storeProp ? storeProp.email : '');
  const [validatedEmail, setValidatedEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [store_photo, setStore_Photo] = useState(
    storeProp ? storeProp.photo : '',
  );

  const [alerts, addAlert] = useState([]);

  const [success, setSuccess] = useState(false);

  const { user } = props;
  const user_id = user._id ? user._id : '';
  const store_owner_id = storeProp ? storeProp.owner_id : '';
  useEffect(() => {
    if (storeProp) {
      if (user_id !== store_owner_id) {
        setAlert(addAlert, 'error', 'Cannot edit store');
        const timeout = setTimeout(() => {
          if (!props.history.goBack()) {
            props.history.push('/');
          }
          props.history.goBack();
          clearTimeout(timeout);
        }, 1000);
      }
    }
  }, [user_id]);

  const handleStore_Handle = (store_handle) => {
    const regex = /^[-\w\.\$@\*\!]{1,30}$/;
    const handle_Regex_Test = regex.test(store_handle);
    if (!handle_Regex_Test) {
      setEmailValid(false);
      return setAlert(addAlert, 'error', 'Handle cannot contain spaces!"');
    }

    const headers = {
      'Content-Type': 'application/json',
    };
    const data = {
      handle: store_handle,
    };
    return axios
      .post(
        `${process.env.REACT_APP_API_PREFIX}/api/stores/verify/`,
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
          setHandleValid(false);
          setAlert(addAlert, 'error', 'Handle is taken. Try another');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStore_Name = (name) => {
    return setStorename(name);
  };

  const handleStoreHandle = (name) => {
    setHandle((prev) => {
      return name;
    });
  };

  const handleBio = (bio) => {
    return setBio(bio);
  };

  const handle_Email = (email) => {
    return setEmail(email);
  };

  const handleTagsFromInput = (tags) => {
    setTags((prevstate) => {
      return tags;
    });
  };

  const validateEmail = () => {
    // setEmailValid(true);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email_Regex_Test = regex.test(email);
    if (!email_Regex_Test) {
      setEmailValid(false);
      return setAlert(
        addAlert,
        'error',
        'Use email format "email@example.com"',
      );
    }
    if (!email) {
      // setEmailValid(true);
      return null;
    }
    if (true) {
      // if (email !== props.user.user.email) {
      const emailObj = { email: email.toLowerCase() };
      const headers = {
        'Content-Type': 'application/json',
        Accept: '*/*',
      };
      return axios
        .post(
          `${process.env.REACT_APP_API_PREFIX}/api/stores/verify`,
          emailObj,
          headers,
        )
        .then((res) => {
          if (res.data.data === true) {
            setEmailValid(false);
            return setAlert(
              addAlert,
              'error',
              'Email is taken, please try another',
            );
            //implement logic to send an email to the users email address with token for verifying email
          } else {
            setValidatedEmail(email);
          }
        })
        .catch((err) => {
          console.log('Invalid details', err);
        });
    }
  };

  const uploadImage = (arg) => {
    const formData = new FormData();

    // append image that has been set into state by setImage
    formData.append('store_photo', store_photo);
    const headers = {
      Accept: '*/*',
    };
    return axios
      .put(
        `${process.env.REACT_APP_API_PREFIX}/api/stores/edit/${storeProp._id}/photo`,
        formData,
        { headers },
      )
      .then((res) => {
        if (res.status === 200) {
          setStore_Photo(res.data.data.photo);
          return props.setUserPhoto(res.data.data.photo);
        }
        setAlert(addAlert, 'success', 'Profile photo updated successfully!');
      })
      .catch((err) => {
        setAlert(addAlert, 'error', 'Error updating profile photo!');
      });
  };

  const submit = () => {
    const storeObj = {};
    storeObj.storename = storename;
    storeObj.address = handle.toLowerCase();
    storeObj.bio = bio;
    storeObj.email = validatedEmail;
    storeObj.category = [tags];
    storeObj.platform = 'local';

    if (storename === 'add') {
      return setAlert(addAlert, 'error', 'Cannot use "Add" as storename');
    }
    if (handle.length >= 24) {
      return setAlert(
        addAlert,
        'error',
        'Handle too long! Please restrict to 24 characters',
      );
    }

    const validated =
      // disable use of 'add' as storename as 'add' is already a route on frontend
      storename !== 'add' &&
      storename !== '' &&
      handle !== '' &&
      handle.length < 24 &&
      bio !== '' &&
      email !== '' &&
      tags !== '';

    axios.defaults.withCredentials = true;
    const headers = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      authorization: `Bearer ${props.user.jwt}`,
    };

    if (!validated) {
      return setAlert(addAlert, 'error', 'Please fill out all fields');
    }

    if (validated && !storeProp) {
      return axios
        .post(`${process.env.REACT_APP_API_PREFIX}/api/stores/add`, storeObj, {
          headers,
          withCredentials: true,
        })
        .then(async (res) => {
          if (res.status === 200) {
            setAlert(addAlert, 'success', 'You have successfully added store');
            setSuccess(true);
            return props.history.push(`/users/${user.username}/stores`);
          }
        })
        .catch((err) => {
          return setAlert(addAlert, 'error', 'Error adding store.');
        });
    } else if (validated && storeProp) {
      return axios
        .put(
          `${process.env.REACT_APP_API_PREFIX}/api/stores/edit/${storeProp._id}`,
          storeObj,
          {
            headers,
            withCredentials: true,
          },
        )
        .then(async (res) => {
          if (res.status === 200) {
            setAlert(addAlert, 'success', 'You have successfully added store');
            return props.history.push(`/stores/${storeProp.address}`);
          }
        })
        .catch((err) => {
          return setAlert(addAlert, 'error', 'Error adding store.');
        });
    }
  };

  const setStorePhoto = (data) => {
    // set image into state
    return setStore_Photo(data);
  };

  const categories = [
    'Fashion',
    'Tech',
    'Beauty',
    'Medical',
    'Handyman',
    'Artisan',
    'Real Estate',
    'Clothing',
    'Hair',
    'Makeup',
    'Food',
    'Drinks',
    'Fashion Design',
    'Art',
    'Design',
    'Agriculture',
  ];

  const sortedCats = categories.sort();

  return (
    <ParentContainer>
      {alerts.map((alert) => {
        return (
          <Alert type={alert.type} key={alert.text}>
            {alert.text}
          </Alert>
        );
      })}
      <Container>
        <ReactTooltip effect={'solid'} />
        <Header>
          {!props.store && <S_Head>ADD STORE</S_Head>}
          {props.store && <S_Head>EDIT STORE</S_Head>}
        </Header>
        <hr />
        <Form>
          {storeProp && (
            <>
              <InputRow label="Store Photo">
                <Input
                  useLabelAnimation={true}
                  inputType={'imagepicker'}
                  left="14px"
                  handleChange={null}
                  // pass store to the alert function
                  store={props.store}
                  // pass "updater" function from Account component down for use by input picker component
                  updater={addAlert}
                  // pass image updater to input
                  setImage={setStorePhoto}
                  currentPhoto={storeProp.photo}
                  class={{
                    name: 'store_photo',
                    width: '100px',
                    height: '100px',
                    type: 'file',
                    fill: `${props.theme.colors.alternate_light_background_10}`,
                    color: `${props.theme.colors.saturated_contrast_60}`,
                    p_color: `${props.theme.colors.saturated_contrast_20}`,
                    padding: '8px',
                    placeholder: 'Store Photo',
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
                  onClick={uploadImage}
                >
                  Upload
                </Button>
              </InputRow>
            </>
          )}
          <InputRow label="Store Name">
            <Input
              useLabelAnimation={true}
              inputType={'input'}
              left="14px"
              handleChange={handleStore_Name}
              value={storename}
              valid={() => {
                return storename !== '';
              }}
              class={{
                name: 'store_name',
                type: 'text',
                fill: `${props.theme.colors.alternate_light_background_10}`,
                color: `${props.theme.colors.saturated_contrast_60}`,
                p_color: `${props.theme.colors.saturated_contrast_20}`,
                padding: '8px',
                placeholder: 'Store name',
                label: { display: 'none' },
                required: true,
              }}
            />
          </InputRow>
          <InputRow label="Store Handle">
            <Input
              useLabelAnimation={true}
              inputType={'input'}
              left="14px"
              verify={handleStore_Handle}
              handleChange={handleStoreHandle}
              value={handle}
              valid={handleValid}
              class={{
                name: 'store_handle',
                type: 'text',
                fill: `${props.theme.colors.alternate_light_background_10}`,
                color: `${props.theme.colors.saturated_contrast_60}`,
                p_color: `${props.theme.colors.saturated_contrast_20}`,
                padding: '8px',
                placeholder: '@...',
                label: { display: 'none' },
              }}
            />
          </InputRow>
          <InputRow label="Email Address">
            <Input
              useLabelAnimation={true}
              inputType={'input'}
              left="14px"
              verify={validateEmail}
              handleChange={handle_Email}
              value={email}
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
          <InputRow label="Store Category">
            <Input
              useLabelAnimation={true}
              inputType={'select'}
              options={sortedCats}
              left="14px"
              handleChange={handleTagsFromInput}
              value={tags}
              valid={() => {
                return tags !== '';
              }}
              class={{
                name: 'store_tags',
                fill: `${props.theme.colors.alternate_light_background_10}`,
                color: `${props.theme.colors.saturated_contrast_60}`,
                p_color: `${props.theme.colors.saturated_contrast_20}`,
                padding: '8px',
                placeholder: '',
                label: { display: 'none' },
              }}
            >
              {sortedCats.map((cat, index) => {
                return <option key={index}>{cat}</option>;
              })}
            </Input>
          </InputRow>
          <InputRow label="Bio">
            <Input
              inputType={'textarea'}
              useLabelAnimation={true}
              left="14px"
              handleChange={handleBio}
              value={bio}
              valid={() => {
                return bio !== '';
              }}
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
                placeholder: 'A short description of your store',
                label: { display: 'none' },
              }}
            />
          </InputRow>
          <InputRow>
            {!success && (
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
            )}
            {success && (
              <Button
                aos="fade-in"
                aos-duration="1000"
                to={`edit`}
                height="40"
                width="100"
                fill={props.theme.colors.dark_background}
                transition_color={'white'}
                margin="16px 0 0 auto"
              >
                Add Image
              </Button>
            )}
          </InputRow>
        </Form>
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

export default connect(
  null,
  mapDispatchToProps,
)(withTheme(withRouter(AddStore)));
