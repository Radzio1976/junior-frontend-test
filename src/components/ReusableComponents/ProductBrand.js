import React from 'react';

class ProductBrandContainer extends React.Component {
    render() {
        const product = this.props.product;
        return(
            <div className="product-brand-container">
                <h3>{product.brand}</h3>
            </div>
        )
    }
};

export default ProductBrandContainer;