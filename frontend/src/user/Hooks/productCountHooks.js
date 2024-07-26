import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductCountHooks = () => {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('https://onepc.online/api/v1/cart', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProductCount(response.data.data.length);
        } else {
          setProductCount(0);
        }
      } catch (error) {
        setProductCount(0);
      }
    };

    fetchProductCount();

    const interval = setInterval(fetchProductCount, 1000);
    return () => clearInterval(interval);
  }, []);

  return productCount;
};

export default ProductCountHooks;
