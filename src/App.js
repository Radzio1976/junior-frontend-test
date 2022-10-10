import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import "./App.css";
import "./index.css";

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
    currency: "",
    currencyLabel: "USD",
    currencySymbol: "$",
    productMainImageURL: "",
    chosenProductAttributes: [],
    myBagVisibility: false,
    cart: [],
    productsInCartQty: 0,
    total: 0,
    displayedImages: [] 
  }

  componentDidMount() {
    this.setState({
      cart: JSON.parse(localStorage.getItem("addedProducts")) === null ? [] : JSON.parse(localStorage.getItem("addedProducts")),
      categoryOfProduct: window.location.pathname.substring(10)
    }, () => {
      this.getProductsInCartQty();
      this.getTotal(this.state.currencyLabel);
      this.getCartImagesIndexes();
    });
  };

  // Functions that supports changing category of products on Products Page
  sortProductsByCategory = (category) => {
    this.setState({
      categoryOfProduct: category
    });
  };

  resetProductsCategory = () => {
    this.setState({
      categoryOfProduct: "all"
    });
  };

  // Function that supports changing currency
  changeCurrency = (key, value) => {
    this.setState({
      [key]: value,
      currencyLabel: value.substring(0, 3),
      currencySymbol: value.substring(3, value.length)
    }, () => {
      this.getTotal(this.state.currencyLabel)
    });
  };

  // Functions that supports changing main product image on Product Page
  changeProductMainImageURL = (url) => {
    this.setState({
      productMainImageURL: url
    });
  };

  resetProductMainImageURL = () => {
    this.setState({
      productMainImageURL: ""
    });
  };

  // Function that supports changing product attributes
  chooseProductAttribute = (value) => {
    let chosenProductAttributes = this.state.chosenProductAttributes;
    let chosenAttributes = chosenProductAttributes;

    const attributesObj = {id: value.product.id, name: value.attr.name, displayValue: value.value.displayValue, value: value.value.value};

    if (chosenAttributes.length === 0) {
      chosenAttributes.push(attributesObj);
    } 

    if ((chosenAttributes.findIndex(el => el.id === value.product.id) !== -1 && chosenAttributes.length > 0)) {
      const index = chosenAttributes.findIndex(el => el.name === attributesObj.name);
      if (index !== -1) {
          chosenAttributes.splice(index, 1);
          chosenAttributes.push(attributesObj);
      } else {
          chosenAttributes.push(attributesObj);
      };
    };

    if ((chosenAttributes.findIndex(el => el.id === value.product.id) === -1 && chosenAttributes.length > 0)) {
      chosenAttributes = [];
      chosenAttributes.push(attributesObj);
    }
   
    this.setState({
        chosenProductAttributes: chosenAttributes
    });      
  };

  // Function which change array of attributes to string
  getAttributesString = (arrayOfAttributes) => {
    let attributesString = "";
    arrayOfAttributes.forEach((attr) => {
      if (attributesString.includes(Object.entries(attr).toString()) === false) {
        attributesString += Object.entries(attr).toString();
      };
    });

    return attributesString;
  };

  // Function that supports adding new product to Cart
  addProductFromProductPage = (product) => {
    const chosenProductAttributes = this.state.chosenProductAttributes;
    const currencyLabel = this.state.currencyLabel;
    if (chosenProductAttributes.length === product.attributes.length) {
      product.chosenAttributes = chosenProductAttributes;

      this.setState({
        cart: JSON.parse(localStorage.getItem("addedProducts")) === null ? [] : JSON.parse(localStorage.getItem("addedProducts"))
    }, () => {
        let cart = this.state.cart;
        const productIndex = cart.map(item => this.getAttributesString(item.chosenAttributes)).indexOf(this.getAttributesString(product.chosenAttributes));

        if (cart === []) {
          product.qty = 1;
            cart.push(product);
            localStorage.setItem("addedProducts", JSON.stringify(cart));
        } else {
          if (productIndex === -1) {
            product.qty = 1;
            cart.push(product);
            localStorage.setItem("addedProducts", JSON.stringify(cart));
          } else {
            cart[productIndex].qty = cart[productIndex].qty + 1;
            localStorage.setItem("addedProducts", JSON.stringify(cart));
          }
        };

        this.setState({
            cart,
            chosenProductAttributes: []
        }, () => {
          this.getCartImagesIndexes();
          this.getProductsInCartQty();
          this.getTotal(currencyLabel);
        });
    });
    } else {
      return
    };
  };

  // Function that supports adding new product to Cart from CartPage or MyBag
  addProductFromCartOrMyBag = (productID) => {
    let {currencyLabel, cart} = this.state;

    let productToAdd = cart.find((product, index) => {
      return index === productID;
    })

    productToAdd.qty = productToAdd.qty + 1;
    localStorage.setItem("addedProducts", JSON.stringify(cart));

    this.setState({
      cart
    }, () => {
      this.getTotal(currencyLabel);
      this.getProductsInCartQty();
    });
  };

  // Function that supports removing product from Cart
  removeProductFromCartOrMyBag = (productID) => {
    let {currencyLabel, cart} = this.state;

    let productToRemove = cart.find((product, index) => {
      return index === productID;
    })

    if (productToRemove.qty > 1) {
      productToRemove.qty = productToRemove.qty - 1;
      localStorage.setItem("addedProducts", JSON.stringify(cart));
    } else {
      cart.splice(productID, 1);
      localStorage.setItem("addedProducts", JSON.stringify(cart));
    }

    this.setState({
      cart
    }, () => {
      this.getTotal(currencyLabel);
      this.getProductsInCartQty();
    })
  };

  // Function which calculate quantity of products added to Cart
  getProductsInCartQty = () => {
    const cart = this.state.cart;
    let productsQuantity = 0;

    cart.forEach(product => {
      productsQuantity += product.qty;
    });

    this.setState({
      productsInCartQty: productsQuantity
    });
  };
  
  // Function that supports updating of total amount of all products in Cart
  getTotal = (currencyLabel) => {
    const cart = this.state.cart;
    let sum = 0;
    
    cart.forEach(product => {
      sum += product.prices.filter(price => {
        return price.currency.label === currencyLabel;
      })[0].amount * product.qty;
    });

    this.setState({
      total: sum
    });
  };

  // Function that creates array with first indexes of every product images
  getCartImagesIndexes = () => {
    const cart = this.state.cart;
    const displayedImages = this.state.displayedImages;

     for (let i=0; i<cart.length; i++) {
        displayedImages.push(0);
     }
     this.setState({
        displayedImages
     });
  };

  // Function that supports back to the previous product image in Cart
  prevProductImage = (imageIndex, productIndex) => {
    let displayedImages = this.state.displayedImages;

    if (imageIndex > 0) {
     displayedImages[productIndex] = imageIndex - 1;

     this.setState({
         displayedImages
     });
    } else return;
  };

  // Function that supports go to the next product image in Cart
  nextProductImage = (imageIndex, productIndex, array) => {
    let displayedImages = this.state.displayedImages;

    if (imageIndex < array.length - 1) {
     displayedImages[productIndex] = imageIndex + 1;

     this.setState({
         displayedImages
     });
    } else return;
  };

  // Function that supports showing of MyBag component
  showMyBag = (slug) => {
    let {cart, myBagVisibility} = this.state;

    if (slug !== "cart" && cart.length > 0) {
      myBagVisibility === false ? myBagVisibility = true : myBagVisibility = false;
    } else {
      myBagVisibility = false;
    };
  
    this.setState({
      myBagVisibility
    });
  };

    // Function that shows which attributes of added product to Cart was selected
    cartAndMyBagAttributesStyle = (product, attr, value) => {
      return {
        backgroundColor: attr.name !== "Color" && product.chosenAttributes.find(el => el.value === value.value && el.name === attr.name) ? "black" : value.value
      };
    };

    // Functon that controls showing which attribute was selected in ProductPage
    productAttributesStyle = (attr, chosenProductAttributes, value) => {
      return {
        backgroundColor: attr.name !== "Color" && chosenProductAttributes.find(el => el.value === value.value && el.name === attr.name) ? "black" : attr.name === "Color" ? value.value : "white"
      };
    };

  render() {
    return(
      <ApolloProvider client={client}>
        <div id="App">
          {this.state.myBagVisibility ? 
          <div className="my-bag-background"
            onClick={
            () => this.showMyBag()}></div> : null}
          <BrowserRouter>
            <Header 
              sortProductsByCategory={this.sortProductsByCategory}
              categoryOfProduct={this.state.categoryOfProduct}
              resetProductsCategory={this.resetProductsCategory}
              changeCurrency={this.changeCurrency} 
              currencyLabel={this.state.currencyLabel} 
              currencySymbol={this.state.currencySymbol}
              showMyBag={this.showMyBag}
              myBagVisibility={this.state.myBagVisibility}
              cart={this.state.cart}
              productsInCartQty={this.state.productsInCartQty}
              total={this.state.total} 
              addProductFromCartOrMyBag={this.addProductFromCartOrMyBag}
              removeProductFromCartOrMyBag={this.removeProductFromCartOrMyBag}
              displayedImages={this.state.displayedImages}
              prevProductImage={this.prevProductImage}
              nextProductImage={this.nextProductImage}
              cartAndMyBagAttributesStyle={this.cartAndMyBagAttributesStyle}
              />
            <Switch>
              <Route path="/" exact component={() => 
                <ProductsPage 
                  categoryOfProduct="all" 
                  currencyLabel={this.state.currencyLabel} 
                  resetProductMainImageURL={this.resetProductMainImageURL}
                  />}
                />
              <Route path={`/category/:${this.state.categoryOfProduct}`} exact component={() => 
                <ProductsPage 
                  categoryOfProduct={this.state.categoryOfProduct} 
                  currencyLabel={this.state.currencyLabel} 
                  resetProductMainImageURL={this.resetProductMainImageURL}
                />} 
              />
              <Route path="/product/:id" component={() => 
                <ProductPage 
                  currencyLabel={this.state.currencyLabel} 
                  changeProductMainImageURL={this.changeProductMainImageURL} 
                  productMainImageURL={this.state.productMainImageURL} 
                  chooseProductAttribute={this.chooseProductAttribute}
                  chosenProductAttributes={this.state.chosenProductAttributes}
                  addProductFromProductPage={this.addProductFromProductPage}
                  productAttributesStyle={this.productAttributesStyle}
                />} 
              />
              <Route path="/cart" exact component={() => 
                <Cart 
                  cart={this.state.cart}
                  productsInCartQty={this.state.productsInCartQty}
                  total={this.state.total} 
                  currencyLabel={this.state.currencyLabel}
                  currencySymbol={this.state.currencySymbol}
                  addProductFromCartOrMyBag={this.addProductFromCartOrMyBag}
                  removeProductFromCartOrMyBag={this.removeProductFromCartOrMyBag}
                  prevProductImage={this.prevProductImage}
                  nextProductImage={this.nextProductImage}
                  displayedImages={this.state.displayedImages}
                  cartAndMyBagAttributesStyle={this.cartAndMyBagAttributesStyle}                  
                />} 
              />
            </Switch>
          </BrowserRouter>
        </div>
      </ApolloProvider>
    )
  };
};

export default App;
