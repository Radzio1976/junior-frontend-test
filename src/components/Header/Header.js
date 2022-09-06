import React from 'react';

import LeftNav from './LeftNav';
import Logo from './Logo';
import RightNav from './RightNav';

import './Header.css';

class Header extends React.Component {
    render() {
        const {sortProductsByCategory, changeCurrency, currency, currencySymbol} = this.props;
        return(
            <header id="Header">
                <LeftNav sortProductsByCategory={sortProductsByCategory} />
                <Logo />
                <RightNav currency={currency} currencySymbol={currencySymbol} changeCurrency={changeCurrency} />
            </header>
        )
    }
}

export default Header;