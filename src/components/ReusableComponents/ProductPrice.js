import React from 'react';
import {withRouter} from 'react-router-dom';

class ProductPrice extends React.Component {
    render() {
        const slug = this.props.history.location.pathname.substring(1);
        const {
            product, 
            currencyLabel, 
            myBagVisibility,
            productPriceNameVisibilityStyle
        } = this.props;
        return(
            <div className="product-price-container">
            <h3 style={productPriceNameVisibilityStyle(slug, myBagVisibility)}>Price:</h3>
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

/*
                            display: currencyLabel === price.currency.label ? "block" : "none",
                            */