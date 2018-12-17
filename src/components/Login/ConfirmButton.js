import React from 'react';
import _ from 'lodash';
import {trySignup, tryLogin} from '../../store/actions/auth';
import {connect} from 'react-redux';

const ConfirmButton = ({history, values, mode, tryLogin, trySignup}) => {
  let enabled = true;
  _.forEach(
    values,
    value => (enabled = enabled && value.visible ? value.valid : true)
  );
  const onClick = () => {
    tryLogin(mode, _.mapValues(values, prop => prop.value), history);
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
    tryLogin: (mode, values, history) =>
      dispatch(tryLogin(mode, values, history))
  })
)(ConfirmButton);
