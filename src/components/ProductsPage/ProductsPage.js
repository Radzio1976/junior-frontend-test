import React from 'react';

import CategorySection from './CategorySection';
import ProductsSection from './ProductsSection';

class ProductsPage extends React.Component {
    render() {
      const products = this.props.products;
      const categoryOfProduct = this.props.categoryOfProduct;
      const currency = this.props.currency;
        return(
        <div id="ProductsPage">
          <CategorySection categoryOfProduct={categoryOfProduct} />
          <ProductsSection products={products} categoryOfProduct={categoryOfProduct} currency={currency} />
        </div>
        )
    }
}

export default ProductsPage;