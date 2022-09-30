import React from "react";

class CartProductAddRemove extends React.Component {
    render() {
        const {
            product, 
            addProductToCart, 
            removeProductFromCart, 
        } = this.props;
        return(
            <div className="cart-product-add-remove">
                <div onClick={() => addProductToCart(product)} className="cart-product-add-button">+</div>
                <p>{product.qty}</p>
            <div onClick={() => removeProductFromCart(product.id)} className="cart-product-remove-button">-</div>
        </div>
        )
    };
};

export default CartProductAddRemove;