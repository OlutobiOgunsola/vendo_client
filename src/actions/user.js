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

const beginSetUser = () => {
  return {
    type: 'SET_USER_BEGIN',
  };
};

const setUserSuccess = (user) => {
  return {
    type: 'SET_USER_SUCCESS',
    payload: user,
  };
};

export const loadUser = (id) => {
  return (dispatch) => {
    dispatch(loadUserStarted());
    axios.defaults.withCredentials = true;
    return axios
      .get(`${process.env.REACT_APP_API_PREFIX}/api/users/${id}`, {
        withCredentials: true,
      })
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

export const setUser = (user) => {
  console.log('begin set user');
  return (dispatch) => {
    dispatch(beginSetUser());
    console.log('dispatch set user');
    dispatch(setUserSuccess(user));
  };
};
