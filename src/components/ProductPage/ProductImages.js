import React from 'react';

class ProductImages extends React.Component {
    render() {
        const {
            product, 
            changeProductMainImageURL, 
            productMainImageURL
        } = this.props;
        return(
            <div className="product-images-container">
            <div className="product-thumbnails-container">
                {
                    product.gallery.map((image, i) => {
                        return(
                            <img onClick={() => changeProductMainImageURL(image)} key={i} src={image} alt={product.name} />
                        )
                    })
                }
            </div>
            <div className="product-main-image-container">
                <img src={productMainImageURL === "" ? product.gallery[0] : productMainImageURL} alt={product.name} />
            </div>
        </div>
        )
    };
};

export default ProductImages;