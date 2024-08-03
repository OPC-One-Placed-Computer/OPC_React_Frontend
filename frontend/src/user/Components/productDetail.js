import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import getImageUrl from '../../tools/media';

const DetailProduct = ({ product }) => {
  const location = useLocation();
  const productFromLocation = location.state?.product; 
  const [imageUrl, setImageUrl] = useState('');
  const currentProduct = product || productFromLocation;

  useEffect(() => {
    if (currentProduct && currentProduct.image_path) {
      const fetchImage = async () => {
        try {
          const url = await getImageUrl(currentProduct.image_path);
          setImageUrl(url);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };

      fetchImage();
    }
  }, [currentProduct]);

  if (!currentProduct) {
    return <div className="product-detail">Product not found</div>;
  }

  return (

    <ProductDetail>
      <ProductContent>
        <ProductImage>
          {imageUrl ? (
            <img src={imageUrl} alt={currentProduct.product_name} />
          ) : (
            <p>Loading image...</p>
          )}
        </ProductImage>
        <ProductInfo>
          <h1>{currentProduct.product_name}</h1>
          <h2>{currentProduct.brand}</h2>
          <p className="product-description">{currentProduct.description}</p>
          <p className="product-price"> ₱{Number(currentProduct.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="product-quantity">Available Quantity: {currentProduct.quantity}</p>
        </ProductInfo>
      </ProductContent>
    </ProductDetail>
  );
};

export default DetailProduct;


const ProductDetail = styled.div`
  * {
    -webkit-tap-highlight-color: transparent;
  }
  display: flex;
  justify-content: center;
  padding: 20px;
`
const ProductContent = styled.div`
  display: flex;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const ProductImage = styled.div`
  flex: 1;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    object-fit: cover;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    order: 1;
  }
`
const ProductInfo = styled.div`
  flex: 1;
  padding: 20px;

  h1 {
    font-size: 16px;
    margin: 10px 0;
  }

  h2 {
    font-size: 12px;
    color: black;
    margin: 10px 0;
  }

  .product-description {
    font-size: 12px;
    color: black;
    margin: 10px 0;
  }

  .product-quantity {
    font-size: 12px;
    color: black;
    margin: 5px 0;
  }
  .product-price {
    color: #d22630;
    margin: 5px 0;
    font-size: 12px;
  }

  @media (max-width: 768px) {
    order: 2;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`
