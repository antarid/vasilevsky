import _ from 'lodash';
const initState = {
  products: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'SUCCESSFULLY_CATALOG_FETCHED':
      return {
        ...state,
        products: action.products.map(product => ({...product, picked: false}))
      };
    case 'REMOVE_FROM_ORDER':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.id ? {...product, picked: false} : product
        )
      };
    case 'TOGGLE_FROM_ORDER':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.id
            ? {...product, picked: !product.picked}
            : product
        )
      };
    case 'SUCCESSFULLY_PAID':
      const tempState = state;
      _.forEach(tempState, item => {
        if (action.order[item.id])
          item.quantity -= action.order[item.id].orderedQuantity;
      });
      return tempState;
    default:
      return state;
  }
};
