import React from "react";
import { Link } from 'react-router-dom';
  
  const Product = ({ product }) => {
    return (
      <div className="max-w-sm rounded overflow-hidden  bg-slate-200  shadow-lg ">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{product.name}</div>
          <p className="text-gray-700 text-base">{product.description}</p>
          <p className="text-gray-900 font-bold text-lg mt-2">KSH.{product.price}</p>
          <div className='mt-6'> 
          <Link 
          to="/payment"
          className="bg-blue-500 hover:bg-blue-700 mt-6 text-white font-bold py-2 
          px-4 rounded focus:outline-none focus:shadow-outline">
              Buy Now</Link>
          </div>
        </div>
      </div>
    );
  };

  export default Product;