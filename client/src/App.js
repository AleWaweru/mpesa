import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../src/helpers/AuthContext';
import Mpesa from './pages/Mpesa';
import HomePage from './components/HomePage';
import ProductList from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import ProductForm from './pages/ProductInput';
import { Toaster } from 'react-hot-toast';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  });

  useEffect(() => {
    // Check if user is logged in from local storage
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // Set auth state if user is logged in
      setAuthState({
        username: "",
        id: 0,
        status: true
      });
    }
  }, []);

  return (
    <div>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/payment" element={<Mpesa />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path='/productForm' element={<ProductForm/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/registration" element={<Registration />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
      <Toaster/>
    </div>
  );
}

export default App;
