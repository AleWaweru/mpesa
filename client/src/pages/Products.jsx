import React, { useEffect, useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Product from './ProductItem';
import axios from "axios";
import Navbar from '../components/Navbar';
import { AuthContext } from '../helpers/AuthContext'; // Import the AuthContext

const ProductList = () => {
  const { authState, setAuthState } = useContext(AuthContext); // Get the authentication state and setter from the context
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // If access token exists in localStorage, set authentication state
      setAuthState({ ...authState, status: true });
    }
  }, []); // Run this effect only once when the component mounts

  // Persist the authentication state in localStorage
  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  if (!authState.status) {
    // Redirect to login page if user is not logged in
    return <Navigate to="/login" />;
  }

  return (
    <div className='bg-gray-300  m-auto w-screen h-screen flex flex-col overflow-y-scroll'>
      <Navbar />
      <h1 className='m-4 font-extrabold text-purple-600 text-center'>OUR PRODUCTS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center gap-3 md:pl-12 p-3">
        {products.map((product) => (
          <Link key={product._id} to={`/product/${product._id}`}>
            <Product product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
