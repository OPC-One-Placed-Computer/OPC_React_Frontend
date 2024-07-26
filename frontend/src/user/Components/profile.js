import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileHooks from '../Hooks/profileHooks';
import EditProfileModal from './editProfileModal';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaEdit, FaUserCircle } from 'react-icons/fa';

const Profile = () => {
  const {
    fullName,
    firstName,
    lastName,
    email,
    address,
    imageUrl,
    editedEmail,
    editedAddress,
    successMessage,
    errorMessage,
    editedFirstName,
    editedLastName,
    previewImageUrl,
    setSuccessMessage,
    setErrorMessage,
    setPreviewImageUrl,
    setEditedFirstName,
    setEditedLastName,
    setEditedEmail,
    setEditedAddress,
    handleImageChange,
    handleCancelClick,
    handleSaveClick,
    handleChangePassword,
  } = ProfileHooks();

  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);

  return (
    <ProfileContainer>
      <AccountDetailsLabel>Account Details</AccountDetailsLabel>
      <ProfileImageContainer>
        {imageLoadError || !imageUrl ? (
          <DefaultProfileIcon />
        ) : (
          <ProfileImage
            src={imageUrl}
            alt="Profile"
            onError={() => setImageLoadError(true)}
          />
        )}
      </ProfileImageContainer>
      <ProfileDetails>
        <ProfileDetailItem>
          <ProfileDetailIcon>
            <FaUser />
          </ProfileDetailIcon>
          <ProfileDetailValue>{fullName}</ProfileDetailValue>
        </ProfileDetailItem>
        <ProfileDetailItem>
          <ProfileDetailIcon>
            <FaEnvelope />
          </ProfileDetailIcon>
          <ProfileDetailValue>{email}</ProfileDetailValue>
        </ProfileDetailItem>
        <ProfileDetailItem>
          <ProfileDetailIcon>
            <FaMapMarkerAlt />
          </ProfileDetailIcon>
          <ProfileDetailValue>{address}</ProfileDetailValue>
        </ProfileDetailItem>
      </ProfileDetails>
      <EditButtonsContainer>
        <EditButton onClick={() => setEditProfileModalOpen(true)}>
          <FaEdit /> Edit Profile
        </EditButton>
      </EditButtonsContainer>

      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setEditProfileModalOpen(false)}
        firstName={firstName}
        lastName={lastName}
        editedFirstName={editedFirstName}
        editedLastName={editedLastName}
        editedEmail={editedEmail}
        previewImageUrl={previewImageUrl}
        editedAddress={editedAddress}
        setPreviewImageUrl={setPreviewImageUrl}
        setEditedFirstName={setEditedFirstName}
        setEditedLastName={setEditedLastName}
        setEditedEmail={setEditedEmail}
        setEditedAddress={setEditedAddress}
        handleSaveClick={handleSaveClick}
        handleImageChange={handleImageChange}
        handleCancelClick={handleCancelClick}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
        imageUrl={imageUrl}
        isEditing={true}
        successMessage={successMessage}
        errorMessage={errorMessage}
        handleChangePassword={handleChangePassword}
      />
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fafafa;
  max-width: 500px;
  width: 90%;
`;

const AccountDetailsLabel = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
  font-weight: 700;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const DefaultProfileIcon = styled(FaUserCircle)`
  width: 150px;
  height: 150px;
  color: #ccc;
  border: 4px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

const ProfileDetailItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  transition: background-color 0.3s ease;
`;

const ProfileDetailIcon = styled.div`
  margin-right: 15px;
  color: #555;
  font-size: 1.5rem;
`;

const ProfileDetailValue = styled.div`
  flex: 1;
  color: #333;
  text-align: left;
  max-width: 200px;
  font-size: 1rem;
  font-weight: 500;
`;

const EditButtonsContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

const EditButton = styled.button`
  font-family: 'Poppins', sans-serif;
  padding: 10px 20px;
  background-color: #000099;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.25);
  }
`;
