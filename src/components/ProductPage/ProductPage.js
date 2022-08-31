import React from 'react';
import {withRouter} from 'react-router-dom';
import gql from "graphql-tag";
import { client } from '../../App';

import ProductImages from './ProductImages';

class ProductPage extends React.Component {
    state = {
        product: {}
    }

    componentDidMount() {
        const id = this.props.history.location.pathname.substring(9);

        const query = gql`
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
        }`
        
        client.query({
          query: query,
          variables: {
            id
          }
      })
      .then((result) => {
        this.setState({
          product: result.data.product
        })
      });
    }

    render() {
        console.log(this.state.product)
        return(
            <div className="ProductBox">

                <div className="product-description-container">
                  <p key={this.state.product.id}>{this.state.product.id}</p>
                </div>
            </div>
        )
    }
}

export default withRouter(ProductPage);