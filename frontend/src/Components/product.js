import React, { useState } from 'react';
import '../Styles/product.css';

const Product = ({ image, brand, productName, price }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const addToCart = () => {
    // Implement your add to cart logic here
    console.log(`Product ${productName} added to cart`);
  };

  return (
    <div className="product">
      <div className="product-image" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <img src={image} alt={productName} />
        {isHovered && (
          <div className="add-to-cart">
            <button onClick={addToCart}>Add to Cart</button>
          </div>
        )}
      </div>
      <div className="product-details">
        <h3>{brand}</h3>
        <p className="product-name">{productName}</p>
        <p className="product-price">${price}</p>
      </div>
    </div>
  );
};

export default Product;
