import React from 'react';
import {NavLink} from 'react-router-dom';

export default ({onProductSelect, picked, ...info}) => (
  <div className="col-6">
    <div className={picked ? 'product-container picked' : 'product-container'}>
      <div onClick={onProductSelect} className="checkbox">
        {picked ? '-' : '+'}
      </div>
      <div className="product">
        <div
          className="product-image"
          style={{backgroundImage: `url(${info.image})`}}
        />
        <div className="product-info">
          <div className="d-flex flex-column" style={{width: '80%'}}>
            <div>
              <NavLink
                to={`/${info.id}`}
                class="product-name"
                style={{width: 'calc(100% - 35px)'}}
              >
                {info.name}
              </NavLink>
            </div>
            <div>
              <div className="product-quantity">quantity:{info.quantity}</div>
              <div className="product-reviews">
                {info.reviewIds.length || 'оставьте первый отзыв'}
              </div>
            </div>
          </div>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{width: '15%'}}
          >
            <div className="product-price">{info.price}$</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
