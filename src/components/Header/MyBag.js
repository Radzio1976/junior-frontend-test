import React from 'react';
import { withRouter } from 'react-router-dom';

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
            slug,
            showMyBag,
            myBagVisibility,
            currencyLabel, 
            currencySymbol, 
            chooseProductAttribute, 
            chosenProductAttributes,
            addProductToCart, 
            removeProductFromCart, 
            displayedImages,
            prevProductImage,
            nextProductImage
        } = this.props;
        return(
            <div className="my-bag">
                <div className="my-bag-title-container">
                    <h2>My bag, <span>{cart.length} item{`${cart.length === 1 ? "" : "s"}`}</span></h2>
                </div>
                <div className="cart-products-container">
                    {
                        cart.map((product, productIndex) => {
                            return(
                                <div key={productIndex} className="my-bag-product-box">
                                    <div className="my-bag-product-description">
                                        <ProductBrand product={product} />
                                        <ProductName product={product} />
                                        <ProductPrice product={product} currencyLabel={currencyLabel} myBagVisibility={myBagVisibility} />
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
                <div className="my-bag-view-bag-and-check-out-buttons">
                    <button className="my-bag-view-bag-button" onClick={() => {
                        this.props.history.push("/cart");
                        showMyBag(slug);
                        }}>View bag</button>
                    <button className="my-bag-check-out-button">Check out</button>
                </div>
            </div>
        )
    };
};

export default withRouter(MyBag);