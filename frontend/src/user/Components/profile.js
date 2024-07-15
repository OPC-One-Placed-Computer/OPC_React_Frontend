import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import ProfileHooks from '../Hooks/profileHooks';


const Profile = () => {
  const {
    userId,
    fullName,
    email,
    address,
    isLoading,
    imageUrl,
    previewImageUrl,
    isEditing,
    editedFullName,
    editedEmail,
    editedAddress,
    successMessage,
    errorMessage,
    setEditedFullName,
    setEditedEmail,
    setEditedAddress,
    handleImageChange,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleChangePassword,
  } = ProfileHooks();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePasswordError, setChangePasswordError] = useState('');
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
  
    if (!oldPassword || !newPassword || !confirmPassword) {
      setChangePasswordError('Please fill out all fields.');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setChangePasswordError('Passwords do not match.');
      return;
    }
  
    setChangePasswordLoading(true);
  
    try {
      await handleChangePassword(oldPassword, newPassword, confirmPassword);
      console.log('Password updated successfully!');
      setChangePasswordError('');
    } catch (error) {
      console.error('Password change failed:', error);
      setChangePasswordError('Failed to change password. Please try again.');
    } finally {
      setChangePasswordLoading(false);
    }
  };
  
  const toggleChangePasswordModal = () => {
    setShowChangePasswordModal(!showChangePasswordModal);
    setChangePasswordError('');
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <h2>Profile</h2>
      </ProfileHeader>
      {isLoading ? (
        <LoadingContainer>Loading...</LoadingContainer>
      ) : (
        <ProfileInfo>
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <ProfileImageContainer>
            <ProfileImage src={previewImageUrl || imageUrl} alt="Profile Picture" />
            {isEditing && (
              <UploadIcon>
                <label htmlFor="upload-input">
                  <FaPlus />
                  <input
                    id="upload-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </UploadIcon>
            )}
          </ProfileImageContainer>
          <ProfileDetail>
            <ProfileDetailItem>
              <ProfileDetailLabel>Full Name:</ProfileDetailLabel>
              {isEditing ? (
                <ProfileInput
                  type="text"
                  value={editedFullName}
                  onChange={(e) => setEditedFullName(e.target.value)}
                />
              ) : (
                <ProfileDetailValue>{fullName}</ProfileDetailValue>
              )}
            </ProfileDetailItem>
            <ProfileDetailItem>
              <ProfileDetailLabel>Email:</ProfileDetailLabel>
              {isEditing ? (
                <ProfileInput
                  type="text"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
              ) : (
                <ProfileDetailValue>{email}</ProfileDetailValue>
              )}
            </ProfileDetailItem>
            <ProfileDetailItem>
              <ProfileDetailLabel>Address:</ProfileDetailLabel>
              {isEditing ? (
                <ProfileInput
                  type="text"
                  value={editedAddress}
                  onChange={(e) => setEditedAddress(e.target.value)}
                />
              ) : (
                <ProfileDetailValue>{address}</ProfileDetailValue>
              )}
            </ProfileDetailItem>
            <ProfileDetailItem>
              <ProfileDetailLabel>User ID:</ProfileDetailLabel>
              <ProfileDetailValue>{userId}</ProfileDetailValue>
            </ProfileDetailItem>
          </ProfileDetail>
          <ProfileActions>
            {isEditing ? (
              <>
                <SaveProfileButton onClick={handleSaveClick}>Save</SaveProfileButton>
                <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
              </>
            ) : (
              <EditProfileButton onClick={handleEditClick}>Edit Profile</EditProfileButton>
            )}
          </ProfileActions>
          {!isEditing && (
            <ChangePasswordLink onClick={toggleChangePasswordModal}>Change Password</ChangePasswordLink>
          )}
          {showChangePasswordModal && (
            <ModalBackdrop onClick={toggleChangePasswordModal}>
              <ChangePasswordModal onClick={(e) => e.stopPropagation()}>
                <ChangePasswordHeader>
                  <h3>Change Password</h3>
                  <CloseModalButton onClick={toggleChangePasswordModal}>×</CloseModalButton>
                </ChangePasswordHeader>
                <ChangePasswordForm onSubmit={handlePasswordChange}>
                  <PasswordInput
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                  <PasswordInput
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <PasswordInput
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <ChangePasswordButton type="submit" disabled={changePasswordLoading}>
                    {changePasswordLoading ? 'Changing...' : 'Change Password'}
                  </ChangePasswordButton>
                  {changePasswordError && <ErrorMessage>{changePasswordError}</ErrorMessage>}
                </ChangePasswordForm>
              </ChangePasswordModal>
            </ModalBackdrop>
          )}
        </ProfileInfo>
      )}
    </ProfileContainer>
  );
};

export default Profile;



const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin: 20px auto;
`;
const ProfileHeader = styled.div`
  width: 100%;
  text-align: center;
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProfileImageContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin-top: 20px;
`;
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: contain;
  border: 4px solid #ffffff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;
const UploadIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #007bff;
  color: #ffffff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  label {
    cursor: pointer;
  }
`;
const ProfileDetail = styled.div`
  margin-top: 20px;
`;
const ProfileDetailItem = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const ProfileDetailLabel = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;
const ProfileDetailValue = styled.div`
  color: #495057;
`;
const ProfileActions = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
const EditProfileButton = styled.button`
  font-family: 'Poppins', sans-serif;
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
const SaveProfileButton = styled.button`
  font-family: 'Poppins', sans-serif;
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;
const CancelButton = styled.button`
  font-family: 'Poppins', sans-serif;
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c82333;
  }
`;
const LoadingContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: #6c757d;
  text-align: center;
  margin-top: 20px;
`;
const ProfileInput = styled.input`
  font-family: 'Poppins', sans-serif;
  border: 1px solid #ced4da;
  border-radius: 25px;
  padding-left: 10px;
  font-size: 14px;
`;
const SuccessMessage = styled.div`
  color: #28a745;
  margin-bottom: 10px;
`;
const ErrorMessage = styled.div`
  color: #dc3545;
  margin-bottom: 10px;
`;
const ChangePasswordLink = styled.button`
  font-family: 'Poppins', sans-serif;
  padding: 10px 20px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ChangePasswordModal = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 300px;
  width: 100%;
`;
const ChangePasswordHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const CloseModalButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
`;

const ChangePasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const PasswordInput = styled.input`
  font-family: 'Poppins', sans-serif;
  border: 1px solid #ced4da;
  border-radius: 25px;
  padding: 10px;
  margin-bottom: 10px;
`;

const ChangePasswordButton = styled.button`
  font-family: 'Poppins', sans-serif;
  padding: 10px 20px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;
