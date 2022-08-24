import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import ProductsPage from './components/ProductsPage';

class App extends React.Component {
  render() {
    return(
      <div id="App">
        <Router>
          <Routes>
            <Route path="/" element={<ProductsPage />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App;
