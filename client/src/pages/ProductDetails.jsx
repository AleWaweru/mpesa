import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBackCircle } from "react-icons/io5";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return; 
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="max-w-lg mx-auto mt-10 bg-gray-300 rounded-lg shadow-xl p-6">
      <Link className='font-bold text-3xl text-blue-500 text-end flex'  to="/products"><IoArrowBackCircle />🏃🏾‍♀️</Link>
      {product ? (
        <>
         <img src={product.image} alt="Laptop" className="w-full h-[60%]" />
          <div className="font-bold text-2xl mb-4">{product.name}</div>
          <p className="text-gray-700 text-base mb-4">{product.description}</p>
          <p className="text-gray-900 font-bold text-lg">KSH.{product.price}</p>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
  
};

export default ProductDetails;
