import React, { useState } from 'react';
import Axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const MpesaPayment = () => {
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handlePayment = (e) => {
        e.preventDefault();
        if (phone.trim() !== '' && amount.trim() !== '') {
          setShowPopup(true);
        } else {
          toast.error('Please fill in all fields.');
        }
      };
    
      const confirmPayment = () => {
        Axios.post('http://localhost:5000/token', {
          amount,
          phone,
        })
          .then((res) => {
            console.log(res);
            setShowPopup(false);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const cancelPayment = () => {
        setShowPopup(false);
      };

  return (
    <div className="mt-[10rem] p-10 w-[40%] m-auto justify-center items-center border border-gray-200 rounded-xl shadow-2xl  text-center">
    <h1 className="font-bold text-2xl">
      Pay with <span className="text-green-600">Mpesa</span>
    </h1>
    <div >
      <form className="mt-5 flex flex-col space-y-5">
        <input
          onChange={(e) => setPhone(e.target.value)}
          className="border rounded-md p-2 mr-2 bg-slate-100"
          placeholder="phone number"
          type='text'
          required
        />
        <input
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded-md p-2 mr-2 bg-slate-100"
          placeholder="amount Ksh."
          type='number'
          required
        />
        <button
          onClick={handlePayment}
          className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-2xl"
        >
          Pay Now
        </button>
      </form>
    </div>
    {showPopup && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg">
          <p>Are you sure you want to continue with the payment?</p>
          <div className="mt-3 flex justify-center">
            <button
              onClick={confirmPayment}
              className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg mr-3"
            >
              Continue
            </button>
            <button
              onClick={cancelPayment}
              className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
    <Toaster />
  </div>
  )
}

export default MpesaPayment;