import React from 'react';

import ProductBox from './ProductBox';

class ProductsSection extends React.Component {
    render() {
      const products = this.props.products;
      const currency = this.props.currency;

        return(
          <section className="products-section">
            {
              products.map(product => {
                return(
                  <ProductBox product={product} currency={currency} key={product.id} />
                )
            })
            }
            
          </section>
        )
    }
}

export default ProductsSection;