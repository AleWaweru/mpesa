import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Product from './productList';
import axios from "axios";

const ProductList = () => {
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

  return (
    <div className='bg-gray-300  m-auto w-screen h-screen flex flex-col overflow-y-scroll'>
      <div className='flex justify-center items-center text-center font-extrabold text-purple-700'>
        <h1 className='m-4'>OUR PRODUCTS</h1>
      </div>
      <div className='justify-center item-center flex' >
        <Link className='bg-blue-500 hover:bg-blue-700 mt-6 text-white font-bold py-2 
          px-4 rounded focus:outline-none focus:shadow-outline' to="/productForm">Create Product</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center gap-4 md:pl-12 p-4">
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
