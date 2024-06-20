// src/Pages/ProductDetailPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/productDetail.css';

const ProductDetailPage = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <div className="product-detail">Product not found</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={product.image} alt={product.productName} />
        </div>
        <div className="product-detail-info">
          <h1>{product.productName}</h1>
          <h2>{product.brand}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ${product.price}</p>
          <p className="product-quantity">Quantity: {product.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
