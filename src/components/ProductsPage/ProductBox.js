import React from 'react';
import {withRouter} from 'react-router-dom';

class ProductBox extends React.Component {
    render() {
        const {
          product, 
          currencyLabel, 
          index, 
          resetProductMainImageURL
        } = this.props;
        return(
            <div 
              className={`product-box ${index % 3 === 0 ? "product-box-left-column-margin" : index % 3 === 1 ? "product-box-middle-column-margin" : index % 3 === 2 ? "product-box-right-column-margin" : null}`}
              key={product.id} 
              onClick={
                () => {
                  this.props.history.push(`/product/${product.id}`);
                  resetProductMainImageURL();
                  }}>
            <div className="product-image-container">
              {product.inStock === false ? <p className="product-out-of-stock">out of stock</p> : null}
              <img className={product.inStock === false ? "product-image-container-image-opacity-on" : "product-image-container-image-opacity-off"} src={product.gallery[0]} alt={product.name} />
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