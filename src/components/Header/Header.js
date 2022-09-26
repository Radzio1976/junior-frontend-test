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
            total, 
            chooseProductAttribute, 
            chosenProductAttributes,
            addProductToCart, 
            removeProductFromCart, 
            uniqueProductsInCart, 
            inCartProductsQty, 
            displayedImages,
            prevProductImage,
            nextProductImage
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
                total={total}
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
                />
            </header>
        )
    }
}

export default Header;