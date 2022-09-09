import React from 'react';

import LeftNav from './LeftNav';
import Logo from './Logo';
import RightNav from './RightNav';

import './Header.css';

class Header extends React.Component {
    render() {
        const {sortProductsByCategory, categoryOfProduct, changeCurrency, currency, currencySymbol, cart} = this.props;
        return(
            <header id="Header">
                <LeftNav sortProductsByCategory={sortProductsByCategory} categoryOfProduct={categoryOfProduct} />
                <Logo />
                <RightNav currency={currency} currencySymbol={currencySymbol} changeCurrency={changeCurrency} cart={cart} />
            </header>
        )
    }
}

export default Header;