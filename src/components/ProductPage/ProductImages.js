import React from 'react';

class ProductImages extends React.Component {
    render() {
        const product = this.props.product;
        const changeProductMainImageURL = this.props.changeProductMainImageURL;
        const productMainImageURL = this.props.productMainImageURL;

        return(
            <div className="product-images-container" style={{display: "flex", width: "60%"}}>
            <div className="product-thumbnails-container" style={{width: "87px"}}>
                {
                    product.gallery.map((image, i) => {
                        return(
                            <img onClick={() => changeProductMainImageURL(image)} key={i} src={image} alt={product.name} style={{width: "100%"}} />
                        )
                    })
                }
            </div>
            <div className="product-main-image-container" style={{width: "559px"}}>
                <img src={productMainImageURL === "" ? product.gallery[0] : productMainImageURL} alt={product.name} style={{width: "100%"}} />
            </div>
        </div>
        )
    }
};

export default ProductImages;