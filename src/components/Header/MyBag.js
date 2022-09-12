import React from 'react';

import ProductBrand from '../ReusableComponents/ProductBrand';
import ProductName from '../ReusableComponents/ProductName';
import ProductPrice from '../ReusableComponents/ProductPrice';
import ProductAttributes from '../ReusableComponents/ProductAttributes';
import CartProductAddRemove from '../ReusableComponents/CartProductAddRemove';
import CartProductImages from '../ReusableComponents/CartProductImages';

class MyBag extends React.Component {
    render() {
        const {
            cart, 
            total, 
            currencyLabel, 
            currencySymbol, 
            chooseProductAttribute, 
            chosenProductAttributes,
            addProductToCart, 
            removeProductFromCart, 
            uniqueProductsInCart, 
            inCartProductsQty, 
            displayedImages,
            prevProductImage,
            nextProductImage
        } = this.props;
        return(
            <div className="my-bag">
                <div className="my-bag-title-container">
                    <h2>My bag. <span>{cart.length} items</span></h2>
                </div>
                <div className="cart-products-container">
                    {
                        uniqueProductsInCart().map((product, productIndex) => {
                            return(
                                <div key={product.id} className="my-bag-product-box">
                                    <div className="my-bag-product-description">
                                        <ProductBrand product={product} />
                                        <ProductName product={product} />
                                        <ProductPrice product={product} currencyLabel={currencyLabel} />
                                        <ProductAttributes 
                                        product={product} 
                                        chooseProductAttribute={chooseProductAttribute} 
                                        chosenProductAttributes={chosenProductAttributes}
                                        />
                                    </div>
                                    <div className="my-bag-product-images-and-add-remove">
                                        <CartProductAddRemove 
                                            product={product}
                                            addProductToCart={addProductToCart}
                                            removeProductFromCart={removeProductFromCart}
                                            inCartProductsQty={inCartProductsQty} 
                                        />
                                        <CartProductImages
                                            product={product} 
                                            productIndex={productIndex}
                                            displayedImages={displayedImages}
                                            prevProductImage={prevProductImage}
                                            nextProductImage={nextProductImage}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="my-bag-summary-container">
                    <p>Total: <span>{currencySymbol}{total.toFixed(2)}</span></p>
                </div>
            </div>
        )
    };
};

export default MyBag;