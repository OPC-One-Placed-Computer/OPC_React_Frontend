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
    fetchProductCount(); // Fetch product count initially
    const interval = setInterval(fetchProductCount, 5000); // Fetch product count every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const fetchProductCount = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you have a token stored in localStorage
      const response = await axios.get('https://onepc.online/api/v1/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductCount(response.data.data.length); // Set the count based on the number of items in the cart
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
      <Hamburger onClick={toggleMenu} isOpen={isOpen}>
      {isOpen && (
          <CloseButton onClick={toggleMenu}><IoIosCloseCircle size={50} /></CloseButton>)}
          <>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </>
      </Hamburger>
      <Content isOpen={isOpen}>
        <Link to="/products" className="nav-item" onClick={toggleMenu}>Products</Link>
       <Link to="/cartPage" className="nav-item" onClick={toggleMenu}>
          <CartIconContainer>
            <MdOutlineShoppingCart size={24} />
            {productCount > 0 && <ItemCount>{productCount}</ItemCount>}
          </CartIconContainer>
        </Link>
        <ProfileDropdown />
      </Content>
    </NavBar>
  );
};

export default NavigationBar;

const NavBar = styled.nav`
  background-color: #13072E;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  z-index: 10000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Logo = styled.div`
  flex: 1; 
  display: flex;
  align-items: center; 
`

const Content = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  .nav-item {
    color: white;
    text-align: center;
    border-radius: 25px;
    margin-right: 10px;
    padding: 14px 20px;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .nav-item:hover {
    border-radius: 25px;
    background-color: #575757;
    color: white;
  }

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
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
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s ease-in-out;
  }
`

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
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  border-radius: 100%;
  padding: 4px;
  font-size: 12px;
  font-weight: bold;
`
