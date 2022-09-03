import React from 'react';

import ProductBrandContainer from '../ReusableComponents/ProductBrandContainer';

class Cart extends React.Component {
    render() {
        const cart = this.props.cart;
        const total = this.props.total;
        const currency = this.props.currency
        return(
            <div id="Cart">
                <div className="cart-title-container">
                    <h3>Cart</h3>
                </div>
                <div className="cart-products-container">
                    {
                        cart.map(product => {
                            return(
                                <div key={product.id} className="cart-product-box">
                                    <div className="cart-product-description">
                                    <ProductBrandContainer product={product} />
                                    <div className="cart-product-name-container">
                                        <h3>{product.name}</h3>
                                    </div>
                                    <div className="cart-product-price-container">
                                        <h3>Price:</h3>
                                        {
                                        product.prices.map((price, i) => {
                                                return(
                                                    <h3 key={i} style={{display: currency === price.currency.label ? "block" : "none"}}>{price.currency.symbol}{price.amount}</h3>
                                                )
                                            })
                                        }
                                    </div>
                                    </div>
                                    <div className="cart-product-image">
                                        
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Cart;