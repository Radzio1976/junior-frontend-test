import React from 'react';

class ProductImages extends React.Component {
    render() {
        const item = this.props.item;
            console.log(item);

        return(
            <div className="product-images-container" style={{display: "flex", width: "60%"}}>
            <div className="product-thumbnails-container" style={{width: "87px"}}>
                {
                    item.gallery.map((image, i) => {
                        return(
                            <img key={i} src={image} alt={item.name} style={{width: "100%"}} />
                        )
                    })
                }
            </div>
            <div className="product-main-image-container" style={{width: "559px"}}>
                <img src={item.gallery[0]} alt={item.name} style={{width: "100%"}} />
            </div>
        </div>
        )
    }
};

export default ProductImages;