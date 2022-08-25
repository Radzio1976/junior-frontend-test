import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { client } from '../../App';

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
    constructor(props) {
        super(props);
      }
    render() {
        return(
        <div>
            <Query query={products}>
                {({loading, data}) => {
                    if (loading) return "Loading...";
                    //console.log(data);
                    const products = data.category.products; 
                        return products.filter(product => {
                            return this.props.categoryOfProduct !== "all" ? product.category === this.props.categoryOfProduct : product
                        }).map(product => {
                            return(
                                <div key={product.id}>
                                    <h1>{product.name}</h1>
                                    <img src={product.gallery[0]} alt={product.name} />
                                </div>
                            )
                        })

                }}
            </Query>
        </div>
        )
    }
}

export default ProductsPage;