import React from 'react';

import ProductBrand from '../ReusableComponents/ProductBrand';
import ProductName from '../ReusableComponents/ProductName';
import ProductPrice from '../ReusableComponents/ProductPrice';
import ProductAttributes from '../ReusableComponents/ProductAttributes';

class Cart extends React.Component {
    render() {
        const {
            cart, 
            total, 
            currencyLabel, 
            currencySymbol, 
            chooseProductAttribute, 
            addProductToCart, 
            removeProductFromCart, 
            uniqueProductsInCart, 
            inCartProductsQty, 
            displayedImages,
            nextProductImage
        } = this.props;

        return(
            <div id="Cart">
                <div className="cart-title-container">
                    <h3>Cart</h3>
                </div>
                <div className="cart-products-container">
                    {
                        uniqueProductsInCart().map((product, productIndex) => {
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
                                            <p onClick={() => addProductToCart(product)}>Add</p>
                                            <p>{inCartProductsQty(product.id)}</p>
                                            <p onClick={() => removeProductFromCart(product.id)}>Remove</p>
                                        </div>
                                        <div className="cart-product-images">
                                            <div className="cart-product-images-wrapper">
                                                {
                                                    product.gallery.map((image, imageIndex, array) => {
                                                        return(
                                                            <React.Fragment key={imageIndex}>
                                                            <img src={image} alt={product.id} style={{
                                                                display: imageIndex === displayedImages[productIndex] ? "block" : "none",
                                                                width: "100px", 
                                                                marginRight: "10px", 
                                                                border: "1px solid black"}} 
                                                            />
                                                            <div className="cart-product-image-prev-next-button" style={{
                                                                display: imageIndex === displayedImages[productIndex] ? "block" : "none"
                                                            }}>
                                                            <p>Prev</p>
                                                            <p onClick={() => nextProductImage(imageIndex, productIndex, array)}>Next</p>
                                                        </div>
                                                        </React.Fragment>
                                                        )
                                                    })
                                                }
                                            </div>
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