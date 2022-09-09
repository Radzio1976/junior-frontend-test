import React from 'react';

import ProductBrand from '../ReusableComponents/ProductBrand';
import ProductName from '../ReusableComponents/ProductName';
import ProductAttributes from '../ReusableComponents/ProductAttributes';
import ProductPrice from '../ReusableComponents/ProductPrice';

class ProductDescription extends React.Component {
    render() {
        const {product, currencyLabel, chooseProductAttribute, chosenProductAttributes, addProductToCart} = this.props;


        return(
            <div className="product-description-container">
                <ProductBrand product={product} />
                <ProductName product={product} />
                <ProductAttributes product={product} chooseProductAttribute={chooseProductAttribute} chosenProductAttributes={chosenProductAttributes} />
                <ProductPrice product={product} currencyLabel={currencyLabel} />
                <div className="product-add-to-cart-button-container">
                    {product.inStock === true ? <button onClick={() => addProductToCart(product)}>Add to cart</button> : null}
                </div>
                <div className="product-desc-container" dangerouslySetInnerHTML={{__html: product.description}}>
                </div>
            </div>
        )
    };
};

export default ProductDescription;
