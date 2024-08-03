import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Footer from '../Components/footer';
import FeaturedProducts from '../Components/featuredProducts';
import homeAnimated from '../Animations/homeAnimated.json';
import Lottie from 'lottie-react';

const Homepage = () => {
  return (
    <HomePageParentContainer>
      <HomepageCon>
        <HeroHeader>
          <HeroCon>
            <Content>
              <TextContent className="animate-text">
                <Text>
                  <h1>
                    Welcome to <br />
                    <span className="animated-span">One Place Computer</span>
                  </h1>
                  <p>Where high-quality products are in one place.</p>
                  <Link to="/products" className="btn btn-primary">
                    View Products
                  </Link>
                </Text>
              </TextContent>
              <ImgContent className="animate-img">
                <Lottie animationData={homeAnimated} autoplay loop style={{ maxWidth: '100%', height: 'auto' }} />
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
  * {
    -webkit-tap-highlight-color: transparent;
  }
  overflow-x: hidden;
`;

const HomepageCon = styled.div`
  background-color: #13072e;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    padding: 25px;
  }

  @media (max-width: 480px) {
    padding: 0;
  }
`;

const HeroHeader = styled.header`
  text-align: center;
  padding: 20px;
  width: 100%;
`;

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
  @media (max-width: 480px) {
    padding: 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;

  @media (max-width: 768px) {
    margin-left: 0;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const TextContent = styled.div`
  flex: 1;
  text-align: center;
  margin-top: 20px;
  animation: ${slideInRight} 1s forwards;

  @media (min-width: 768px) {
    text-align: left;
    margin-bottom: 0;
  }

  h1 {
    font-size: 6vw; 
    width: 100%;

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }

    @media (min-width: 1024px) {
      font-size: 3rem;
    }
  }

  p {
    font-size: 4vw;
    margin: 10px 0;

    @media (min-width: 768px) {
      font-size: 1rem;
    }

    @media (min-width: 1024px) {
      font-size: 1.125rem;
    }
  }

  .btn {
    background-color: #ffffff;
    color: #13072e;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 25px;
    transition: background-color 0.3s ease;
    display: inline-block;
    margin-top: 10px;
    font-size: 3.5vw;

    @media (min-width: 768px) {
      font-size: 1rem;
    }

    @media (min-width: 1024px) {
      font-size: 1.125rem;
    }
  }

  .btn:hover {
    background-color: #ff6600;
    color: #ffffff;
  }

  .animated-span {
    font-size: 8vw;
    color: #ff6600;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    animation: type 5s steps(40, end) infinite;
    border-right: 2px solid white;

    @media (min-width: 768px) {
      font-size: 2.2rem;
    }

    @media (min-width: 1024px) {
      font-size: 3.5rem;
    }
  }

  @keyframes type {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;

const Text = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

const ImgContent = styled.div`
  flex: 1;
  text-align: center;
  max-width: 100%;
  animation: ${slideInLeft} 1s forwards;

  @media (max-width: 480px) {
    margin-top: 30px;
  }
`;
