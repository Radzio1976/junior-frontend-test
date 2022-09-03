import React from 'react';

import ProductBrand from '../ReusableComponents/ProductBrand';
import ProductName from '../ReusableComponents/ProductName';

class ProductDescription extends React.Component {
    render() {
        const product = this.props.product;
        const currency = this.props.currency;
        const chooseProductAttribute = this.props.chooseProductAttribute;
        const addProductToCart = this.props.addProductToCart;

        return(
            <div className="product-description-container">
                <ProductBrand product={product} />
                <ProductName product={product} />
                <div className="product-attributes-container">
                    {
                        product.attributes.slice(0).reverse().map((attr, i) => {
                            return(
                                <div key={attr.id} className="product-attribute-container">
                                    <p>{attr.name}:</p>
                                    <div className="product-attribute-values">
                                        {
                                            attr.items.map(value => {
                                                return(
                                                    <div 
                                                    key={value.id} 
                                                    className="product-attribute-value" 
                                                    style={{
                                                            backgroundColor: `${value.value}`,
                                                            width: "30px",
                                                            height: "30px"
                                                    }}
                                                    onClick={() => chooseProductAttribute({attr, value})}
                                                    >
                                                        {attr.name !== "Color" ? <p>{value.displayValue}</p> : ""}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="product-price-container">
                    <h3>Price:</h3>
                    {
                    product.prices.map((price, i) => {
                            return(
                                <h3 key={i} style={{display: currency === price.currency.label ? "block" : "none"}}>{price.currency.symbol}{price.amount}</h3>
                            )
                        })
                    }
                </div>
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
