import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Catalog from './components/Catalog';
import './App.css';
import './main.sass';
import {tryAuth} from './store/actions/auth';
import {connect} from 'react-redux';
import _ from 'lodash';
import Header from './components/Header';
import Order from './components/Order';
import Cards from './components/Cards';
const AuthData = props => (
  <div>
    hello
    {_.map(props, (value, key) => (
      <div>{`${key} : ${value}`}</div>
    ))}
  </div>
);

class App extends Component {
  componentDidMount() {
    this.props.tryAuth();
  }
  render() {
    return (
      <BrowserRouter>
        <div style={{paddingTop: 150}}>
          <Header />
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/order" exact component={Order} />
            <Route path="/card" exact component={Cards} />
            <Route path="/" exact component={Catalog} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  dispatch => ({tryAuth: () => dispatch(tryAuth())})
)(App);
