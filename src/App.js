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
    currency: "",
    currencyLabel: "USD",
    currencySymbol: "$",
    productMainImageURL: "",
    chosenProductAttributes: [],
    cart: [],
    total: 0
  }

  componentDidMount() {
    this.setState({
      cart: JSON.parse(localStorage.getItem("addedProducts")) === null ? [] : JSON.parse(localStorage.getItem("addedProducts"))
    }, () => {
      this.getTotal(this.state.currencyLabel);
    })

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
      [key]: value,
      currencyLabel: value.substring(0, 3),
      currencySymbol: value.substring(3, value.length)
    }, () => {
      this.getTotal(this.state.currencyLabel)
    })
  }

  changeProductMainImageURL = (url) => {
    this.setState({
      productMainImageURL: url
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

  addProductToCart = (product) => {
    const chosenProductAttributes = this.state.chosenProductAttributes;
    if (chosenProductAttributes.length === product.attributes.length) {
      product.chosenAttributes = chosenProductAttributes;

      this.setState({
        cart: JSON.parse(localStorage.getItem("addedProducts")) === null ? [] : JSON.parse(localStorage.getItem("addedProducts"))
    }, () => {
        let cart = this.state.cart;

        if (cart === []) {
            cart.push(product)
            localStorage.setItem("addedProducts", JSON.stringify(cart))
        } else {
            cart.push(product);
            localStorage.setItem("addedProducts", JSON.stringify(cart))
        }

        this.setState({
            cart,
            chosenProductAttributes: []
        })
    })
    } else {
      return
    }
  }

  getTotal = (currencyLabel) => {
    
    const cart = this.state.cart;
    let sum = 0;
    
    cart.forEach(product => {
      sum += product.prices.filter(price => {
        return price.currency.label === currencyLabel
      })[0].amount
    })

    this.setState({
      total: sum
    })
  }

  uniqueProductsInCart = () => {
    let cart = this.state.cart;
    const uniqueProductsInCart = Array.from(new Set(cart.map(product => product.id)))
    .map(id => {
      return cart.find(product => product.id === id)
    })
    return uniqueProductsInCart
  }

  render() {
    console.log(this.state.currencySymbol.length);
    //console.log(this.state.total);
    //console.log(this.state.chosenProductAttributes);
    //console.log(this.state.cart);
    return(
      <ApolloProvider client={client}>
        <div id="App" style={{width: "1440px"}}>
          <BrowserRouter>
            <Header 
              sortProductsByCategory={this.sortProductsByCategory} 
              changeCurrency={this.changeCurrency} 
              currencyLabel={this.state.currencyLabel} 
              currencySymbol={this.state.currencySymbol}
              />
            <Switch>
              <Route path="/" exact component={() => <ProductsPage 
                                                        categoryOfProduct={this.state.categoryOfProduct} 
                                                        currencyLabel={this.state.currencyLabel} 
                                                        products={this.state.products} 
                                                        />} />
              <Route path="/product/:id" component={() => <ProductPage 
                                                            productsMainBase={this.state.productsMainBase} 
                                                            currencyLabel={this.state.currencyLabel} 
                                                            changeProductMainImageURL={this.changeProductMainImageURL} 
                                                            productMainImageURL={this.state.productMainImageURL} 
                                                            chooseProductAttribute={this.chooseProductAttribute}
                                                            addProductToCart={this.addProductToCart}
                                                            />} />
              <Route path="/cart" component={() => <Cart 
                                                      cart={this.state.cart} 
                                                      total={this.state.total} 
                                                      currencyLabel={this.state.currencyLabel}
                                                      currencySymbol={this.state.currencySymbol}
                                                      chooseProductAttribute={this.chooseProductAttribute}
                                                      uniqueProductsInCart={this.uniqueProductsInCart}
                                                       />} />
            </Switch>
          </BrowserRouter>
        </div>
      </ApolloProvider>
    )
  }
}

export default App;
