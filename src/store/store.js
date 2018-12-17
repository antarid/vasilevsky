import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import user from './reducers/user';
import products from './reducers/products';
import order from './reducers/order';
import ui from './reducers/ui';
const store = createStore(
  combineReducers({user, products, order, ui}),
  applyMiddleware(thunk)
);

store.subscribe(() => console.log(store.getState()));

export default store;
