import axios from 'axios';

export const login = ({token, name, email}) => ({
  type: 'SUCCESSFULLY_LOGGED_IN',
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

export const tryLogin = (mode, data, history) => dispatch => {
  dispatch({type: 'TRY_LOGIN'});
  axios
    .post('http://localhost:8080/auth/' + mode, {
      ...data
    })
    .then(res => {
      console.log(res);
      if (res.data.err)
        dispatch({
          type: 'UNSUCCESSFULLY_LOGGED_IN',
          error: res.data.err
        });
      else {
        console.log('here', res.data);
        dispatch(saveLoginData({...res.data}));
        history.push('/');
      }
    })
    .catch(error => {
      dispatch({
        type: 'UNSUCCESSFULLY_LOGGED_IN',
        error
      });
    });
};
