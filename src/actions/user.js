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

export const loadUser = (id) => {
  return (dispatch) => {
    dispatch(loadUserStarted());

    return axios
      .get(`/api/users/${id}`)
      .then((res) => {
        const user = res.data.data;
        dispatch(loadUserSuccess(user));
        return user;
      })
      .catch((err) => {
        dispatch(loadUserFailure(err));
      });
  };
};
