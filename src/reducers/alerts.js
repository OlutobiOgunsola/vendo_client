const initialState = [];

const alerts = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALERT':
      state = [];
      state.push(action.payload);
      return state;
    case 'CLEAR_ALERT':
      state = [];
      return state;
    default:
      return state;
  }
};

export default alerts;
