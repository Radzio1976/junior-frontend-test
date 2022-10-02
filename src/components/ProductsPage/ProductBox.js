import React from 'react';
import {withRouter} from 'react-router-dom';

class ProductBox extends React.Component {
    render() {
        const {
          product, 
          currencyLabel, 
          index, 
          resetProductMainImageURL,
          productMarginsStyle,
          productBoxImageOpacityStyle
        } = this.props;
        return(
            <div 
              className="product-box" 
              key={product.id} 
              onClick={
                () => {
                  this.props.history.push(`/product/${product.id}`);
                  resetProductMainImageURL();
                  }} 
              style={productMarginsStyle(index)}>
            <div className="product-image-container">
              {product.inStock === false ? <p className="product-out-of-stock">out of stock</p> : null}
              <img src={product.gallery[0]} alt={product.name} style={productBoxImageOpacityStyle(product)} />
            </div>
            <div className="product-name-and-price-container">
              <h3>{product.name}</h3>
              {
                product.prices.filter(price => {
                  return price.currency.label === currencyLabel
                }).map((price, i) => {
                  return(
                    <p key={i}>{price.currency.symbol} {price.amount}</p>
                  )
                })
              }
            </div>
          </div>
        )
    };
};

export default withRouter(ProductBox);