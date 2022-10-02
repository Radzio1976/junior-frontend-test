import React from 'react';
import { withRouter } from 'react-router-dom';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import './Header.css';
import MyBag from './MyBag';
import Basket from '../../images/basket.png';

const CURRENCIES = gql`
query Currencies {
	currencies {
    label
    symbol
  }
}
`

class RightNav extends React.Component {
    render() {
        const slug = this.props.location.pathname.substring(1, 5);
        const {
            changeCurrency, 
            currency, 
            currencyLabel,
            currencySymbol, 
            showMyBag, 
            myBagVisibility, 
            cart, 
            productsInCartQty,
            total,
            displayedImages,
            addProductFromCartOrMyBag,
            removeProductFromCartOrMyBag,
            prevProductImage,
            nextProductImage
        } = this.props;
        return(
            <nav className="right-nav">
                <div className="currency-switch">
                    <select type="text" name="currency" onChange={(e) => changeCurrency(e.target.name, e.target.value)} value={currency} >
                        <Query query={CURRENCIES}>
                            {({loading, error, data}) => {
                                if (loading) return null;
                                if (error) return `Error! ${error}`;
                                const currencies = data.currencies;
                                return currencies.map((currency, i) => {
                                    return(
                                        <option key={i} value={`${currency.label}${currency.symbol}`}>{currency.symbol}</option>
                                    )
                                })
                            }}
                        </Query>
                    </select>
                </div>
                <div className="cart-icon" onClick={() => showMyBag(slug)}>
                    {productsInCartQty > 0 ?<p className="products-quantity-icon">{productsInCartQty}</p> : null}
                    <img src={Basket} alt="basket" />
                </div>
                {myBagVisibility ?
                <MyBag 
                cart={cart}
                total={total}
                slug={slug}
                showMyBag={showMyBag}
                myBagVisibility={myBagVisibility}
                displayedImages={displayedImages}
                addProductFromCartOrMyBag={addProductFromCartOrMyBag}
                removeProductFromCartOrMyBag={removeProductFromCartOrMyBag}
                prevProductImage={prevProductImage}
                nextProductImage={nextProductImage}
                currencyLabel={currencyLabel}
                currencySymbol={currencySymbol}
                /> : null}
            </nav>
        )
    };
};

export default withRouter(RightNav);