import axios from 'axios';

const updateCartItem = async (cart_id, quantity, setProducts) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `https://onepc.online/api/v1/cart/${cart_id}`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedCartData = await axios.get('https://onepc.online/api/v1/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProducts(updatedCartData.data.data);

    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error.response?.data || error.message);
    throw error;
  }
};

export default updateCartItem;
