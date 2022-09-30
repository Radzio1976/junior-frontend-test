import React from "react";

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
                            <div className="cart-product-image-prev-next-button" style={{
                                display: imageIndex === displayedImages[productIndex] ? "flex" : "none",
                                visibility: array.length > 1 ? "visible" : "hidden"
                            }}>
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