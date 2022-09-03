import React from 'react';

import CategorySection from './CategorySection';
import ProductsSection from './ProductsSection';

class ProductsPage extends React.Component {
    render() {
      const products = this.props.products;
      const categoryOfProduct = this.props.categoryOfProduct;
      const currencyLabel = this.props.currencyLabel;
        return(
        <div id="ProductsPage">
          <CategorySection categoryOfProduct={categoryOfProduct} />
          <ProductsSection products={products} categoryOfProduct={categoryOfProduct} currencyLabel={currencyLabel} />
        </div>
        )
    }
}

export default ProductsPage;