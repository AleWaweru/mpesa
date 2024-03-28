import React from 'react';
import { useParams } from 'react-router-dom';
import { electronics } from './ProductItems';

const ProductDetails = () => {
  const { id } = useParams();
  const product = electronics.find((p) => p.id === parseInt(id));

  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-lg mx-auto mt-10  bg-gray-400 rounded-lg shadow-xl p-6">
      <div className="font-bold text-2xl mb-4">{product.name}</div>
      <p className="text-gray-700 text-base mb-4">{product.description}</p>
      <p className="text-gray-900 font-bold text-lg">KSH.{product.price}</p>
    </div>
  );
};

export default ProductDetails;
