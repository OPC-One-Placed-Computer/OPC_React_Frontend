import React, { useState } from 'react';
import { BiSolidCartAdd } from "react-icons/bi";
import getImageUrl from '../tools/media';
import styled, { keyframes, css } from 'styled-components';
import addToCart from '../Function/addToCart';

const Product = ({ image, brand, product_name, price, product_id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart(product_id, product_name, setErrorMessage, setSuccessMessage);
  };

  return (
    <ProdCon>
      <ProdImg onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {isHovered && (
          <AddCart onClick={handleAddToCart}>
            <BiSolidCartAdd size={40} color="#ff6600" />
          </AddCart>
        )}
        <img src={getImageUrl(image)} alt={product_name} />
        <Overlay isHovered={isHovered} />
      </ProdImg>
      <ProdDetails>
        <h3>{brand}</h3>
        <p className="product-name">{product_name}</p>
        <p className="product-price">${price}</p>
      </ProdDetails>
      {errorMessage && <ErrorMessage errorMessage={errorMessage}>{errorMessage}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
    </ProdCon>
  );
};

export default Product;

const ProdCon = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const ProdImg = styled.div`
  position: relative;
  height: 300px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease, filter 0.3s ease;
  }
  &:hover img {
    filter: brightness(0.7);
  }
  
`
const AddCart = styled.div`
  position: absolute;
  top: 40px;
  left: 250px;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.3s ease, transform 0.3s ease;
  ${ProdImg}:hover & {
    opacity: 2;
    transform: translate(-50%, -50%) scale(1.2);
  }
`
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease;
  opacity: ${({ isHovered }) => (isHovered ? 1 : 0)};
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
