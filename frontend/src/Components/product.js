import React, { useState } from 'react';
import { BiSolidCartAdd } from "react-icons/bi";
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
          <div className="add-to-cart" onClick={addToCart}>
            <BiSolidCartAdd size={30} color="#ff6600" />
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
