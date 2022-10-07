import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import ProductBox from './ProductBox';

const GET_PRODUCTS_BY_CATEGORY = gql`
query GetProductsByCategory($input: String!) {
	category(input: {title: $input}) {
    name
    products{
      id
      name
      inStock
      gallery
      prices{
        currency{
          label
          symbol
        }
        amount
      }
    }
  }
}
`

class ProductsSection extends React.Component {
    render() {
      const {
        currencyLabel, 
        categoryOfProduct,
        resetProductMainImageURL,
        productBoxImageOpacityStyle
      } = this.props;
      const input = categoryOfProduct;
        return(
          <Query query={GET_PRODUCTS_BY_CATEGORY} variables={{input}}>
            {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error! ${error}`;
            const productsByCategory = data.category.products;
            return(
              <section className="products-section">
            {
              productsByCategory.map((product, index) => {
                return(
                  <ProductBox 
                    product={product} 
                    currencyLabel={currencyLabel} 
                    index={index} 
                    resetProductMainImageURL={resetProductMainImageURL}
                    productBoxImageOpacityStyle={productBoxImageOpacityStyle}
                    key={product.id} 
                  />
                )
            })
            }
            
          </section>
            )
          }}
          </Query>
        )
    };
};

export default ProductsSection;