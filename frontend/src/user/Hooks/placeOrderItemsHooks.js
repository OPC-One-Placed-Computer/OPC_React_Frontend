import { useState, useEffect } from 'react';
import axios from 'axios';
import getImageUrl from '../../tools/media'; 

const useFetchOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [imageUrls, setImageUrls] = useState({}); 

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://onepc.online/api/v1/orders?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.data.status) {
        setOrders(response.data.data.data);
        setLastPage(response.data.data.meta.last_page);
        fetchImageUrls(response.data.data.data);
      } else {
        console.error('Unexpected response data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error.message, error.response ? error.response.data : '');
    } finally {
      setLoading(false);
    }
  };

  const fetchImageUrls = async (orders) => {
    try {
      const urls = {};
      for (const order of orders) {
        for (const item of order.order_items) {
          if (!urls[item.product.image_path]) {
            const imageUrl = await getImageUrl(item.product.image_path);
            urls[item.product.image_path] = imageUrl;
          }
        }
      }
      setImageUrls(urls);
    } catch (error) {
      console.error('Error fetching image URLs:', error.message, error.response ? error.response.data : '');
    }
  };

  const cancelOrder = async (order_id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(
        `https://onepc.online/api/v1/orders/cancel`,
        { order_id }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Order cancelled successfully:', response.data);
      fetchOrders();
    } catch (error) {
      console.error('Error cancelling order:', error.message);
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config,
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  return { orders, loading, cancelOrder, currentPage, lastPage, setCurrentPage, imageUrls }; // Return imageUrls
};

export default useFetchOrders;
