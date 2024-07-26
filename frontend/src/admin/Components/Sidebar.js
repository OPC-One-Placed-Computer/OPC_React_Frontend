import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillProduct } from "react-icons/ai";
import logo from '../../assets/logo.png';
import { FaClipboardList } from "react-icons/fa";
import { DiGoogleAnalytics } from "react-icons/di";


const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo><img src={logo} alt="Logo" /></Logo>
      <SidebarNav>
        <SidebarLink to="/admin/manageProducts" aria-label="Manage Products">
          <IconWrapper><AiFillProduct /></IconWrapper>
          Manage Products
        </SidebarLink>
        <SidebarLink to="/admin/manageOrders" aria-label="Manage Orders">
          <IconWrapper><FaClipboardList /></IconWrapper>
          Manage Orders
        </SidebarLink>
        <SidebarLink to="/admin/salesAnalytics" aria-label="Sales Report">
          <IconWrapper><DiGoogleAnalytics /></IconWrapper>
          Sales Report
        </SidebarLink>
        <LogoutContainer>
        <LogoutButton to="/loginForm" aria-label="Logout">
          <div className="sign">
            <svg viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div className="text">Logout</div>
        </LogoutButton>
        </LogoutContainer>
      </SidebarNav>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  background-color: #13072E;
  width: 200px;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  border-radius: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 1000;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
    box-shadow: none;
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px; 
  
  img {
    width: 100px; 
    height: auto;
  }

  border-bottom: 2px solid #ffffff; 
  padding-bottom: 20px; 
  width: 100%;
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SidebarLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 10px;
  font-size: 14px;
  border-radius: 25px;
  margin-bottom: 10px;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  position: relative;
  text-align: center;

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
`;

const LogoutContainer = styled.div`
  margin-top: auto;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-start;
`;

const LogoutButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: #dc3545;
  text-decoration: none;

  .sign {
    width: 100%;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sign svg {
    width: 17px;
  }

  .sign svg path {
    fill: white;
  }

  .text {
    position: absolute;
    font-family: 'Poppins', sans-serif;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 14px;
    font-weight: 600;
    transition-duration: .3s;
  }

  &:hover {
    width: 125px;
    border-radius: 40px;
    transition-duration: .3s;
  }

  &:hover .sign {
    width: 30%;
    transition-duration: .3s;
    padding-left: 10px;
  }

  &:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
  }

  &:active {
    transform: translate(2px, 2px);
  }
`;

const IconWrapper = styled.span`
  font-size: 20px; 
  margin-right: 10px;
`;
