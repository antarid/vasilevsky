const initState = {
  catalog: {
    success: false,
    pending: false,
    error: ''
  },
  card: {
    success: false,
    pending: false,
    error: ''
  },
  item: {
    success: false,
    pending: false,
    error: ''
  }
};

const successfulState = {success: true, pending: false, error: ''};
const unsuccessfulState = {success: false, pending: false};
const pendingState = {success: false, pending: true, error: ''};

export default (state = initState, action) => {
  switch (action.type) {
    case 'TRY_PAY':
      return {...state, card: {...pendingState}};
    case 'SUCCESSFULLY_PAID':
      return {...state, card: {...successfulState}};
    case 'UNSUCCESSFULLY_PAID':
      return {...state, card: {...unsuccessfulState, error: action.error}};
    case 'TRY_FETCH_CATALOG':
      return {...state, catalog: {...pendingState}};
    case 'SUCCESSFULLY_CATALOG_FETCHED':
      return {...state, catalog: {...successfulState}};
    case 'UNSUCCESSFULLY_CATALOG_FETCHED':
      return {...state, catalog: {...unsuccessfulState, error: action.error}};
    default:
      return state;
  }
};
