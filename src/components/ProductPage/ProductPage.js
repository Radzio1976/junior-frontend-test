import React from 'react';
import {withRouter} from 'react-router-dom';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import ProductImages from './ProductImages';

const GET_PRODUCT = gql`
query getProduct ($id: String!) {
  product(id: $id) {
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
      items {
        displayValue
        value
        id
      }
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
`

class ProductPage extends React.Component {    
    render() {
      const id = this.props.history.location.pathname.substring(9);
        return(
          <Query query={GET_PRODUCT} variables={{id}}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error! ${error}`;
            const product = data.product;
            console.log(product);
            return (
              <div className="ProductBox">
              <ProductImages item={product} />
                <div className="product-description-container">
                  <p key={product.id}>{product.id}</p>
                </div>
            </div>
            );
          }}
        </Query>
        )
}
}

export default withRouter(ProductPage);