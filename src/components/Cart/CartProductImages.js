import React from "react";

class CartProductImages extends React.Component {
    render() {
        const {product, productIndex, displayedImages, prevProductImage, nextProductImage} = this.props;
        return(
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
                            <p onClick={() => prevProductImage(imageIndex, productIndex, array)}>Prev</p>
                            <p onClick={() => nextProductImage(imageIndex, productIndex, array)}>Next</p>
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