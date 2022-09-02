import React from 'react';

import LeftNav from './LeftNav';
import Logo from './Logo';
import RightNav from './RightNav';

import './Header.css';

class Header extends React.Component {
    render() {
        const sortProductsByCategory = this.props.sortProductsByCategory;
        const changeCurrency = this.props.changeCurrency;
        const currency = this.props.currency;
        const getTotal = this.props.getTotal;
        return(
            <header id="Header">
                <LeftNav sortProductsByCategory={sortProductsByCategory} />
                <Logo />
                <RightNav currency={currency} changeCurrency={changeCurrency} getTotal={getTotal} />
            </header>
        )
    }
}

export default Header;