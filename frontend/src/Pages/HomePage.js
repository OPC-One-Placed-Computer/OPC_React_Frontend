import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import sampleImage from '../assets/bc_image.jpg'; 

const Homepage = () => {
  return (
    <HomepageCon>
      <HeroHeader>
        <HeroCon>
          <Content>
            <TextContent>
              <h1>Welcome to <br /><span className='animated-span'>One Place Computer</span></h1>
              <p>Explore our wide range of products and services.</p>
              <Link to="/products" className="btn btn-primary">View Products</Link>
            </TextContent>
            <ImgContent>
              <img src={sampleImage} alt="Sample" className="hero-image" />
            </ImgContent>
          </Content>
        </HeroCon>
      </HeroHeader>
    </HomepageCon>
  );
};

export default Homepage;

const HomepageCon = styled.div `
background-color: #13072E;
color: white;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const HeroHeader = styled.header `
text-align: center;
padding: 20px;
`
const HeroCon = styled.div `
border-radius: 15px;
background: linear-gradient(135deg, #13072E,#3f2182 );
max-width: 1400px; 
width: 95%; 
max-height: 600px; 
height: 80vh; 
display: flex;
justify-content: space-between; 
align-items: center; 
padding: 20px;
box-sizing: border-box; 
overflow: hidden; 
position: relative; 
margin: 0 auto;

h1 {
  font-size: 3em;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
  margin-bottom: 30px;
}
`
const Content = styled.div `
display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
`
const TextContent = styled.div `
flex: 1;
text-align: left;

.btn {
  background-color: #ffffff;
  color: #13072E;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 25px;
  transition: background-color 0.3s ease;
}
.btn:hover {
  background-color: #ff6600;
  color: #ffffff;
}

.animated-span {
  font-size: 55px;
  color: #ff6600;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  animation: type 5s steps(30, end) infinite;
  border-right: 2px solid white;
}

@keyframes type {
  from { width: 0; }
  to { width: 100%; }
}
`
const ImgContent = styled.div `
  flex: 1;
  text-align: center; 

    .hero-image {
      max-width: 100%;
      height: auto;
      display: block;
      border-radius: 25px;
    }
`
