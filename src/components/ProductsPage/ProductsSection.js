import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import CategorySection from './CategorySection';
import ProductBox from './ProductBox';

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

class ProductsSection extends React.Component {
    render() {
      const categoryOfProduct = this.props.categoryOfProduct;
      const currency = this.props.currency;

        return(
          <section className="products-section">
            <Query query={products}>
                  {({loading, data}) => {
                      if (loading) return "Loading...";
                      console.log(data);
                      const products = data.category.products; 
                          return products.filter(product => {
                              return categoryOfProduct !== "all" ? product.category === categoryOfProduct : product
                          }).map(product => {
                              return(
                                <ProductBox product={product} currency={currency} key={product.id} />
                              )
                          })

                  }}
              </Query>
          </section>
        )
    }
}

export default ProductsSection;