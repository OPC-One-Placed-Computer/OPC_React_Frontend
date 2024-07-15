// addProductHooks.js
import { useState } from 'react';
import axios from 'axios';

const AddProductHooks = () => {
  const [newProductData, setNewProductData] = useState({
    product_name: '',
    category: '',
    brand: '',
    price: 0,
    quantity: 0,
    description: '',
    featured: 0, // Default to not featured
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setNewProductData((prevData) => ({
      ...prevData,
      featured: checked ? 1 : 0, // 1 for featured, 0 for not featured
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProductData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.keys(newProductData).forEach((key) => {
      formData.append(key, newProductData[key]);
    });

    try {
      const response = await axios.post('https://onepc.online/api/v1/products', formData);
      console.log('Product added successfully:', response.data);
      // Reset form or handle success
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error
    }
  };

  return {
    newProductData,
    handleInputChange,
    handleCheckboxChange,
    handleImageChange,
    handleFormSubmit,
  };
};

export default AddProductHooks;
