import _ from 'lodash';
const initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case 'TOGGLE_FROM_ORDER':
      if (state[action.id]) {
        let newState = {};
        for (let id in state) if (id !== action.id) newState[id] = state[id];
        return newState;
      } else
        return {
          ...state,
          [action.id]: {
            ...action.product,
            orderedQuantity: 1,
            maxQuantity: action.product.quantity
          }
        };
    case 'REMOVE_FROM_ORDER':
      let newState = {};
      for (let id in state) if (id !== action.id) newState[id] = state[id];
      return newState;
    case 'CHANGE_ORDERED_COUNT':
      const {orderedQuantity, maxQuantity} = state[action.id];
      let newQuantity = orderedQuantity + action.delta;
      newQuantity = Math.max(1, newQuantity);
      newQuantity = Math.min(maxQuantity, newQuantity);
      return {
        ...state,
        [action.id]: {...state[action.id], orderedQuantity: newQuantity}
      };
    default:
      return state;
  }
};
