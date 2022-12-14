import React from 'react';

import LeftNav from './LeftNav';
import Logo from './Logo';
import RightNav from './RightNav';

import './Header.css';

class Header extends React.Component {
    render() {
        const {
            sortProductsByCategory, 
            categoryOfProduct, 
            resetProductsCategory,
            changeCurrency, 
            currency, 
            currencyLabel,
            currencySymbol, 
            showMyBag, 
            myBagVisibility, 
            cart,
            productsInCartQty,
            total, 
            addProductFromCartOrMyBag,
            removeProductFromCartOrMyBag, 
            displayedImages,
            prevProductImage,
            nextProductImage,
            cartAndMyBagAttributesStyle
        } = this.props;
        return(
            <header id="Header">
                <LeftNav 
                    sortProductsByCategory={sortProductsByCategory} 
                    categoryOfProduct={categoryOfProduct} 
                />
                <Logo resetProductsCategory={resetProductsCategory} />
                <RightNav 
                    currency={currency} 
                    currencyLabel={currencyLabel}
                    currencySymbol={currencySymbol} 
                    changeCurrency={changeCurrency} 
                    cart={cart} 
                    productsInCartQty={productsInCartQty}
                    total={total}
                    showMyBag={showMyBag} 
                    myBagVisibility={myBagVisibility}
                    displayedImages={displayedImages}
                    addProductFromCartOrMyBag={addProductFromCartOrMyBag}
                    removeProductFromCartOrMyBag={removeProductFromCartOrMyBag}
                    prevProductImage={prevProductImage}
                    nextProductImage={nextProductImage}
                    cartAndMyBagAttributesStyle={cartAndMyBagAttributesStyle}
                />
            </header>
        )
    }
}

export default Header;