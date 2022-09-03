import React from 'react';

import ProductBrand from '../ReusableComponents/ProductBrand';
import ProductName from '../ReusableComponents/ProductName';
import ProductAttributes from '../ReusableComponents/ProductAttributes';
import ProductPrice from '../ReusableComponents/ProductPrice';

class ProductDescription extends React.Component {
    render() {
        const product = this.props.product;
        const currencyLabel = this.props.currencyLabel;
        const chooseProductAttribute = this.props.chooseProductAttribute;
        const addProductToCart = this.props.addProductToCart;

        return(
            <div className="product-description-container">
                <ProductBrand product={product} />
                <ProductName product={product} />
                <ProductAttributes product={product} chooseProductAttribute={chooseProductAttribute} />
                <ProductPrice product={product} currencyLabel={currencyLabel} />
                <div className="product-add-to-cart-button-container">
                    <button onClick={() => addProductToCart(product)}>Add to cart</button>
                </div>
                <div className="product-desc-container" dangerouslySetInnerHTML={{__html: product.description}}>
                </div>
            </div>
        )
    }
};

export default ProductDescription;
