import React from 'react';

class ProductName extends React.Component {
    render() {
        const product = this.props.product;
        return(
            <div className="product-name-container">
                <h4>{product.name}</h4>
            </div>
        )
    };
};

export default ProductName;