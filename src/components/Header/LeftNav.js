import React from 'react';
import {withRouter} from 'react-router-dom';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import './Header.css';

const GET_PRODUCTS_CATEGORIES = gql`
query ProductsCategories {
	categories {
    name
  }
}
`

class LeftNav extends React.Component {
    render() {
        const categoryOfProduct = this.props.categoryOfProduct;
        return(
            <nav className="left-nav">
            <ul>
                <Query query={GET_PRODUCTS_CATEGORIES}>
                    {({loading, data}) => {
                        if (loading) return "Loading...";
                        const categories = data.categories;
                        return categories.map((category, i) => {
                            return(
                                <li className={categoryOfProduct === category.name ? "left-nav-category-of-products-selected" : "left-nav-category-of-products-not-selected"}
                                key={i} 
                                onClick={() => {
                                    this.props.sortProductsByCategory(category.name);
                                    this.props.history.push(`/category/${category.name}`);
                                    }}><h1>{category.name}</h1></li>
                            )
                        })
                    }}
                </Query>
            </ul>
        </nav>
        )
    };
};

export default withRouter(LeftNav);