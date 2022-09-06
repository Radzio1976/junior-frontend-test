import React from 'react';
import {withRouter} from 'react-router-dom';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import ProductImages from './ProductImages';
import ProductDescription from './ProductDescription';

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
      const {currencyLabel, changeProductMainImageURL, productMainImageURL, chooseProductAttribute, addProductToCart} = this.props;
        return(
          <Query query={GET_PRODUCT} variables={{id}}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error! ${error}`;
            const product = data.product;
            console.log(product);
            return (
              <div id="ProductBox" style={{display: "flex"}}>
              <ProductImages product={product} changeProductMainImageURL={changeProductMainImageURL} productMainImageURL={productMainImageURL} />
              <ProductDescription product={product} currencyLabel={currencyLabel} chooseProductAttribute={chooseProductAttribute} addProductToCart={addProductToCart} />
            </div>
            );
          }}
        </Query>
      )
  };
};

export default withRouter(ProductPage);