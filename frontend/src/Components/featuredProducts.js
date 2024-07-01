import React from 'react';
import styled from 'styled-components';

const featuredProducts = [
  {
    id: 1,
    name: 'Laptop',
    price: 200.00,
    oldPrice: 280.00,
    image: 'path_to_image/redmi_9_prime.png',
    isNew: true,
  },
  {
    id: 2,
    name: 'PC',
    price: 230.00,
    oldPrice: 250.00,
    image: 'path_to_image/refrigerator.png',
    isNew: false,
  },
  {
    id: 3,
    name: 'Laptop',
    price: 280.00,
    oldPrice: 300.00,
    image: 'path_to_image/iphone_11.png',
    isNew: true,
  },
];

const placeholderImageURL = 'https://via.placeholder.com/200'; // URL for the placeholder image

const FeaturedProducts = () => {
  return (
    <Section>
      <Title>Our <span>Featured</span> Products</Title>
      <ProductGrid>
        {featuredProducts.map(product => (
          <ProductCard key={product.id}>
            {product.isNew && <Badge>New</Badge>}
            <ProductImage 
              src={product.image} 
              alt={product.name} 
              onError={(e) => { e.target.src = placeholderImageURL }} 
            />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>
              ${product.price.toFixed(2)} 
              <OldPrice>${product.oldPrice.toFixed(2)}</OldPrice>
            </ProductPrice>
            <AddToCartButton>ADD TO CART</AddToCartButton>
          </ProductCard>
        ))}
      </ProductGrid>
    </Section>
  );
};

export default FeaturedProducts;

const Section = styled.section`
  padding: 40px 20px;
  text-align: center;
  min-height: 600px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  span {
    color: #13072E;
  }
`;

const ProductGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ProductCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 200px;
  text-align: center;
  position: relative;
`;

const Badge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #ff6347;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8rem;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 15px;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  color: #888;
  font-weight: normal;
  margin-left: 10px;
`;

const AddToCartButton = styled.button`
  background-color: #13072E;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #575757;
  }
`;
