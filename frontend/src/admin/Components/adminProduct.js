import React, { useState, useEffect } from 'react';
import getImageUrl from '../../tools/media';
import styled  from 'styled-components';

const AdminProduct = ({ image, brand, product_name, price, product_id }) => {

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getImageUrl(image);
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching product image:', error);

      }
    };

    fetchImage();
  }, [image]);

  return (
    <ProdCon>
      <ProdImg >
        <img src={imageUrl} alt={product_name} />
      </ProdImg>
      <ProdDetails>
        <h3>{brand}</h3>
        <p className="product-name">{product_name}</p>
        <p className="product-price">${price}</p>
      </ProdDetails>
    </ProdCon>
  );
};

export default AdminProduct;

const ProdCon = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const ProdImg = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
`
const ProdDetails = styled.div`
  padding: 10px;
  h3 {
    font-size: 18px;
    margin-bottom: 8px;
  }
  .product-price {
    font-size: 16px;
    color: #333;
  }
  .product-name {
    font-size: 16px;
    color: #333;
    margin-bottom: 4px;
  }
`
