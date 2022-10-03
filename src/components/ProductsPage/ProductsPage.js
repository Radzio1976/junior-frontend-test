import React from 'react';
import './ProductsPage.css';

import CategorySection from './CategorySection';
import ProductsSection from './ProductsSection';

class ProductsPage extends React.Component {
    render() {
      const {
        categoryOfProduct, 
        currencyLabel, 
        resetProductMainImageURL,
        productMarginsStyle,
        productBoxImageOpacityStyle
      } = this.props;
        return(
        <div id="ProductsPage">
          <CategorySection categoryOfProduct={categoryOfProduct} />
          <ProductsSection 
            categoryOfProduct={categoryOfProduct} 
            currencyLabel={currencyLabel} 
            resetProductMainImageURL={resetProductMainImageURL}
            productMarginsStyle={productMarginsStyle} 
            productBoxImageOpacityStyle={productBoxImageOpacityStyle}
          />
        </div>
        )
    };
};

export default ProductsPage;