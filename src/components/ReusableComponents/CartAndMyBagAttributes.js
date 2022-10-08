import React from 'react';

class CartAndMyBagAttributes extends React.Component {
    render() {
        const {
            product,
            cartAndMyBagAttributesStyle
         } = this.props;
        return(
            <div className="product-attributes-container">
            {
                product.attributes.slice(0).reverse().map((attr, i) => {
                    return(
                        <div key={attr.id} className="product-attribute-container">
                            <p className="product-attribute-name">{attr.name}:</p>
                            <div className="product-attribute-values">
                                {
                                    attr.items.map(value => {
                                        return(
                                            <div 
                                            key={value.id} 
                                            className={`product-attribute-value ${product.chosenAttributes.find(el => el.value === value.value && el.name === attr.name) ? "product-attribute-value-color-white" : ""} ${attr.name === "Color" && product.chosenAttributes.find(el => el.value === value.value) ? "product-attribute-value-border-2px" : ""}`}
                                            style={cartAndMyBagAttributesStyle(product, attr, value)}
                                            >
                                                {attr.name !== "Color" ? <p>{value.value}</p> : ""}
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
    };
};

export default CartAndMyBagAttributes;