import React from "react";

class CartProductAddRemove extends React.Component {
    render() {
        const {product, addProductToCart, removeProductFromCart, inCartProductsQty} = this.props;
        return(
            <div className="cart-product-add-remove">
            <p onClick={() => addProductToCart(product)}>Add</p>
            <p>{inCartProductsQty(product.id)}</p>
            <p onClick={() => removeProductFromCart(product.id)}>Remove</p>
        </div>
        )
    };
};

export default CartProductAddRemove;