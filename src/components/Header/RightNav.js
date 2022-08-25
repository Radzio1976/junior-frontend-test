import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import './Header.css';
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
        return(
            <nav className="right-nav">
                <div className="currency-switch">
                    <p className="current-currency">$</p>
                    <select>
                        <Query query={currencies}>
                            {({loading, data}) => {
                                if (loading) return "Loading...";
                                //console.log(data);
                                const currencies = data.currencies;
                                return currencies.map((currency, i) => {
                                    return(
                                        <option key={i}>{currency.symbol} {currency.label}</option>
                                    )
                                })
                            }}
                        </Query>
                    </select>
                </div>
                <div className="cart-icon">
                    <img src={Basket} alt="basket" />
                </div>
            </nav>
        )
    }
}

export default RightNav;