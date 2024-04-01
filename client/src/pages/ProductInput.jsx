import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { imageDB } from '../libs/firebaseImage/config';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../helpers/AuthContext'; // Import the AuthContext

const ProductForm = () => {
  const { authState } = useContext(AuthContext); // Get the authentication state from the context
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
    imagePreview: null,
  });
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(imageDB, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      }, (error) => {
        console.error(error);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, image: downloadURL }));
        });
      });
    };
    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { name, price, description, image } = formData;
      await axios.post('http://localhost:5000/products', {
        name,
        price,
        description,
        url: image,
      });
      toast.success('Submitted successfully🎉.');
      navigate('/products');
    } catch (error) {
      console.error('Failed to add product:', error);
      toast.error('Failed to add product. Please try again.');
    }
  };

  useEffect(() => {
    if (!authState.status) {
      navigate('/login'); // Redirect to login page if user is not logged in
    }
  }, [authState.status, navigate]);

  return (
    <div className="max-w-md mx-auto mt-8">
      {authState.status && ( // Render the form only if user is logged in
      <>
      <h2 className="text-2xl font-bold mb-4">Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-1 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-1 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-1 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => { setFile(e.target.files[0]); setFormData({ ...formData, imagePreview: URL.createObjectURL(e.target.files[0]) }) }}
            className="border border-gray-300 rounded-md px-3 py-1 w-full"
            required
          />
          {formData.imagePreview && (
            <img src={formData.imagePreview} alt="Preview" className="mt-2 max-w-xs" />
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={progress !== null && progress < 100}
        >
          Add Product
        </button>
      </form>
      </>
)}
    </div>
  );
};

export default ProductForm;
