import React from 'react';

class ProductDescription extends React.Component {
    render() {
        const product = this.props.product;
        const currency = this.props.currency;
        const currencyLabel = currency.slice(currency.length -3, currency.length);
        console.log(currencyLabel)

        return(
            <div className="product-description-container">
            <div className="product-brand-container">
                <h3>{product.brand}</h3>
            </div>
            <div className="product-name-container">
                <h3>{product.name}</h3>
            </div>
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
                                                <div key={value.id} className="product-attribute-value" 
                                                style={{backgroundColor: `${value.value}`,
                                                        width: "30px",
                                                        height: "30px"
                                                }}>
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
                            <h3 key={i} style={{display: currencyLabel === price.currency.label ? "block" : "none"}}>{price.currency.symbol}{price.amount}</h3>
                        )
                    })
                }
            </div>
            <div className="product-add-to-cart-button-container">
                <button>Add to cart</button>
            </div>
            <div className="product-desc-container" dangerouslySetInnerHTML={{__html: product.description}}>
            </div>
          </div>
        )
    }
};

export default ProductDescription;
