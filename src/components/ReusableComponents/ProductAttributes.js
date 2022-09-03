import React from 'react';

class ProductAttributes extends React.Component {
    render() {
        const product = this.props.product;
        const chooseProductAttribute = this.props.chooseProductAttribute;
        return(
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
        )
    }
};

export default ProductAttributes;