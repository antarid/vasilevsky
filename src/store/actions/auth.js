import axios from 'axios';

export const login = ({token, name, email}) => ({
  type: 'LOGIN',
  token,
  name,
  email
});

export const logout = () => {
  window.localStorage.setItem('authtoken', null);
  return {
    type: 'LOGOUT'
  };
};

const saveLoginData = ({email, name, token}) => dispatch => {
  console.log(token);
  window.localStorage.setItem('authtoken', token);
  dispatch(login({email, name, token}));
};

export const tryAuth = () => dispatch => {
  const token = window.localStorage.getItem('authtoken');
  console.log(token);
  if (token && token !== '' && token != 'undefined')
    axios.post('http://localhost:8080/auth/decode', {token}).then(res => {
      if (res.data.err) Promise.reject();
      else dispatch(saveLoginData({...res.data, token}));
    });
};

export const tryLogin = (email, password) => dispatch =>
  axios
    .post('http://localhost:8080/auth/login', {
      email,
      password
    })
    .then(res => {
      if (res.data.err) throw res.data.err;
      else {
        dispatch(saveLoginData({...res.data}));
        Promise.resolve();
      }
    });

export const trySignup = (email, password, name) => dispatch =>
  axios
    .post('http://localhost:8080/auth/signup', {
      name,
      email,
      password
    })
    .then(res => {
      if (res.data.err) throw res.data.err;
      else {
        console.log({...res.data}, 'trySignup');
        dispatch(saveLoginData({...res.data}));
        Promise.resolve();
      }
    });
