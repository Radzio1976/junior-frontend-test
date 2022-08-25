import React from 'react';

import LeftNav from './LeftNav';
import Logo from './Logo';
import RightNav from './RightNav';

import './Header.css';

class Header extends React.Component {
    render() {
        const changeCategory = this.props.changeCategory;
        const changeCurrency = this.props.changeCurrency;
        const currency = this.props.currency;
        return(
            <header>
                <LeftNav changeCategory={changeCategory} />
                <Logo />
                <RightNav currency={currency} changeCurrency={changeCurrency} />
            </header>
        )
    }
}

export default Header;