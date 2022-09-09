import React from 'react';
import {withRouter} from 'react-router-dom';

class ProductPrice extends React.Component {
    render() {
        const slug = this.props.history.location.pathname.substring(1);
        const {product, currencyLabel} = this.props;
        return(
            <div className="product-price-container">
            <h3 style={{
                display: slug !== "cart" ? "block" : "none", 
                marginBottom: "10px"
                }}>Price:</h3>
            {
            product.prices.map((price, i) => {
                    return(
                        <h3 key={i} style={{
                            display: currencyLabel === price.currency.label ? "block" : "none",
                            paddingTop: "12px",
                            paddingBottom: "12px"
                        }}>{price.currency.symbol}{price.amount}</h3>
                    )
                })
            }
        </div>
        )
    };
};

export default withRouter(ProductPrice);