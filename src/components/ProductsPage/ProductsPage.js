import React from 'react';
import './ProductsPage.css';

import CategorySection from './CategorySection';
import ProductsSection from './ProductsSection';

class ProductsPage extends React.Component {
    render() {
      const {
        categoryOfProduct, 
        currencyLabel, 
        productMarginsStyle
      } = this.props;
        return(
        <div id="ProductsPage">
          <CategorySection categoryOfProduct={categoryOfProduct} />
          <ProductsSection 
            categoryOfProduct={categoryOfProduct} 
            currencyLabel={currencyLabel} 
            productMarginsStyle={productMarginsStyle} 
          />
        </div>
        )
    };
};

export default ProductsPage;