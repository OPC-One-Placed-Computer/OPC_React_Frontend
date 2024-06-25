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
  z-index: 10000; 
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
  position: absolute;
  top: 35px;
  right: 0;
  background-color: #ff6600;
  border: 1px solid #ccc;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  
  .dropdown-item {
    color: white;
    text-decoration: none;
    display: block;
    z-index: 11000;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #575757;
    }
  }
`
