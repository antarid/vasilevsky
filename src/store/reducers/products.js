const initState = {
  products: [],
  isLoaded: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'PRODUCTS_FETCHED':
      return {
        ...state,
        isLoaded: true,
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
    case 'BUY':
      const productsPositions = state.products.map(product => product.id);
      const tempProducts = state;
      action.check.forEach(({id, quantity}) => {
        const productPosision = productsPositions.indexOf(id);
        tempProducts[productPosision].quantity -= quantity;
      });
      return {...state, products: tempProducts};
    default:
      return state;
  }
};
