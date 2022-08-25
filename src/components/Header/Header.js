import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import LeftNav from './LeftNav';

import './Header.css';
import Basket from '../../images/basket.png';

const productsCategories = gql`
query ProductsCategories {
	categories {
    name
  }
}
`

const currencies = gql`
query Currencies {
	currencies {
    label
    symbol
  }
}
`

class Header extends React.Component {
    constructor(props) {
        super(props);
      }
    render() {
        const changeCategory = this.props.changeCategory;
        return(
            <header>
                <LeftNav changeCategory={changeCategory} />
                <div className="logo">
                    <h1>Logo</h1>
                </div>
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
            </header>
        )
    }
}

export default Header;