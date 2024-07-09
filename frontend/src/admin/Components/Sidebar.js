import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillProduct } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarTitle>Admin Menu</SidebarTitle>
      <SidebarNav>
        <SidebarLink to="/admin/manageProducts">
          <IconWrapper><AiFillProduct /></IconWrapper>
          Manage Products
        </SidebarLink>
        <SidebarLink to="/admin/manageOrders">
          <IconWrapper><FaClipboardList /></IconWrapper>
          Manage Orders
        </SidebarLink>
        <LogoutLink to="/loginForm"> {/* Updated to navigate to loginForm */}
          Logout
        </LogoutLink>
      </SidebarNav>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  background-color: #13072E;
  width: 200px;
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
  border-radius: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
`;

const SidebarTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: white;
  text-align: center;
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const SidebarLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 10px;
  font-size: 1rem;
  border-radius: 25px;
  margin-bottom: 10px;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #ff6600;
    color: #fff;
  }
`;

const LogoutLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 10px;
  font-size: 1rem;
  border-radius: 25px;
  margin-bottom: 10px;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #ff6600;
    color: #fff;
  }
`;

const IconWrapper = styled.span`
  font-size: 1.5rem; 
  margin-right: 10px;
`;


