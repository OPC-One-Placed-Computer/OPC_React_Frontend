import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa';
import getImageUrl from '../tools/media';
import addToCart from '../Function/addToCart';

const ProductDetailPage = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!product) {
    return <div className="product-detail">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product.product_id, product.product_name, setErrorMessage, setSuccessMessage);
  };

  return (
    <ProductDetail>
      <ProductContent>
        <ProductImage>
          <img src={getImageUrl(product.image_path)} alt={product.product_name} />
        </ProductImage>
        <ProductInfo>
          <h1>{product.product_name}</h1>
          <h2>{product.brand}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ${product.price}</p>
          <p className="product-quantity">Quantity: {product.quantity}</p>
          <AddToCartButton onClick={handleAddToCart}>
            <FaShoppingCart style={{ marginRight: '5px' }} />
            Add to Cart
          </AddToCartButton>
        </ProductInfo>
      </ProductContent>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
    </ProductDetail>
  );
};

export default ProductDetailPage;

const ProductDetail = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
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
    height: auto;
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
  }

  @media (max-width: 768px) {
    order: 2;
  }
`
const ProductInfo = styled.div`
  flex: 1;
  padding: 20px;

  h1 {
    font-size: 2rem;
    margin: 10px 0;
  }

  h2 {
    font-size: 1.5rem;
    color: black;
    margin: 10px 0;
  }

  .product-description {
    font-size: 1rem;
    color: black;
    margin: 10px 0;
  }

  .product-price,
  .product-quantity {
    font-size: 1.2rem;
    color: black;
    margin: 5px 0;
  }

  @media (max-width: 768px) {
    order: 1;
    text-align: center;
  }
`
const AddToCartButton = styled.button`
  font-family: 'Poppins', sans-serif;
  margin-top: 10px;
  padding: 0.5rem 1rem;
  background-color: #000099;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  display: block;
  width: 100%;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    background-color: #0056b3;
  }
`
const ErrorMessage = styled.p`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 0, 0, 0.8);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  z-index: 1000;

  ${({ errorMessage }) => errorMessage && css`
    animation: ${shakeAnimation} 0.5s ease-in-out;
  `}
`
const SuccessMessage = styled.p`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 128, 0, 0.8);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  z-index: 1000;
`
const shakeAnimation = keyframes`
0% { transform: translateX(0); }
20% { transform: translateX(-10px); }
40% { transform: translateX(10px); }
60% { transform: translateX(-10px); }
80% { transform: translateX(10px); }
100% { transform: translateX(0); }
`
