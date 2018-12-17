import React from 'react';
import './style.sass';
import {connect} from 'react-redux';
import {
  changeOrderedCount,
  removeProductFromOrder
} from '../../store/actions/order';
import {NavLink} from 'react-router-dom';
import _ from 'lodash';

class Order extends React.Component {
  render() {
    if (Object.keys(this.props.order).length)
      return (
        <div className="container">
          <div className="row">
            <div className="col-8 offset-2">
              {_.map(this.props.order, order => (
                <OrderItem
                  orderQuantityChange={this.props.changeOrderedCount}
                  removeProductFromOrder={this.props.removeProductFromOrder}
                  {...order}
                />
              ))}
              <div className="row">
                <div className="total">
                  <div className="total-number">
                    Total:{' '}
                    {_.reduce(
                      this.props.order,
                      (acc, {orderedQuantity, price}) =>
                        acc + orderedQuantity * price,
                      0
                    )}
                    $
                  </div>
                  <NavLink className="button green" to="/card">
                    Pay
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    return (
      <div className="d-flex align-items-center justify-content-center flex-column">
        <h1>You have no orders</h1>
        <NavLink to="/" className="button green">
          Go to catalog
        </NavLink>
      </div>
    );
  }
}

const OrderItem = ({orderQuantityChange, removeProductFromOrder, ...info}) => (
  <div className="row order">
    <div className="col-4">
      <div
        className="order-img"
        style={{backgroundImage: `url(${info.image})`}}
      />
    </div>
    <div className="col-4">{info.name}</div>
    <div className="col-4">
      <div
        className="remove-button"
        onClick={() => removeProductFromOrder(info.id)}
      >
        x
      </div>
      <div className="controllers">
        <div
          className="controller"
          onClick={() => orderQuantityChange(info.id, -1)}
        >
          -
        </div>
        <div className="number">{info.orderedQuantity}</div>
        <div
          className="controller"
          onClick={() => orderQuantityChange(info.id, 1)}
        >
          +
        </div>
      </div>
      <div className="item-total">{info.orderedQuantity * info.price}$</div>
    </div>
  </div>
);

export default connect(
  state => ({
    order: state.order
  }),
  dispatch => ({
    changeOrderedCount: (id, delta) => dispatch(changeOrderedCount(id, delta)),
    removeProductFromOrder: id => dispatch(removeProductFromOrder(id))
  })
)(Order);
