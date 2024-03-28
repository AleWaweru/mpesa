import React from 'react';
import { Link } from 'react-router-dom';
import Product from './productList';
import { electronics } from './ProductItems';

const ProductList = () => {
  return (
    <div className='bg-gray-300  m-auto w-screen h-screen flex flex-col overflow-y-scroll'>
      <div className='flex justify-center items-center text-center font-extrabold text-purple-700'>
        <h1 className='m-4'>OUR PRODUCTS</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center gap-4 md:pl-12 p-4">
        {electronics.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <Product product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
