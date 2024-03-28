import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: 'url("/images/finance.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        style={{ backdropFilter: 'blur(5px)' }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-4xl font-bold text-slate-300 mb-6 ">Welcome to All Inclusive Shop</h1>
        <p className="text-lg text-white mb-8">Your desired shopping space</p>
        <Link
          to="/products"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Explore Our Shop
        </Link>
      </div>
    </div>
  );
};


export default HomePage;
