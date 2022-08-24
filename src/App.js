import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import ProductsPage from './components/ProductsPage';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';

class App extends React.Component {
  render() {
    return(
      <div id="App">
        <Router>
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App;
