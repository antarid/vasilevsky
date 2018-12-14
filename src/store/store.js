import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import user from './reducers/user';
import products from './reducers/products';
const store = createStore(
  combineReducers({user, products}),
  applyMiddleware(thunk)
);

export default store;
