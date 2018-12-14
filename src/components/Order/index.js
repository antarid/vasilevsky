import React from 'react';
import './style.sass';
import {connect} from 'react-redux';

class Order extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      orders: this.props.orders
    };
  }
  orderQuantityChangedHander = (id, delta) => {
    const indexOfOrder = this.state.orders.map(order => order.id).indexOf(id);
    const order = this.state.orders[indexOfOrder];
    console.log(order);
    let newQuantity = order.orderedQuantity + delta;
    newQuantity = Math.min(newQuantity, order.quantity);
    newQuantity = Math.max(newQuantity, 0);
    order.orderedQuantity = newQuantity;
    this.setState({
      orders: this.state.orders.map(o => (o.id === indexOfOrder ? order : o))
    });
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            {this.state.orders &&
              this.state.orders.map(order => (
                <OrderItem
                  orderQuantityChange={this.orderQuantityChangedHander}
                  {...order}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

const OrderItem = ({orderQuantityChange, orderedQuantity, name, image, id}) => (
  <div className="row order">
    <div className="col-4">
      <div className="order-img" style={{backgroundImage: `url(${image})`}} />
    </div>
    <div className="col-4">{name}</div>
    <div className="col-4">
      <div className="controllers">
        <div className="controller" onClick={() => orderQuantityChange(id, -1)}>
          -
        </div>
        <div className="number">{orderedQuantity}</div>
        <div className="controller" onClick={() => orderQuantityChange(id, 1)}>
          +
        </div>
      </div>
    </div>
  </div>
);

export default connect(state => ({
  orders: state.products.products
    .filter(product => product.picked)
    .map(product => ({...product, orderedQuantity: product.quantity}))
}))(Order);
