import React from "react";

class CartAndMyBagAddRemove extends React.Component {
    render() {
        const {
            product, 
            productIndex,
            addProductFromCartOrMyBag,
            removeProductFromCartOrMyBag, 
        } = this.props;
        return(
            <div className="cart-product-add-remove">
                <div onClick={() => addProductFromCartOrMyBag(productIndex)} className="cart-product-add-button">+</div>
                <p>{product.qty}</p>
            <div onClick={() => removeProductFromCartOrMyBag(productIndex)} className="cart-product-remove-button">-</div>
        </div>
        )
    };
};

export default CartAndMyBagAddRemove;