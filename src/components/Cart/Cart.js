import React from 'react';
import './Cart.css';

import ProductBrand from '../ReusableComponents/ProductBrand';
import ProductName from '../ReusableComponents/ProductName';
import ProductPrice from '../ReusableComponents/ProductPrice';
import CartAndMyBagAttributes from '../ReusableComponents/CartAndMyBagAttributes';
import CartAndMyBagAddRemove from '../ReusableComponents/CartAndMyBagAddRemove';
import CartProductImages from '../ReusableComponents/CartProductImages';

class Cart extends React.Component {
    render() {
        const {
            cart, 
            total, 
            currencyLabel, 
            currencySymbol, 
            chooseProductAttribute, 
            chosenProductAttributes,
            addProductFromProductPage, 
            removeProductFromCart, 
            displayedImages,
            prevProductImage,
            nextProductImage
        } = this.props;
        console.log(cart);
        return(
            <div id="Cart">
                <div className="cart-title-container">
                    <h2>Cart</h2>
                </div>
                <div className="cart-products-container">
                    {
                        cart.map((product, productIndex) => {
                            return(
                                <div key={productIndex} className="cart-product-box">
                                    <div className="cart-product-description">
                                        <ProductBrand product={product} />
                                        <ProductName product={product} />
                                        <ProductPrice product={product} currencyLabel={currencyLabel} />
                                        <CartAndMyBagAttributes 
                                            product={product} 
                                            chooseProductAttribute={chooseProductAttribute} 
                                            chosenProductAttributes={chosenProductAttributes}
                                        />
                                    </div>
                                    <div className="cart-product-images-and-add-remove">
                                        <CartAndMyBagAddRemove 
                                            product={product}
                                            productIndex={productIndex}
                                            addProductFromProductPage={addProductFromProductPage}
                                            removeProductFromCart={removeProductFromCart}
                                        />
                                        <CartProductImages
                                            product={product} 
                                            productIndex={productIndex}
                                            displayedImages={displayedImages}
                                            prevProductImage={prevProductImage}
                                            nextProductImage={nextProductImage}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="cart-summary-container">
                    <p>Tax 21%: <span>{currencySymbol}{(total * 0.21).toFixed(2)}</span></p>
                    <p>Quantity: <span>{cart.length}</span></p>
                    <p>Total: <span>{currencySymbol}{total.toFixed(2)}</span></p>
                    <button>Order</button>
                </div>
            </div>
        )
    };
};

export default Cart;