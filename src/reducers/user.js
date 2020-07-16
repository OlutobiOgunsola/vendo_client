const initialState = {
  user: {
    username: '',
    jwt_token: '',
    f_name: '',
    l_name: '',
    _id: '',
    email: '',
    accountType: '',
  },
  loading: false,
  error: '',
  loggedIn: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_USER_SUCCESSS':
      return {
        ...state,
        user: action.payload,
        loading: false,
        loggedIn: true,
      };
    case 'LOAD_USER_FAILURE':
      return {
        ...state,
        error: action.payload.error,
        loading: false,
        loggedIn: false,
      };
    case 'LOAD_USER_STARTED':
      return {
        ...state,
        loading: true,
      };
    case 'EDIT_USERNAME':
      return {
        ...state.user,
        username: action.payload,
      };
    case 'EDIT_F_NAME':
      return {
        ...state.user,
        f_name: action.payload,
      };
    case 'EDIT_L_NAME':
      return {
        ...state.user,
        l_name: action.payload,
      };
    case 'EDIT_EMAIL':
      return {
        ...state.user,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default user;
