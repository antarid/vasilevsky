import axios from 'axios';

const successfullyCatalogFetched = products => ({
  type: 'SUCCESSFULLY_CATALOG_FETCHED',
  products
});

const unsuccessfullyCatalogFetched = error => ({
  type: 'UNSUCCESSFULLY_CATALOG_FETCHED',
  error
});

const tryFetchCatalog = () => ({
  type: 'TRY_FETCH_CATALOG'
});

export const fetchCatalog = () => dispatch => {
  dispatch(tryFetchCatalog());
  axios
    .get('http://localhost:8080/products')
    .then(res => {
      if (res.data.err) dispatch(unsuccessfullyCatalogFetched(res.data.err));
      else dispatch(successfullyCatalogFetched(res.data));
    })
    .catch(err => {
      dispatch(unsuccessfullyCatalogFetched(err));
    });
};
