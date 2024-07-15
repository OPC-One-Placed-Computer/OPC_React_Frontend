import { useState, useEffect } from 'react';
import Axios from 'axios';

const useUpdateProduct = (productId) => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productId) {
      setLoading(true);
      Axios.get(`https://onepc.online/api/v1/products/${productId}`)
        .then(response => {
          setProductData(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }
  }, [productId]);

  return { productData, loading, error };
};

export default useUpdateProduct;
