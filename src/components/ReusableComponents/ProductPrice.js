import React from 'react';
import {withRouter} from 'react-router-dom';

class ProductPrice extends React.Component {
    render() {
        const slug = this.props.history.location.pathname.substring(1);
        const {
            product, 
            currencyLabel, 
            myBagVisibility
        } = this.props;
        return(
            <div className="product-price-container">
            <h3 style={{
                visibility: slug === "cart" ? "hidden" : "visible",
                height: slug === "cart" ? "0" : "",
                marginBottom: slug === "cart" ? "0" : "10px",
                display: myBagVisibility === true ? "none" : "block", 
                }}>Price:</h3>
            {
            product.prices.map((price, i) => {
                    return(
                        <h3 className="product-price-symbol-and-amount" key={i} style={{
                            display: currencyLabel === price.currency.label ? "block" : "none",
                            paddingTop: "12px",
                            paddingBottom: "12px"
                        }}>{price.currency.symbol}{price.amount * product.qty}</h3>
                    )
                })
            }
        </div>
        )
    };
};

export default withRouter(ProductPrice);