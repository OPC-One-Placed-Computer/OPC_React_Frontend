import React, { useState, useEffect } from 'react';
import getImageUrl from '../../tools/media';
import styled, { keyframes, css } from 'styled-components';
import addToCart from '../Function/addToCart';
import Lottie from 'lottie-react';
import addCart from '../Animations/addCart.json';
import { MdOutlineShoppingCart, MdAddShoppingCart } from "react-icons/md"; // Import the money icon

const Product = ({ image, brand, product_name, price, product_id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const quantity = 1;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getImageUrl(image);
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching product image:', error);
        setErrorMessage('Failed to load product image.');
      }
    };

    fetchImage();
  }, [image]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleButtonMouseEnter = () => {
    setIsButtonHovered(true);
  };

  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart(product_id, product_name, quantity, setErrorMessage, setSuccessMessage);
  };

  return (
    <ProdCon>
      <ProdImg onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <LottieAnimationContainer $isHovered={isHovered}>
          <Lottie
            animationData={addCart}
            loop={true}
            autoplay={true}
            style={{ width: 300, height: 300 }}
          />
        </LottieAnimationContainer>
        <img src={imageUrl} alt={product_name} />
        <Overlay $isHovered={isHovered} />
        {isHovered && (
          <AddCartButton
            onClick={handleAddToCart}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            {isButtonHovered ? <StyledCartIcon /> : 'Add to Cart'}
          </AddCartButton>
        )}
      </ProdImg>
      <ProdDetails>
        <h3>{brand}</h3>
        <p className="product-name">{product_name}</p>
        <p className="product-price">
          ₱{price}
          <PriceIcon>
            <MdAddShoppingCart onClick={handleAddToCart}/>
          </PriceIcon>
        </p>
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
`;

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
`;

const LottieAnimationContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: ${({ $isHovered }) => ($isHovered ? 1 : 0)};
  z-index: 1;
  transition: opacity 0.3s ease;
`;

const overlayAnimation = keyframes`
  0% {
    top: -100%;
  }
  100% {
    top: 0;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: ${({ $isHovered }) => ($isHovered ? '0' : '-100%')};
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  transition: top 0.5s ease;

  ${({ $isHovered }) =>
    $isHovered &&
    css`
      animation: ${overlayAnimation} 0.5s forwards;
    `}
`;

const ProdDetails = styled.div`
  padding: 10px;
  h3 {
    font-size: 18px;
    margin-bottom: 8px;
  }
  .product-price {
    font-weight: bold;
    font-size: 16px;
    color: #d22630;
    display: flex;
    align-items: center;
  }
  .product-name {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: #333;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ErrorMessage = styled.p`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 0, 0, 0.8);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 10px;
  z-index: 1000;

  ${({ errorMessage }) =>
    errorMessage &&
    css`
      animation: ${shakeAnimation} 0.5s ease-in-out;
    `}
`;

const SuccessMessage = styled.p`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 128, 0, 0.8);
  color: #fff;
  padding: 10px;
  font-size: 10px;
  z-index: 1000;
`;

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  60% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
  100% { transform: translateX(0); }
`;

const AddCartButton = styled.button`
  font-family: 'Poppins', sans-serif;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000099;
  color: #fff;
  height: 40px;
  z-index: 1;
  padding: 10px 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #d22630;
  }
`;

const StyledCartIcon = styled(MdOutlineShoppingCart)`
  font-size: 24px; 
`;

const PriceIcon = styled.span`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    height: 40px;
    width: 40px;
    background-color: #ccc;
    border-radius: 50%;
<<<<<<< Updated upstream
=======
    border: 1px solid #aaa;
    cursor: pointer; 
    transition: background-color 0.3s ease;
>>>>>>> Stashed changes

    svg {
      color: black;
      height: 25px;
      width: 25px;
    }
  }
`;
