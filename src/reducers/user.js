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
    case 'LOAD_USER_SUCCESS':
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
    case 'BEGIN_EDIT_USER':
      return {
        ...state,
        loading: true,
      };
    case 'EDIT_USER_SUCCESS':
      console.log('payload', action.payload);
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case 'SET_USER_BEGIN':
      return {
        ...state,
        loading: true,
      };
    case 'SET_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: false,
        loggedIn: true,
      };
    case 'CLEAR_USER_BEGIN':
      return {
        ...state,
        loading: true,
      };
    case 'CLEAR_USER_SUCCESS':
      return {
        ...state,
        user: [],
        loading: false,
        loggedIn: false,
      };
    case 'USER_LOGIN_BEGIN':
      state = initialState;
      return {
        ...state,
        loading: true,
      };
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: false,
        loggedIn: true,
      };
    case 'SET_USER_PHOTO_BEGIN':
      return {
        ...state,
        loading: true,
      };
    case 'SET_USER_PHOTO_SUCCESS':
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          photo: action.payload,
        },
      };
    default:
      return state;
  }
};

export default user;
