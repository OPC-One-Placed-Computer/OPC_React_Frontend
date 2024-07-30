import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaStore } from "react-icons/fa";
import { ReactComponent as Logo } from '../../assets/1.svg'; 
import styled from 'styled-components';
import ProfileDropdown from './profileDropdown';
import ProductCountHooks from '../Hooks/productCountHooks';

const NavigationBar = () => {
  const productCount = ProductCountHooks();

  return (
    <NavBar>
      <LogoContainer>
        <Link to="/homepage">
          <Logo className="logo" />
        </Link>
      </LogoContainer>
      <Content>
        <NavItem>
          <Link to="/products" className="nav-item desktop-only">
            Products
          </Link>
          <IconContainer className="mobile-only">
            <Link to="/products" className='nav-item'>
              <FaStore size={24} color="white" />
            </Link>
          </IconContainer>
        </NavItem>
        <Link to="/cartPage" className="nav-item">
          <CartIconContainer>
            <MdOutlineShoppingCart size={24} />
            {productCount > 0 && <ItemCount>{productCount}</ItemCount>}
          </CartIconContainer>
        </Link>
        <ProfileDropdown className="nav-item" />
      </Content>
    </NavBar>
  );
};

export default NavigationBar;

const NavBar = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #13072E;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  height: 70px; 

  @media (max-width: 768px) {
    height: 60px; 
    padding: 10px;
  }
`;

const LogoContainer = styled.div`
  flex: 1;
  display: flex;
  margin-left: 40px;
  align-items: center;

  .logo {
    margin-top: 10px;
    width: 100px; 
    height: 100px; 
  }

  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 20px;

    .logo {
      width: 80px; 
      height: 80px;
    }
  }

  @media (max-width: 480px) {
    .logo {
      width: 80px; 
      height: 80px; 
    }
  }
`;

const Content = styled.div`
  display: flex;
  margin-right: 80px;
  margin-top: 10px;
  justify-content: flex-end;
  gap: 10px;

  .nav-item {
    position: relative;
    color: white;
    text-align: center;
    border-radius: 25px;
    margin-right: 10px;
    padding: 0 20px;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease;

    @media (max-width: 768px) {
      padding: 0 5px;
    }
    
    &::before,
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 0;
      height: 2px;
      background-color: #ff6600;
      transition: width 0.3s ease, left 0.3s ease, right 0.3s ease;
    }
    
    &::before {
      left: 50%;
    }
    
    &::after {
      right: 50%;
    }

    &:hover::before {
      width: 50%;
      left: 0;
    }
    
    &:hover::after {
      width: 50%;
      right: 0;
    }
  }

  @media (max-width: 768px) {
    margin-right: 25px;
    padding-top: 20px;
    gap: 20px;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  
  .desktop-only {
    display: block;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .mobile-only {
    display: none;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-rigth: 25px;
`;

const CartIconContainer = styled.div`
  position: relative;
`;

const ItemCount = styled.span`
  position: absolute;
  width: 15px;
  height: 15px;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  padding: 2px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  display: flex;
`;
