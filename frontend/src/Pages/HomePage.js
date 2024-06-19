import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/home.css';
import sampleImage from '../assets/bc_image.jpg'; 

const Homepage = () => {
  return (
    <div className="homepage">
      <header className="hero">
        <div className="container">
          <div className="content">
            <div className="text-content">
              <h1>Welcome to <br /><span className='animated-span'>One Place Computer</span></h1>
              <p>Explore our wide range of products and services.</p>
              <Link to="/products" className="btn btn-primary">View Products</Link>
            </div>
            <div className="image-content">
              <img src={sampleImage} alt="Sample" className="hero-image" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Homepage;
