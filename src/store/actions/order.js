import axios from 'axios';
import _ from 'lodash';

export const toggleProductFromOrder = (id, product) => ({
  type: 'TOGGLE_FROM_ORDER',
  id,
  product
});

export const removeProductFromOrder = id => ({
  type: 'REMOVE_FROM_ORDER',
  id
});

export const changeOrderedCount = (id, delta) => ({
  type: 'CHANGE_ORDERED_COUNT',
  id,
  delta
});

const successfullyPaid = order => ({
  type: 'SUCCESSFULLY_PAID',
  order
});

const unsuccessfullyPaid = error => ({
  type: 'UNSUCCESSFULLY_PAID',
  error
});

const tryPay = () => ({
  type: 'TRY_PAY'
});

export const pay = cardInfo => (dispatch, getState) => {
  dispatch(tryPay());
  const body = {
    cardInfo,
    order: _.map(getState().order, (value, key) => value)
  };
  axios
    .post('http://localhost:8080/buy', body, {
      headers: {
        authorization: 'Bearer ' + getState().user.authToken
      }
    })
    .then(res => {
      if (res.data.err) {
        dispatch(unsuccessfullyPaid(res.data.err));
      } else {
        dispatch(successfullyPaid(getState().order));
      }
    })
    .catch(err => {
      dispatch(unsuccessfullyPaid(err));
    });
};
