import React from 'react';

import ProductBox from './ProductBox';

class ProductsSection extends React.Component {
    render() {
      const {products, currencyLabel, productStyle} = this.props;
        return(
          <section className="products-section">
            {
              products.map((product, index) => {
                return(
                  <ProductBox product={product} currencyLabel={currencyLabel} index={index} productStyle={productStyle} key={product.id} />
                )
            })
            }
            
          </section>
        )
    };
};

export default ProductsSection;