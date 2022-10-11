import React from "react";

import "./DynamicCSSClasses.css";

class CartProductImages extends React.Component {
    render() {
        const {
            product, 
            productIndex, 
            displayedImages, 
            prevProductImage, 
            nextProductImage
        } = this.props;
        return(
            <div className="cart-product-images">
                <div className="cart-product-images-wrapper">
                    {
                        product.gallery.map((image, imageIndex, array) => {
                        return(
                            <React.Fragment key={imageIndex}>
                            {imageIndex === displayedImages[productIndex] ? <img src={image} alt={product.id}/> : null}
                            <div 
                                className={`cart-product-image-prev-next-button ${imageIndex !== displayedImages[productIndex] ? "cart-product-image-prev-next-button-display-none" : ""} ${array.length > 1 ? "cart-product-image-prev-next-button-visibility-visible" : "cart-product-image-prev-next-button-visibility-hidden"}`}>
                                <div onClick={() => prevProductImage(imageIndex, productIndex, array)}><span>&#60;</span></div>
                                <div onClick={() => nextProductImage(imageIndex, productIndex, array)}><span>&#62;</span></div>
                            </div>
                        </React.Fragment>
                        )
                    })
                }
            </div>
        </div> 
        )
    };
};

export default CartProductImages;