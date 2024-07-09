import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../Components/footer';
import FeaturedProducts from '../Components/featuredProducts';
import sampleImage from '../../assets/bc_image.jpg'; 

const Homepage = () => {
  return (
    <HomePageParentContainer>
      <HomepageCon>
        <HeroHeader>
          <HeroCon>
            <Content>
              <TextContent>
                <h1>Welcome to <br /><span className='animated-span'>One Place Computer</span></h1>
                <p>Where high quality products are in one place.</p>
                <Link to="/products" className="btn btn-primary">View Products</Link>
              </TextContent>
              <ImgContent>
                <img src={sampleImage} alt="Sample" className="hero-image" />
              </ImgContent>
            </Content>
          </HeroCon>
        </HeroHeader>
      </HomepageCon>
      <FeaturedProducts />
      <Footer />
    </HomePageParentContainer>
  );
};

export default Homepage;
const HomePageParentContainer = styled.div`
  overflow-x: hidden;
`;
const HomepageCon = styled.div`
  background-color: #13072E;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px;
`
const HeroHeader = styled.header`
  text-align: center;
  padding: 20px;
  width: 100%; 
`
const HeroCon = styled.div`
  border-radius: 15px;
  width: 100%; 
  height: 600px; 
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row; 
  }
`
const Content = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column; 

  @media (min-width: 768px) {
    flex-direction: row; 
  }
`
const TextContent = styled.div`
  flex: 1;
  text-align: center; 
  margin-top: 30px; 

  @media (min-width: 768px) {
    text-align: left; 
    margin-bottom: 0; 
  }

  .btn {
    background-color: #ffffff;
    color: #13072E;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 25px;
    transition: background-color 0.3s ease;
    display: inline-block;
    margin-top: 10px; 
  }

  .btn:hover {
    background-color: #ff6600;
    color: #ffffff;
  }

  .animated-span {
    font-size: 35px;
    color: #ff6600;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    animation: type 5s steps(30, end) infinite;
    border-right: 2px solid white;

    @media (min-width: 768px) {
      font-size: 55px;
    }
  }

  @keyframes type {
    from { width: 0; }
    to { width: 100%; }
  }
`
const ImgContent = styled.div`
  flex: 1;
  text-align: center;
  max-width: 100%; 

  .hero-image {
    max-width: 100%; 
    height: auto;
    display: block;
    border-radius: 25px;
  }
`
