import React from 'react';

import ProductBox from './ProductBox';

class ProductsSection extends React.Component {
    render() {
      const {products, currencyLabel, productMarginsStyle} = this.props;
        return(
          <section className="products-section">
            {
              products.map((product, index) => {
                return(
                  <ProductBox product={product} currencyLabel={currencyLabel} index={index} productMarginsStyle={productMarginsStyle} key={product.id} />
                )
            })
            }
            
          </section>
        )
    };
};

export default ProductsSection;