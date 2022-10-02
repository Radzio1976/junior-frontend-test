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
        const {
            categoryOfProduct,
            leftNavMenuStyle
        } = this.props;
        return(
            <nav className="left-nav">
            <ul>
                <Query query={GET_PRODUCTS_CATEGORIES}>
                    {({loading, data}) => {
                        if (loading) return "Loading...";
                        const categories = data.categories;
                        return categories.map((category, i) => {
                            return(
                                <li 
                                key={i} 
                                onClick={() => {
                                    this.props.sortProductsByCategory(category.name);
                                    this.props.history.push(`/category/${category.name}`);
                                    }}
                                style={leftNavMenuStyle(categoryOfProduct, category)}><h1>{category.name}</h1></li>
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