import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import CategorySection from './CategorySection';
import ProductsSection from './ProductsSection';

const products = gql`
    query MyQuery {
      category {
        products {
          id
          name
          inStock
          gallery
          description
          category
          attributes {
            id
            name
            type
          }
          prices {
            currency {
              label
              symbol
            }
            amount
          }
          brand
        }
      }
    }`

class ProductsPage extends React.Component {
    render() {
      const categoryOfProduct = this.props.categoryOfProduct;
      const currency = this.props.currency;
        return(
        <div id="ProductsPage">
          <CategorySection categoryOfProduct={categoryOfProduct} />
          <ProductsSection categoryOfProduct={categoryOfProduct} currency={currency} />
        </div>
        )
    }
}

export default ProductsPage;