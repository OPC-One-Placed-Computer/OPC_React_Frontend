import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProductHooks = () => {
  const [newProductData, setNewProductData] = useState({
    product_name: '',
    category: '',
    brand: '',
    price: 0,
    quantity: 0,
    description: '',
    featured: 0, 
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
      featured: checked ? 1 : 0, 
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
    
    try {
      const formData = new FormData();
      Object.keys(newProductData).forEach((key) => {
        formData.append(key, newProductData[key]);
      });

      const token = localStorage.getItem('token');
      const response = await axios.post('https://onepc.online/api/v1/products', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', 
        },
      });
      toast.success('Product added successfully!'); 
      console.log('Product added successfully:', response.data);

  
      setNewProductData({
        product_name: '',
        category: '',
        brand: '',
        price: 0,
        quantity: 0,
        description: '',
        featured: 0, 
        image: null,
      });
      document.querySelector('input[type="file"]').value = null;

    } catch (error) {
      toast.error('Error adding product. Please try again.');
      console.error('Error adding product:', error);
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
