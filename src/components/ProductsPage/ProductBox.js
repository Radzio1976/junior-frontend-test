import React from 'react';
import {withRouter} from 'react-router-dom';

class ProductBox extends React.Component {
    render() {
        const product = this.props.product;
        const currencyLabel = this.props.currencyLabel;
        return(
            <div className="product-box" key={product.id} onClick={() => this.props.history.push(`/product/${product.id}`)}>
            <div className="product-image-container">
              <img src={product.gallery[0]} alt={product.name} />
            </div>
            <div className="product-name-and-price-container">
              <p>{product.name}</p>
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
    }
}

export default withRouter(ProductBox);