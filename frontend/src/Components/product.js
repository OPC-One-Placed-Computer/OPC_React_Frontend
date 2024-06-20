import React, { useState } from 'react';
import { BiSolidCartAdd } from "react-icons/bi";

import styled from 'styled-components';
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
    <ProdCon>
      <ProdImg onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {isHovered && (
          <AddCart onClick={addToCart}>
            <BiSolidCartAdd size={30} color="#FF6600" />
          </AddCart>
        )}
        <img src={image} alt={productName} />
      </ProdImg>
      <ProdDetails>
        <h3>{brand}</h3>
        <p className="product-name">{productName}</p>
        <p className="product-price">${price}</p>
      </ProdDetails>
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








