const addAlert = (type, text) => ({
  type: 'SET_ALERT',
  payload: {
    type,
    text,
  },
});

const clearAlert = () => ({
  type: 'CLEAR_ALERT',
});

export const setAlert = (type, text) => {
  return (dispatch) => {
    dispatch(addAlert(type, text));
    setTimeout(() => {
      dispatch(clearAlert());
    }, 5000);
  };
};
