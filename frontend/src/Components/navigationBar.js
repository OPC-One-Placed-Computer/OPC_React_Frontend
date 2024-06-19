// src/Components/NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/navigationBar.css'; 

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/homepage" className="nav-item">Home</Link>
        <Link to="/products" className="nav-item">Products</Link>
        <Link to="/loginForm" className="nav-item">Login</Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
