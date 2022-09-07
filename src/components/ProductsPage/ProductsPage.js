import React from 'react';
import './ProductsPage.css';

import CategorySection from './CategorySection';
import ProductsSection from './ProductsSection';

class ProductsPage extends React.Component {
    render() {
      const {products, categoryOfProduct, currencyLabel, productStyle} = this.props;
        return(
        <div id="ProductsPage">
          <CategorySection categoryOfProduct={categoryOfProduct} />
          <ProductsSection products={products} categoryOfProduct={categoryOfProduct} currencyLabel={currencyLabel} productStyle={productStyle} />
        </div>
        )
    };
};

export default ProductsPage;