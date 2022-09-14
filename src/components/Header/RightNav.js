import React from 'react';
import { withRouter } from 'react-router-dom';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import './Header.css';
import MyBag from './MyBag';
import Basket from '../../images/basket.png';

const currencies = gql`
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
            total,
            uniqueProductsInCart,
            chooseProductAttribute,
            chosenProductAttributes,
            inCartProductsQty,
            displayedImages,
            addProductToCart,
            removeProductFromCart,
            prevProductImage,
            nextProductImage
        } = this.props;
        console.log(myBagVisibility)
        return(
            <nav className="right-nav">
                <div className="currency-switch">
                    <select type="text" name="currency" onChange={(e) => changeCurrency(e.target.name, e.target.value)} value={currency} >
                        <Query query={currencies}>
                            {({loading, data}) => {
                                if (loading) return "Loading...";
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
                    {cart.length > 0 ?<p className="products-quantity-icon">{cart.length}</p> : null}
                    <img src={Basket} alt="basket" />
                </div>
                {myBagVisibility ?
                <MyBag 
                cart={cart}
                total={total}
                slug={slug}
                showMyBag={showMyBag}
                myBagVisibility={myBagVisibility}
                uniqueProductsInCart={uniqueProductsInCart} 
                chosenProductAttributes={chosenProductAttributes} 
                inCartProductsQty={inCartProductsQty} 
                displayedImages={displayedImages}
                chooseProductAttribute={chooseProductAttribute}
                addProductToCart={addProductToCart}
                removeProductFromCart={removeProductFromCart}
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