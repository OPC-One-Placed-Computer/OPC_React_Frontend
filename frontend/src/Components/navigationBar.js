import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { IoIosCloseCircle } from "react-icons/io";
import logo from '../assets/logo.png';
import styled from 'styled-components';
import ProfileDropdown from './profileDropdown';
import axios from 'axios'; 

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productCount, setProductCount] = useState(0); 

  useEffect(() => {
    fetchProductCount(); 
    const interval = setInterval(fetchProductCount, 1000); 
    return () => clearInterval(interval); 
  }, []);

  const fetchProductCount = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get('https://onepc.online/api/v1/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductCount(response.data.data.length);
    } catch (error) {
      console.error('Error fetching product count:', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavBar>
      <Logo>
        <Link to="/homepage"> <img src={logo} alt="Logo" /></Link>
      </Logo>
      <Hamburger onClick={toggleMenu}>
        {isOpen && (
          <CloseButton onClick={toggleMenu}><IoIosCloseCircle size={50} /></CloseButton>)}
        <>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </>
      </Hamburger>
      <Content open={isOpen}>
        <Link to="/products" className="nav-item" onClick={toggleMenu}>Products</Link>
        <Link to="/cartPage" className="nav-item" onClick={toggleMenu}>
          <CartIconContainer>
            <MdOutlineShoppingCart size={24} />
            {productCount > 0 && <ItemCount>{productCount}</ItemCount>}
          </CartIconContainer>
        </Link>
        <ProfileDropdown className="nav-item" />
      </Content>
    </NavBar>
  );
};

export default NavigationBar;

const NavBar = styled.nav`
position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #13072E;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`

const Logo = styled.div`
  flex: 1; 
  display: flex;
  margin-left: 40px;
  align-items: center; 
`

const Content = styled.div`
  display: flex;
  margin-right: 80px;
  justify-content: flex-end;
  gap: 10px;

  .nav-item {
    position: relative;
    color: white;
    text-align: center;
    border-radius: 25px;
    margin-right: 10px;
    padding: 0 20px;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease;
    
    &::before,
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 0;
      height: 2px;
      background-color: #ff6600;
      transition: width 0.3s ease, left 0.3s ease, right 0.3s ease;
    }
    
    &::before {
      left: 50%;
    }
    
    &::after {
      right: 50%;
    }

    &:hover::before {
      width: 50%;
      left: 0;
    }
    
    &:hover::after {
      width: 50%;
      right: 0;
    }
  }
  
  @media (max-width: 768px) {
    display: ${({ open }) => (open ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh; 
    width: 70%; 
    max-width: 250px; 
    z-index: 999;
    background-color: #3f2182;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s ease-in-out;
  }
`;


const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  margin-right: 20px; 

  .bar {
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 4px 0;
    transition: 0.4s;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`
const CloseButton = styled.div`
  color: white;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 30px;
  z-index: 1000;

  &:hover {
    color: #ccc; 
  }
`
const CartIconContainer = styled.div`
  position: relative;
`

const ItemCount = styled.span`
  position: absolute;
  width: 15px;
  height: 15px;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  padding: 2px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  display: flex;
`
