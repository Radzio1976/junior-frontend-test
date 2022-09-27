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
    total: 0,
    displayedImages: [] 
  }

  componentDidMount() {
    this.setState({
      cart: JSON.parse(localStorage.getItem("addedProducts")) === null ? [] : JSON.parse(localStorage.getItem("addedProducts"))
    }, () => {
      this.getTotal(this.state.currencyLabel);
      this.uniqueProductsInCart();
      this.getCartImagesIndexes();
    })
  };

  // Function that supports changing category of products on Products Page
  sortProductsByCategory = (category) => {
    this.setState({
      categoryOfProduct: category
    })
  };

  resetProductsCategory = () => {
    this.setState({
      categoryOfProduct: "all"
    })
  }

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

  // Function that supports changing main product image on Product Page
  changeProductMainImageURL = (url) => {
    this.setState({
      productMainImageURL: url
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
    }

    if ((chosenAttributes.findIndex(el => el.id === value.product.id) === -1 && chosenAttributes.length > 0)) {
      chosenAttributes = [];
      chosenAttributes.push(attributesObj);
    }
   
    this.setState({
        chosenProductAttributes: chosenAttributes
    });      
  };

  // Function that supports adding new product to Cart
  addProductToCart = (product) => {
    const chosenProductAttributes = this.state.chosenProductAttributes;
    const currencyLabel = this.state.currencyLabel;
    if (chosenProductAttributes.length === product.attributes.length) {
      product.chosenAttributes = chosenProductAttributes;

      this.setState({
        cart: JSON.parse(localStorage.getItem("addedProducts")) === null ? [] : JSON.parse(localStorage.getItem("addedProducts"))
    }, () => {
        let cart = this.state.cart;

        if (cart === []) {
            cart.push(product);
            localStorage.setItem("addedProducts", JSON.stringify(cart));
        } else {
            cart.push(product);
            localStorage.setItem("addedProducts", JSON.stringify(cart));
            this.getTotal(currencyLabel);;
        };

        this.setState({
            cart,
            chosenProductAttributes: []
        });
    });
    } else {
      return
    };
  };

  // Function that supports removing product from Cart
  removeProductFromCart = (productID) => {
    let {currencyLabel, cart, total} = this.state;
    let index = 0;

    index = cart.findIndex(product => product.id === productID);
    if (index === -1) {
      return
    } else {
      cart.splice(index, 1);
      if (total === 0) {
        localStorage.removeItem("addedProducts")
      } else {
        localStorage.setItem("addedProducts", JSON.stringify(cart));
        this.getTotal(currencyLabel);
      };
      
      this.setState({
        cart
      });
    };
  };
  
  // Function that supports updating of total amount of all products in Cart
  getTotal = (currencyLabel) => {
    const cart = this.state.cart;
    let sum = 0;
    
    cart.forEach(product => {
      sum += product.prices.filter(price => {
        return price.currency.label === currencyLabel;
      })[0].amount;
    });

    this.setState({
      total: sum
    });
  };

  // Function that creates array of unique products in Cart
  uniqueProductsInCart = () => {
    let cart = this.state.cart;
    const uniqueProductsInCart = Array.from(new Set(cart.map(product => product.id)))
    .map(id => {
      return cart.find(product => product.id === id);
    });
    return uniqueProductsInCart;
  };

  // Function that returns quantity of every unique product in Cart
  inCartProductsQty = (productID) => {
    const cart = this.state.cart;
    let qty = 0;

    cart.forEach(product => {
      if (product.id === productID) {
        qty += 1;
      };
    });
    return qty;
  };

  // Function that creates array with first indexes of every product images
  getCartImagesIndexes = () => {
    const displayedImages = this.state.displayedImages;

     for (let i=0; i<this.uniqueProductsInCart().length; i++) {
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

  // Function that returns values of margins of every products column in Products Page
  productMarginsStyle = (index) => {
    if (index % 3 === 0) {
      return {marginRight: "20px"}
    }
    
    if (index % 3 === 1) {
        return {marginLeft: "20px", marginRight: "20px"}
    }
    
    if (index % 3 === 2) {
        return {marginLeft: "20px"}
    }  
  }

  // Function that supports showing of MyBag component
  showMyBag = (slug) => {
    let {cart, myBagVisibility} = this.state;

    if (slug !== "cart" && cart.length > 0) {
      myBagVisibility === false ? myBagVisibility = true : myBagVisibility = false;
    } 
  
    this.setState({
      myBagVisibility
    });
  };

  render() {
    return(
      <ApolloProvider client={client}>
        <div id="App">
          {this.state.myBagVisibility ? 
          <div onClick={
            () => this.showMyBag()} 
            style={{
              backgroundColor: "rgba(57, 55, 72, 0.22)", 
              position: "absolute", 
              top: "79px", 
              bottom: "0", 
              height: "100%", 
              left: "0", 
              right: "0", 
              zIndex: "1"
              }}></div> : null}
          <BrowserRouter>
            <Header 
              sortProductsByCategory={this.sortProductsByCategory} // ?????
              categoryOfProduct={this.state.categoryOfProduct}
              resetProductsCategory={this.resetProductsCategory}
              changeCurrency={this.changeCurrency} 
              currencyLabel={this.state.currencyLabel} 
              currencySymbol={this.state.currencySymbol}
              showMyBag={this.showMyBag}
              myBagVisibility={this.state.myBagVisibility}
              cart={this.state.cart}
              total={this.state.total} 
              chooseProductAttribute={this.chooseProductAttribute}
              chosenProductAttributes={this.state.chosenProductAttributes}
              addProductToCart={this.addProductToCart} 
              removeProductFromCart={this.removeProductFromCart}
              uniqueProductsInCart={this.uniqueProductsInCart} 
              inCartProductsQty={this.inCartProductsQty}
              displayedImages={this.state.displayedImages}
              prevProductImage={this.prevProductImage}
              nextProductImage={this.nextProductImage}
              />
            <Switch>
              <Route path="/" exact component={() => 
                <ProductsPage 
                  categoryOfProduct="all" 
                  currencyLabel={this.state.currencyLabel} 
                  productMarginsStyle={this.productMarginsStyle}
                  />}
                />
              <Route path="/category/:category" exact component={() => 
                <ProductsPage 
                  categoryOfProduct={this.state.categoryOfProduct} 
                  currencyLabel={this.state.currencyLabel} 
                  productMarginsStyle={this.productMarginsStyle}
                />} 
              />
              <Route path="/product/:id" component={() => 
                <ProductPage 
                  currencyLabel={this.state.currencyLabel} 
                  changeProductMainImageURL={this.changeProductMainImageURL} 
                  productMainImageURL={this.state.productMainImageURL} 
                  chooseProductAttribute={this.chooseProductAttribute}
                  chosenProductAttributes={this.state.chosenProductAttributes}
                  addProductToCart={this.addProductToCart}
                />} 
              />
              <Route path="/cart" exact component={() => 
                <Cart 
                  cart={this.state.cart}
                  uniqueProductsInCart={this.uniqueProductsInCart} 
                  total={this.state.total} 
                  currencyLabel={this.state.currencyLabel}
                  currencySymbol={this.state.currencySymbol}
                  chooseProductAttribute={this.chooseProductAttribute}
                  chosenProductAttributes={this.state.chosenProductAttributes}
                  addProductToCart={this.addProductToCart}
                  removeProductFromCart={this.removeProductFromCart}
                  inCartProductsQty={this.inCartProductsQty}
                  prevProductImage={this.prevProductImage}
                  nextProductImage={this.nextProductImage}
                  displayedImages={this.state.displayedImages}
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
