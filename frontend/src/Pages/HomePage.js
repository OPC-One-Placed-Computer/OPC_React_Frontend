// src/Components/Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="homepage">
      <header className="hero">
        <div className="container">
          <h1>Welcome to Your Company</h1>
          <p>Explore our wide range of products and services.</p>
          <Link to="/products" className="btn btn-primary">View Products</Link>
        </div>
      </header>

    </div>
  );
};

export default Homepage;
