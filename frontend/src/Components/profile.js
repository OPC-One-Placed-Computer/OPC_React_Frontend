import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('https://onepc.online/api/v1/current-authentication', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const { data } = response.data;
        const { user_id, first_name, last_name, email, address } = data;
    
        setUserId(user_id);
        setFirstName(first_name);
        setLastName(last_name);
        setEmail(email);
        setAddress(address);
      })
      .catch(error => {
        navigate('/login');
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    const token = localStorage.getItem('token');
    axios.post('https://onepc.online/api/v1/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      localStorage.removeItem('token');
      navigate('/');
    })
    .catch(error => {
      localStorage.removeItem('token');
      navigate('/');
    });
  };

  const fullName = `${firstName} ${lastName}`;

  return (
    <ProfileContainer>
      <h2>Profile</h2>
      <ProfileInfo className={isLoggingOut ? 'fadeOut' : ''}>
        <ProfileImage src={'https://via.placeholder.com/150'} alt="Profile" />
        <Status>Full Name: {fullName}</Status>
        <Status>Email: {email}</Status>
        <Status>Address: {address}</Status>
        <Status>User ID: {userId}</Status> {/* Displaying user_id */}
        <EditProfileButton>Edit Profile</EditProfileButton>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </ProfileInfo>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileInfo = styled.div`
  opacity: 1;
  transition: opacity 0.5s ease-out;

  &.fadeOut {
    opacity: 0;
  }
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 20px;
`;

const Status = styled.p`
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
`;

const EditProfileButton = styled.button`
  margin-top: 10px;
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const LogoutButton = styled.button`
  margin-top: 10px;
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10px;

  &:hover {
    background-color: #c82333;
  }
`;
