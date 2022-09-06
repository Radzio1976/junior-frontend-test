import React from 'react';

import CategorySection from './CategorySection';
import ProductsSection from './ProductsSection';

class ProductsPage extends React.Component {
    render() {
      const {products, categoryOfProduct, currencyLabel} = this.props;
        return(
        <div id="ProductsPage">
          <CategorySection categoryOfProduct={categoryOfProduct} />
          <ProductsSection products={products} categoryOfProduct={categoryOfProduct} currencyLabel={currencyLabel} />
        </div>
        )
    };
};

export default ProductsPage;