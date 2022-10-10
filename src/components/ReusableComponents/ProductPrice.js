import React from 'react';
import {withRouter} from 'react-router-dom';

import "./DynamicCSSClasses.css";

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
            <h3 className={`${slug === "cart" ? "product-price-container-name-visibility-hidden product-price-container-name-height product-price-container-name-margin-bottom-0px" : "product-price-container-name-visibility-visible product-price-container-name-margin-bottom-10px"} ${myBagVisibility === true ? "product-price-container-name-display-none" : ""}`}
            >Price:</h3>
            {
            product.prices.map((price, i) => {
                    return(
                        <React.Fragment key={i}>
                        {currencyLabel === price.currency.label ? <h3 className="product-price-symbol-and-amount" key={i}>{price.currency.symbol}{product.qty !== undefined ? (price.amount * product.qty).toFixed(2) : price.amount.toFixed(2)}</h3> : null}
                        </React.Fragment>
                    )
                })
            }
        </div>
        )
    };
};

export default withRouter(ProductPrice);