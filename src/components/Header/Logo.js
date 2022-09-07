import React from 'react';
import { withRouter } from 'react-router-dom';
import LogoImage from '../../images/logo.png'

import './Header.css';

class Logo extends React.Component {
    render() {
        return(
            <div className="logo">
            <img src={LogoImage} alt="Logo" onClick={() => this.props.history.push("/")} />
        </div>
        )
    };
};

export default withRouter(Logo);