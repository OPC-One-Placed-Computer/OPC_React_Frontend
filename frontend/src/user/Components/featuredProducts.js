import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsBookmarkStarFill } from "react-icons/bs";
import addToCart from '../Function/addToCart';
import getImageUrl from '../../tools/media';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedProducts = async (page) => {
      try {
        const response = await axios.get('https://onepc.online/api/v1/products', {
          params: { page, featured: true }
        });
        if (response.data.status && response.data.data && Array.isArray(response.data.data.data)) {
          setFeaturedProducts(response.data.data.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setErrorMessage("Failed to fetch featured products");
        }
      } catch (error) {
        console.error("Error fetching the featured products", error);
        setErrorMessage("Error fetching the featured products");
      }
    };
  
    fetchFeaturedProducts(currentPage);
  
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, setCurrentPage]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const updatedProducts = await Promise.all(
          featuredProducts.map(async (product) => {
            const imageUrl = await getImageUrl(product.image_path);
            return { ...product, imageUrl };
          })
        );
        setFeaturedProducts(updatedProducts);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    if (featuredProducts.length > 0) {
      fetchImages();
    }
  }, [featuredProducts]);
  

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

  const handleAddToCart = (product_id, product_name) => {
    const quantity = 1; 
    addToCart(product_id, product_name, quantity, setErrorMessage, setSuccessMessage);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.product_id}`, { state: { product } });
  };

  return (
    <Section className={scrolled ? 'slide-up' : ''}>
      <Title><span>Featured</span> Products</Title>
      <MobileView>
        <Slider {...settings}>
          {featuredProducts.map(product => (
            <ProductCard key={product.product_id} onClick={() => handleProductClick(product)}>
              {product.featured && <FireBadge />}
              <ProductImage 
                src={product.imageUrl} 
                alt={product.product_name} 
              />
              <BrandName>{product.brand}</BrandName>
              <ProductName>{product.product_name}</ProductName>
              <ProductPrice>
                ${parseFloat(product.price).toFixed(2)}
              </ProductPrice>
              <AddToCartButton onClick={(e) => { e.stopPropagation(); handleAddToCart(product.product_id, product.product_name); }}>ADD TO CART</AddToCartButton>
            </ProductCard>
          ))}
        </Slider>
      </MobileView>
      <DesktopView>
        <ProductGrid>
          {featuredProducts.map(product => (
            <ProductCard key={product.product_id} onClick={() => handleProductClick(product)}>
              {product.featured && <FireBadge />}
              <ProductImage 
                src={product.imageUrl} 
                alt={product.product_name} 
              />
              <BrandName>{product.brand}</BrandName>
              <ProductName>{product.product_name}</ProductName>
              <ProductPrice>
                ${parseFloat(product.price).toFixed(2)}
              </ProductPrice>
              <AddToCartButton onClick={(e) => { e.stopPropagation(); handleAddToCart(product.product_id, product.product_name); }}>ADD TO CART</AddToCartButton>
            </ProductCard>
          ))}
        </ProductGrid>
      </DesktopView>
     
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
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

const slideUp = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 25px;
  text-align: center;
  min-height: 800px;
  overflow-x: hidden;

  &.slide-up {
    animation: ${slideUp} 1s ease forwards;
  }
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
  justify-content: space-between; 
`;

const BrandName = styled.h3`
  font-size: 1rem;
  font-weight: bold;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #FF4500;
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
  font-family: 'Poppins', sans-serif;
  color: #333;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

const ErrorMessage = styled.p`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 0, 0, 0.8);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  z-index: 1000;
`;

const SuccessMessage = styled.p`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 128, 0, 0.8);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  z-index: 1000;
`;
