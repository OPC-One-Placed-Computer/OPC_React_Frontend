import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa'; 
import getImageUrl from '../tools/media';

const ProductDetailPage = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <div className="product-detail">Product not found</div>;
  }

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
          <AddToCartButton>
            <FaShoppingCart style={{ marginRight: '5px' }} />
            Add to Cart
          </AddToCartButton>
        </ProductInfo>
      </ProductContent>
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
`;

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
    color: #555;
    margin: 10px 0;
  }

  .product-description {
    font-size: 1rem;
    color: #666;
    margin: 10px 0;
  }

  .product-price,
  .product-quantity {
    font-size: 1.2rem;
    color: #333;
    margin: 5px 0;
  }

  @media (max-width: 768px) {
    order: 1; /* Moves text above image on smaller screens */
    text-align: center;
  }
`

const AddToCartButton = styled.button`
  margin-top: 10px;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  width: 100%;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.2rem; /* Adjust icon size as needed */
  }

  &:hover {
    background-color: #0056b3;
  }
`
