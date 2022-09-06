import React from 'react';

class ProductName extends React.Component {
    render() {
        const product = this.props.product;
        return(
            <div className="product-name-container">
                <h3>{product.name}</h3>
            </div>
        )
    };
};

export default ProductName;