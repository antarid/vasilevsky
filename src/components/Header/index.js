import React from 'react';
import './style.sass';
import {connect} from 'react-redux';
import {logout} from '../../store/actions/auth';
import {NavLink} from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <NavLink to="/" className="logo">
          super shop
        </NavLink>
        <div className="hello">
          {this.props.user.loggedIn && `hello ${this.props.user.name}!`}
        </div>
        <div className="login">
          {this.props.user.loggedIn ? (
            <button className="button" onClick={this.props.logout}>
              log out
            </button>
          ) : (
            <NavLink to="/login" className="button">
              log in
            </NavLink>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  dispatch => ({logout: () => dispatch(logout())})
)(Header);
