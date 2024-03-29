import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mpesa from './pages/Mpesa';
import HomePage from './components/HomePage';
import ProductList from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import ProductForm from './pages/ProductInput';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payment" element={<Mpesa />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path='/productForm' element={<ProductForm/>} />
        </Routes>
      </Router>
      <Toaster/>
    </div>
  );
}

export default App;
