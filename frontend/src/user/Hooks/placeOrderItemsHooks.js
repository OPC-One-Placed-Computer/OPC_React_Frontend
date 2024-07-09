import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://onepc.online/api/v1/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        if (response.data && Array.isArray(response.data.data)) {
          setOrders(response.data.data);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading };
};

export default useFetchOrders;
