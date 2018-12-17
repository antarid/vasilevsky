const initState = {
  authToken: '',
  loggedIn: false,
  name: '',
  email: ''
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: true,
        authToken: action.token,
        name: action.name,
        email: action.email
      };
    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false,
        authToken: '',
        name: '',
        email: ''
      };
    default:
      return state;
  }
};
