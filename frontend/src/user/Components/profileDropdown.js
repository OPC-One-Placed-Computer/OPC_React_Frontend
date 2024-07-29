import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiAccountPinCircleFill } from "react-icons/ri";
import styled from 'styled-components';
import axios from 'axios';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://onepc.online/api/v1/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/loginForm');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleIconClick = () => {
    if (isLoggedIn) {
      toggleDropdown();
    } else {
      navigate('/loginForm');
    }
  };

  return (
    <ProfileContainer ref={dropdownRef}>
      <ProfileIcon onClick={handleIconClick}>
        <RiAccountPinCircleFill size={24} />
      </ProfileIcon>
      {isOpen && isLoggedIn && (
        <DropdownMenu>
          <Link to="/placedOrderItems" className="dropdown-item" onClick={toggleDropdown}>My Purchase</Link>
          <Link to="/profile" className="dropdown-item" onClick={toggleDropdown}>My Account</Link>
          <Link className="dropdown-item" onClick={handleLogout}>Logout</Link>
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
`;

const ProfileIcon = styled.div`
  cursor: pointer;
  color: white;

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

const DropdownMenu = styled.div`
  width: 105px;
  position: absolute;
  padding: 10px;
  top: 50px;
  right: -50px;
  background-color: #2d1663;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;

  @media (max-width: 768px) {
    right: 0;
  }

  .dropdown-item {
    color: white;
    text-decoration: none;
    display: block;
    transition: background-color 0.3s ease;

    &:hover {
      color: #ff6600;
    }
  }
`;
