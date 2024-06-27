import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiAccountPinCircleFill } from "react-icons/ri";
import styled from 'styled-components';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ProfileContainer>
      <ProfileIcon onClick={toggleDropdown}>
        <RiAccountPinCircleFill size={24} />
      </ProfileIcon>
      {isOpen && (
        <DropdownMenu>
          <Link to="/placedOrderItems" className="dropdown-item" onClick={toggleDropdown}>My Purchase</Link>
          <Link to="/profile" className="dropdown-item" onClick={toggleDropdown}>Profile</Link>
          <Link to="/loginForm" className="dropdown-item" onClick={toggleDropdown}>Login</Link>
        </DropdownMenu>
      )}
    </ProfileContainer>
  );
};

export default ProfileDropdown;

const ProfileContainer = styled.div`
  position: relative;
  display: flex; 
  align-items: center;
`

const ProfileIcon = styled.div`
  cursor: pointer;
  color: white;

  &:hover {
    color: #ccc;
  }
`

const DropdownMenu = styled.div`
  width: 105px;
  position: absolute;
  padding: 10px;
  top: 50px;
  right: -50px;
  background-color: #2d1663;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  
  .dropdown-item {
    color: white;
    text-decoration: none;
    display: block;
    transition: background-color 0.3s ease;

    &:hover {
      color: #ff6600;
    }
  }
`
