import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa';
import getImageUrl from '../../tools/media';
import addToCart from '../Function/addToCart';
import Breadcrumb from '../Components/breadcrumb';

const ProductDetailPage = ({ product }) => {
  const location = useLocation();
  const productFromLocation = location.state?.product; 
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
          setErrorMessage('Error fetching image');
        }
      };

      fetchImage();
    }
  }, [currentProduct]);

  if (!currentProduct) {
    return <div className="product-detail">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(currentProduct.product_id, currentProduct.product_name, quantity, setErrorMessage, setSuccessMessage);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <DetailedContainer>
    <Breadcrumb items={[{ label: 'Home', path: '/HomePage' }, { label: 'Products', path: '/products' }, { label: 'Detailed Product' }]} />
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
<<<<<<< Updated upstream
          <p className="product-price">Price: ${currentProduct.price}</p>
=======
          <p className="product-price">₱{Number(currentProduct.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
>>>>>>> Stashed changes
          <p className="product-quantity">Available Quantity: {currentProduct.quantity}</p>
          <QuantitySelector>
            <QuantityButton className='subtraction' onClick={handleDecreaseQuantity}>-</QuantityButton>
            <QuantityInput value={quantity} readOnly />
            <QuantityButton className='addition' onClick={handleIncreaseQuantity}>+</QuantityButton>
          </QuantitySelector>
          <AddToCartButton onClick={handleAddToCart}>
            <FaShoppingCart style={{ marginRight: '5px' }} />
            Add to Cart
          </AddToCartButton>
        </ProductInfo>
      </ProductContent>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
    </ProductDetail>
    </DetailedContainer>
  );
};

export default ProductDetailPage;

const DetailedContainer = styled.div `
display: flex;
flex-direction: column;
padding: 50px;
`

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
    height: 400px;
    object-fit: cover;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    order: 1;
    width: 100%;
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
    font-size: 12px;
    color: #d22630;
    margin: 5px 0;
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
const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-top: 10px;

  .subtraction {
    background-color: #dc3545;
  }
  .addition {
    background-color: #000099;
  }

  @media (max-width: 768px) {
    text-align: center;
    display: flex;
    justify-content: center;
    font-size: 12px;
  }
`
const QuantityButton = styled.button`
  font-family: 'Poppins', sans-serif;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  font-size: 12px;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }
`
const QuantityInput = styled.input`
  font-family: 'Poppins', sans-serif;
  width: 30px;
  height: 30px;
  border: none;
  font-size: 12px;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 0 5px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`
const AddToCartButton = styled.button`
  font-family: 'Poppins', sans-serif;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #000099;
  color: #ffffff;
  border: none;
  font-size: 12px;
  border-radius: 25px;
  cursor: pointer;
  display: block;
  width: 40%;
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

  @media (max-width: 768px) {
    font-size: 10px;
    width: 130px;
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
  font-size: 12px;
  z-index: 1000;
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
  font-size: 12px;
  z-index: 1000;
`