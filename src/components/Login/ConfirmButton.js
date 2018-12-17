import React from 'react';
import _ from 'lodash';
import {trySignup, tryLogin} from '../../store/actions/auth';
import {connect} from 'react-redux';

const ConfirmButton = ({values, mode, tryLogin, trySignup}) => {
  let enabled = true;
  _.forEach(
    values,
    value => (enabled = enabled && value.visible ? value.valid : true)
  );
  const onClick = () => {
    if (mode === 'login')
      tryLogin(values.email.value, values.password.value)
        .then(() => {
          window.location.replace('/');
        })
        .catch(err => console.log(err));
    else
      trySignup(values.email.value, values.password.value, values.name.value)
        .then(() => {
          window.location.replace('/');
        })
        .catch(err => alert(err));
  };
  return (
    <button
      disabled={!enabled}
      className={enabled ? '' : 'disabled'}
      onClick={onClick}
    >
      green button
    </button>
  );
};

export default connect(
  null,
  dispatch => ({
    tryLogin: (email, password) => dispatch(tryLogin(email, password)),
    trySignup: (email, password, name) =>
      dispatch(trySignup(email, password, name))
  })
)(ConfirmButton);
