import React from 'react';
import Card from './Card';
import {pay} from '../../store/actions/order';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {BeatLoader} from 'react-spinners';

class Cards extends React.Component {
  render() {
    if (!this.props.loggedIn)
      return (
        <div className="redirect-invite">
          <h1>You are not logged in, so you can not buy anything...</h1>
          <NavLink className="button green" to="/login">
            Log in
          </NavLink>
        </div>
      );
    else if (!this.props.orderLength)
      return (
        <div className="redirect-invite">
          <h1>You did not chose anything, you can do it here...</h1>
          <NavLink className="button green" to="/">
            Catalog
          </NavLink>
        </div>
      );
    const {success, pending, error} = this.props.ui;
    let statusContent = null;
    if (success)
      statusContent = (
        <div className="success">
          <h3>Thank you for your purchase</h3>
          <NavLink
            className="button green"
            to="/"
            onClick={this.props.destroyOrder}
          >
            Contitue shopping
          </NavLink>
        </div>
      );
    else if (pending)
      statusContent = (
        <BeatLoader
          sizeUnit={'px'}
          size={30}
          color={'#36D7B7'}
          loading={true}
        />
      );
    else if (error) statusContent = <div className="error">{error}</div>;
    return (
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <Card pay={this.props.pay} />
            <div className="status">{statusContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    loggedIn: state.user.loggedIn,
    orderLength: Object.keys(state.order).length,
    ui: state.ui.card
  }),
  dispatch => ({
    pay: cardInfo => dispatch(pay(cardInfo)),
    destroyOrder: () => dispatch({type: 'DESTROY_ORDER'})
  })
)(Cards);
