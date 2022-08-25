import React from 'react';

import LeftNav from './LeftNav';
import Logo from './Logo';
import RightNav from './RightNav';

import './Header.css';

class Header extends React.Component {
    render() {
        const changeCategory = this.props.changeCategory;
        return(
            <header>
                <LeftNav changeCategory={changeCategory} />
                <Logo />
                <RightNav />
            </header>
        )
    }
}

export default Header;