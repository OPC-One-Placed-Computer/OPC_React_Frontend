import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { RiAccountPinCircleFill } from "react-icons/ri";
import logo from '../assets/logo.png';
import '../Styles/navigationBar.css';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/homepage"> <img src={logo} alt="Logo" /></Link>
      </div>
      <div className={`nav-content ${isOpen ? 'open' : ''}`}>
        <Link to="/homepage" className="nav-item">Home</Link>
        <Link to="/products" className="nav-item">Products</Link>
        <Link to="/loginForm" className="nav-item"><RiAccountPinCircleFill size={24} /></Link>
        <Link to="/cart" className="nav-item"><MdOutlineShoppingCart size={24} /></Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
};

export default NavigationBar;
