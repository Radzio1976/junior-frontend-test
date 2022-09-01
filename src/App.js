import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

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
    productsMainBase: [],
    products: [],
    categoryOfProduct: "all",
    currency: "$ USD",
    productMainImageURL: "",
    chosenProductAttributes: [],
    cart: []
  }

  componentDidMount() {
    client
        .query({
          query: gql`
          query GetProduts {
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
          }`,
      })
      .then((result) => {
        this.setState({
          productsMainBase: result.data.category.products,
          products: result.data.category.products
        })
      });
  }

  // Function to change category of products on Products Page
  sortProductsByCategory = (category) => {
    let products = this.state.productsMainBase;
    this.setState({
      categoryOfProduct: category
    }, () => {
      const filteredProducts = products.filter(product => {
        return this.state.categoryOfProduct !== "all" ? product.category === this.state.categoryOfProduct : product
    })
      this.setState({
        products: filteredProducts
      })
    })
  }

  changeCurrency = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  changeProductMainImageURL = (url) => {
    this.setState({
      productMainImageURL: url
    })
  }

  addProductToCart = (product) => {
    const cart = this.state.cart;
    cart.push(product)
    this.setState({
      cart: cart
    })
  }

  chooseProductAttribute = (value) => {
    const chosenAttributes = this.state.chosenProductAttributes;
    
    const attributesObj = {name: value.attr.name, value: value.value.displayValue};
    
    const index = chosenAttributes.findIndex(value => value.name === attributesObj.name);
    if (index !== -1) {
        chosenAttributes.splice(index, 1);
        chosenAttributes.push(attributesObj);
    } else {
        chosenAttributes.push(attributesObj);
    }

    this.setState({
        chosenAttributes
    })        
}

  render() {
    console.log(this.state.chosenProductAttributes);
    return(
      <ApolloProvider client={client}>
        <div id="App" style={{width: "1440px"}}>
          <BrowserRouter>
            <Header 
              sortProductsByCategory={this.sortProductsByCategory} 
              changeCurrency={this.changeCurrency} 
              currency={this.state.currency} 
              />
            <Switch>
              <Route path="/" exact component={() => <ProductsPage 
                                                        categoryOfProduct={this.state.categoryOfProduct} 
                                                        currency={this.state.currency} 
                                                        products={this.state.products} 
                                                        />} />
              <Route path="/product/:id" component={() => <ProductPage 
                                                            productsMainBase={this.state.productsMainBase} 
                                                            currency={this.state.currency} 
                                                            changeProductMainImageURL={this.changeProductMainImageURL} 
                                                            productMainImageURL={this.state.productMainImageURL} 
                                                            chooseProductAttribute={this.chooseProductAttribute}
                                                            addProductToCart={this.addProductToCart}
                                                            />} />
              <Route path="/cart" component={() => <Cart />} />
            </Switch>
          </BrowserRouter>
        </div>
      </ApolloProvider>
    )
  }
}

export default App;
