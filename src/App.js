import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

import Header from './components/Header';
import ProductsPage from './components/ProductsPage';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

class App extends React.Component {
  state = {
    categoryOfProduct: "all",
    currencies: "$ USD"
  }

  changeCategory = (category) => {
    this.setState({
      categoryOfProduct: category
    })
  }

  render() {
    console.log(this.state.categoryOfProduct);
    return(
      <ApolloProvider client={client}>
        <div id="App">
          <Router>
            <Header changeCategory={this.changeCategory} />
            <Routes>
              <Route path="/" element={<ProductsPage categoryOfProduct={this.state.categoryOfProduct} />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Router>
        </div>
      </ApolloProvider>
    )
  }
}

export default App;
