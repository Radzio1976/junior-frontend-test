import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";

import './Header.css';

const productsCategories = gql`
query ProductsCategories {
	categories {
    name
  }
}
`

class LeftNav extends React.Component {
    render() {
        return(
            <nav className="left-nav">
            <ul>
                <Query query={productsCategories}>
                    {({loading, data}) => {
                        if (loading) return "Loading...";
                        const categories = data.categories;
                        return categories.map((category, i) => {
                            return(
                                <li key={i} onClick={() => this.props.sortProductsByCategory(category.name)}>{category.name}</li>
                            )
                        })
                    }}
                </Query>
            </ul>
        </nav>
        )
    };
};

export default LeftNav;