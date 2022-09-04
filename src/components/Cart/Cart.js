import React from 'react';

import ProductBrand from '../ReusableComponents/ProductBrand';
import ProductName from '../ReusableComponents/ProductName';
import ProductPrice from '../ReusableComponents/ProductPrice';
import ProductAttributes from '../ReusableComponents/ProductAttributes';

class Cart extends React.Component {
    render() {
        const cart = this.props.cart;
        const total = this.props.total;
        const currencyLabel = this.props.currencyLabel
        const currencySymbol = this.props.currencySymbol;
        const chooseProductAttribute = this.props.chooseProductAttribute;
        const uniqueProductsInCart = this.props.uniqueProductsInCart;
        return(
            <div id="Cart">
                <div className="cart-title-container">
                    <h3>Cart</h3>
                </div>
                <div className="cart-products-container">
                    {
                        uniqueProductsInCart().map(product => {
                            return(
                                <div key={product.id} className="cart-product-box">
                                    <div className="cart-product-description">
                                        <ProductBrand product={product} />
                                        <ProductName product={product} />
                                        <ProductPrice product={product} currencyLabel={currencyLabel} />
                                        <ProductAttributes product={product} chooseProductAttribute={chooseProductAttribute} />
                                    </div>
                                    <div className="cart-product-images-and-add-remove">
                                        <div className="cart-product-add-remove">
                                            <p>Add</p>
                                            <p>Qty</p>
                                            <p>Remove</p>
                                        </div>
                                        <div className="cart-product-images">

                                        </div>                                       
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="cart-summary-container">
                    <p>Tax 21%: {currencySymbol}{(total * 0.21).toFixed(2)}</p>
                    <p>Quantity: {cart.length}</p>
                    <p>Total: {currencySymbol}{total.toFixed(2)}</p>
                </div>
            </div>
        )
    }
}

export default Cart;