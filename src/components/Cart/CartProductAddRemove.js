import React from "react";
import PlusImage from '../../images/plus.png';
import MinusImage from '../../images/minus.png';

class CartProductAddRemove extends React.Component {
    render() {
        const {product, addProductToCart, removeProductFromCart, inCartProductsQty} = this.props;
        return(
            <div className="cart-product-add-remove">
                <div onClick={() => addProductToCart(product)} className="cart-product-add-button">+</div>
                <p>{inCartProductsQty(product.id)}</p>
            <div onClick={() => removeProductFromCart(product.id)} className="cart-product-remove-button">-</div>
        </div>
        )
    };
};

export default CartProductAddRemove;