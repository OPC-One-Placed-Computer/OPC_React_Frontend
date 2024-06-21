// src/Pages/ProductDetailPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
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
        </ProductInfo>
      </ProductContent>
    </ProductDetail>
  );
};

export default ProductDetailPage;

const ProductDetail = styled.div `
  display: flex;
  justify-content: center; 
  padding: 20px;
`
const ProductContent = styled.div `
  display: flex;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  align-items: center;
  max-width: 800px;
`
const ProductImage = styled.div `
flex: 1 1 auto;
max-width: 100%;
margin-right: 20px;
display: flex;
align-items: center;
justify-content: center;

img {
  width: 100%;
  height: auto;
  object-fit: contain; /* This ensures the image fits within the container without cropping */
  max-width: 100%; /* Ensures the image doesn't overflow the container */
  max-height: 100%; /* Ensures the image doesn't overflow the container */
}

@media (min-width: 768px) {
  width: 50%;
  margin-right: 20px;
}
`
const ProductInfo = styled.div `
flex: 1; 
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
.product-price, .product-quantity {
  font-size: 1.2rem;
  color: #333;
  margin: 5px 0;
}


`
