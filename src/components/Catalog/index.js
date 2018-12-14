import React from 'react';
import axios from 'axios';
import './style.sass';
import Product from './Product';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {tryFetchProducts, toggleProduct} from '../../store/actions/products';

class Catalog extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    return (
      <div className="products-container">
        <BuyButton
          isActive={
            this.props.products.products.filter(product => product.picked)
              .length
          }
          loggedIn={this.props.user.loggedIn}
        />
        <div className="container">
          <div className="row">
            {this.props.products.isLoaded &&
              this.props.products.products.map(product => (
                <Product
                  {...product}
                  onProductSelect={() => this.props.toggleProduct(product.id)}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

const BuyButton = ({loggedIn, isActive}) => (
  <NavLink
    to={loggedIn ? '/order' : '/login'}
    className={isActive ? 'active buy-button' : 'buy-button'}
  >
    Buy
  </NavLink>
);

export default connect(
  state => ({
    user: state.user,
    products: state.products
  }),
  dispatch => ({
    fetchProducts: () => dispatch(tryFetchProducts()),
    toggleProduct: id => dispatch(toggleProduct(id))
  })
)(Catalog);
