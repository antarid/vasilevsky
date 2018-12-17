import React from 'react';
import './style.sass';
import Product from './Product';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCatalog} from '../../store/actions/products';
import {toggleProductFromOrder} from '../../store/actions/order';
import {BeatLoader} from 'react-spinners';

class Catalog extends React.Component {
  componentDidMount() {
    this.props.fetchCatalog();
    console.log(this.props);
  }
  render() {
    const {success, pending, error} = this.props.ui;
    if (success)
      return (
        <div className="products-container">
          <BuyButton
            isActive={Object.keys(this.props.order).length}
            loggedIn={this.props.loggedIn}
          />
          <div className="container">
            <div className="row">
              {this.props.products.products.map(product => (
                <Product
                  {...product}
                  picked={this.props.order[product.id]}
                  onProductSelect={() =>
                    this.props.toggleProduct(product.id, product)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      );
    else if (pending)
      return (
        <div className="loader">
          <BeatLoader
            sizeUnit={'px'}
            size={30}
            color={'#36D7B7'}
            loading={true}
          />
        </div>
      );
    else return <div>{error}</div>;
  }
}

const BuyButton = ({loggedIn, isActive}) => (
  <NavLink
    to={loggedIn ? '/order' : '/login'}
    className={
      isActive ? 'active buy-button button green' : 'buy-button button green'
    }
  >
    Buy
  </NavLink>
);

export default connect(
  state => ({
    loggedIn: state.user.loggedIn,
    products: state.products,
    ui: state.ui.catalog,
    order: state.order
  }),
  dispatch => ({
    fetchCatalog: () => dispatch(fetchCatalog()),
    toggleProduct: (id, product) =>
      dispatch(toggleProductFromOrder(id, product))
  })
)(Catalog);
