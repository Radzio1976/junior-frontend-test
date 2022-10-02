import React from "react";

class CartProductImages extends React.Component {
    render() {
        const {
            product, 
            productIndex, 
            displayedImages, 
            prevProductImage, 
            nextProductImage,
            cartProductImagesStyle
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
                                className="cart-product-image-prev-next-button" 
                                style={cartProductImagesStyle(imageIndex, displayedImages, productIndex, array)}>
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