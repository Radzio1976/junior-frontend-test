import React from 'react';

import ProductBox from './ProductBox';

class ProductsSection extends React.Component {
    render() {
      const products = this.props.products;
      const currencyLabel = this.props.currencyLabel;

        return(
          <section className="products-section">
            {
              products.map(product => {
                return(
                  <ProductBox product={product} currencyLabel={currencyLabel} key={product.id} />
                )
            })
            }
            
          </section>
        )
    }
}

export default ProductsSection;