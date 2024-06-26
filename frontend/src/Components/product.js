import React, { useState } from 'react';
import { BiSolidCartAdd } from "react-icons/bi";
import getImageUrl from '../tools/media';
import styled, { keyframes, css }from 'styled-components';
const Product = ({ image, brand, product_name, price }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const addToCart = (event) => {
    // Implement your add to cart logic here
    event.stopPropagation();
    
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('Please log in to add this product to your cart.');

      setTimeout(() => {
        setErrorMessage('');
      }, 1000);

      return;
    }
    setSuccessMessage(`Product ${product_name} added to cart.`);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000); // Clear success message after 3 seconds

    // Implement your add to cart logic here
    console.log(`Product ${product_name} added to cart`);
  };
  return (
    <ProdCon>
      <ProdImg onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {isHovered && (
          <AddCart onClick={addToCart}>
            <BiSolidCartAdd size={30} color="#FF6600" />
          </AddCart>
        )}
        <img src={getImageUrl(image)} alt={product_name} />
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
}
`
const AddCart = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ProdDetails = styled.div`
padding: 10px;
h3 {
  font-size: 18px;
  margin-bottom: 8px;
}
  .product-price {
  font-size: 16px;
  color: #666;
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
  
  /* Apply shake animation when errorMessage is shown */
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