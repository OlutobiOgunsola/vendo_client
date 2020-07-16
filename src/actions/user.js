import axios from 'axios';

const loadUserStarted = () => {
  return {
    type: 'LOAD_USER_STARTED',
  };
};

const loadUserSuccess = (user) => {
  return {
    type: 'LOAD_USER_SUCCESS',
    payload: user,
  };
};

const loadUserFailure = (error) => {
  return {
    type: 'LOAD_USER_FAILURE',
    payload: error,
  };
};

export const loadUser = (id = '') => {
  return (dispatch) => {
    dispatch(loadUserStarted());
    console.log('Loading user');

    return axios
      .get(`/api/users/${id}`)
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        dispatch(loadUserFailure(err));
      });
  };
};
