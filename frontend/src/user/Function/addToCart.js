import axios from 'axios';

const addToCart = (product_id, product_name, quantity, setErrorMessage, setSuccessMessage) => {
  const token = localStorage.getItem('token');

  axios.post('https://onepc.online/api/v1/cart', {
    'product_id': product_id,
    'quantity': quantity
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    setSuccessMessage(`Product ${product_name} added to cart.`);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  })
  .catch(error => {
    console.error('Error adding product to cart:', error);
    setErrorMessage('Failed to add product to cart. Please login.');
    setTimeout(() => {
      setErrorMessage('');
    }, 1000);
  });
};

export default addToCart;