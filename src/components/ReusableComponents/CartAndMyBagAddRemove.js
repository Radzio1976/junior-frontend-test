import React from "react";

class CartAndMyBagAddRemove extends React.Component {
    render() {
        const {
            product, 
            productIndex,
            addProductFromProductPage, 
            removeProductFromCart, 
        } = this.props;
        return(
            <div className="cart-product-add-remove">
                <div onClick={() => addProductFromProductPage(product)} className="cart-product-add-button">+</div>
                <p>{product.qty}</p>
            <div onClick={() => removeProductFromCart(productIndex)} className="cart-product-remove-button">-</div>
        </div>
        )
    };
};

export default CartAndMyBagAddRemove;