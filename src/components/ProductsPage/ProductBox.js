import React from 'react';

class ProductBox extends React.Component {
    render() {
        const product = this.props.product;
        const currency = this.props.currency;
        return(
            <div className="product-box" key={product.id}>
            <div className="product-image-container">
              <img src={product.gallery[0]} alt={product.name} />
            </div>
            <div className="product-name-and-price-container">
              <p>{product.name}</p>
              {
                product.prices.filter(price => {
                  return price.currency.symbol === currency.substring(0, currency.indexOf(" "))
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

export default ProductBox;