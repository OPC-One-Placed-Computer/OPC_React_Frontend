import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsBookmarkStarFill } from "react-icons/bs";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('https://onepc.online/api/v1/products/featured');
        if (response.data.status) {
          setFeaturedProducts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching the featured products", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Section>
      <Title>Our <span>Featured</span> Products</Title>
      <MobileView>
        <Slider {...settings}>
          {featuredProducts.map(product => (
            <ProductCard key={product.product_id}>
              {product.featured && <FireBadge />}
              <ProductImage 
                src={`https://onepc.online${product.image_path}`} 
                alt={product.product_name} 
              />
              <ProductName>{product.product_name}</ProductName>
              <ProductPrice>
                ${parseFloat(product.price).toFixed(2)}
              </ProductPrice>
              <AddToCartButton>ADD TO CART</AddToCartButton>
            </ProductCard>
          ))}
        </Slider>
      </MobileView>
      <DesktopView>
        <ProductGrid>
          {featuredProducts.map(product => (
            <ProductCard key={product.product_id}>
              {product.featured && <FireBadge />}
              <ProductImage 
                src={`https://onepc.online${product.image_path}`} 
                alt={product.product_name} 
              />
              <ProductName>{product.product_name}</ProductName>
              <ProductPrice>
                ${parseFloat(product.price).toFixed(2)}
              </ProductPrice>
              <AddToCartButton>ADD TO CART</AddToCartButton>
            </ProductCard>
          ))}
        </ProductGrid>
      </DesktopView>
    </Section>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <Arrow className="next" onClick={onClick}>
      &gt;
    </Arrow>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <Arrow className="prev" onClick={onClick}>
      &lt;
    </Arrow>
  );
};

export default FeaturedProducts;

const Section = styled.section`
  // width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 25px;
  text-align: center;
  min-height: 800px;
  overflow-x: hidden;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  span {
    color: #13072E;
  }
`;

const MobileView = styled.div`
  width: 100%;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const DesktopView = styled.div`
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  width: 100%;
  justify-content: center;
`;

const ProductCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 200px;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Center children vertically */
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const AddToCartButton = styled.button`
  font-family: 'Poppins', sans-serif;
  background-color: #13072E;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: auto; 
  &:hover {
    background-color: #ff6600;
  }
`;

const ProductName = styled.h3`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const FireBadge = styled(BsBookmarkStarFill)`
  position: absolute;
  top: 10px;
  left: 10px;
  color: #ff6347;
  font-size: 1.8rem;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  margin-bottom: 15px;
`;

const Arrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 50%;
  z-index: 1;

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }
`;
