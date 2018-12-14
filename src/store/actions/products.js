import axios from 'axios';

const productsFetched = products => ({
  type: 'PRODUCTS_FETCHED',
  products
});

export const tryFetchProducts = () => dispatch => {
  axios.get('http://localhost:8080/products').then(res => {
    dispatch(productsFetched(res.data));
  });
};

export const toggleProduct = id => ({
  type: 'TOGGLE_FROM_ORDER',
  id
});
