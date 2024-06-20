import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { RiAccountPinCircleFill } from "react-icons/ri";
import logo from '../assets/logo.png';
import styled from 'styled-components';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavBar>
      <Logo>
        <Link to="/homepage"> <img src={logo} alt="Logo" /></Link>
      </Logo>
      <Content className={`nav-content ${isOpen ? 'open' : ''}`}>
        <Link to="/homepage" className="nav-item">Home</Link>
        <Link to="/products" className="nav-item">Products</Link>
        <Link to="/cart" className="nav-item"><MdOutlineShoppingCart size={24} /></Link>
        <Link to="/loginForm" className="nav-item"><RiAccountPinCircleFill size={24} /></Link>
      </Content>
      <Hamburger onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </Hamburger>
    </NavBar>
  );
};

export default NavigationBar;

const NavBar = styled.nav `
  background-color: #13072E;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
const Logo = styled.div `
  flex: 1; 
  display: flex;
  margin-left: 40px;
  align-items: center; 
`
const Content = styled.div `
.nav-content {
  display: flex;
  justify-content: flex-end;
  flex: 1;
  gap: 10px;
  transition: transform 0.3s ease-in-out;
}
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
`
const Hamburger = styled.div `
  display: none;
  flex-direction: column;
  cursor: pointer;

  .bar {
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 4px 0;
    transition: 0.4s;
  }

  @media (max-width: 768px) {
      display: flex;
      
    .nav-content {
      position: fixed;
      top: 0;
      right: 0;
      height: 250px;
      width: 250px;
      background-color: #333;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transform: translateX(100%);
    }
    .nav-content.open {
      transform: translateX(0);
    }
    .nav-item {
      width: 50px;
      text-align: center;
      padding: 20px;
    }
  }
`



