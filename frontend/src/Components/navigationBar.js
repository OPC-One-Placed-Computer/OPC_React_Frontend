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
      <Hamburger onClick={toggleMenu} isOpen={isOpen}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </Hamburger>
      <Content className={`nav-content ${isOpen ? 'open' : ''}`}>
        <Link to="/homepage" className="nav-item" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/products" className="nav-item" onClick={() => setIsOpen(false)}>Products</Link>
        <Link to="/cart" className="nav-item" onClick={() => setIsOpen(false)}><MdOutlineShoppingCart size={24} /></Link>
        <Link to="/loginForm" className="nav-item" onClick={() => setIsOpen(false)}><RiAccountPinCircleFill size={24} /></Link>
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  flex: 1; 
  display: flex;
  align-items: center; 
`;

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
    display: none; 
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh; 
    width: 70%; 
    max-width: 250px; 
    background-color: #333;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
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
