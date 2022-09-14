import React from 'react';

class ProductAttributes extends React.Component {
    render() {
        const {
            product, 
            chooseProductAttribute, 
            chosenProductAttributes
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
                                            className="product-attribute-value" 
                                            style={{
                                                    backgroundColor: attr.name !== "Color" && chosenProductAttributes.find(el => el.value === value.value && el.name === attr.name) ? "black" : attr.name === "Color" ? `${value.value}` : "white",
                                                    color: chosenProductAttributes.find(el => el.value === value.value && el.name === attr.name) ? "white" : "black",
                                                    border: attr.name === "Color" && chosenProductAttributes.find(el => el.value === value.value) ? "2px solid black" : "1px solid black"
                                            }}
                                            onClick={() => chooseProductAttribute({product, attr, value})}
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

export default ProductAttributes;