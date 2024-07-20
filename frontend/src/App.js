import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProductsPage from './pages/a';
import ProductPage from './pages/pp';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AllProductsPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  </Router>
);

export default App;
