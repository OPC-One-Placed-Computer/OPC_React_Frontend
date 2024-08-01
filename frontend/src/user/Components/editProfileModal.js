import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaPlus, FaUserCircle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfileModal = ({
  isOpen,
  onClose,
  editedFirstName,
  editedLastName,
  editedEmail,
  editedAddress,
  setEditedFirstName,
  setEditedLastName,
  setEditedEmail,
  setEditedAddress,
  handleSaveClick,
  handleImageChange,
  imageUrl,
  previewImageUrl,
  setPreviewImageUrl,
  isEditing,
  successMessage,
  errorMessage,
  setSuccessMessage,
  setErrorMessage,
  handleCancelClick,
  handleChangePassword,
}) => {
  const [currentView, setCurrentView] = useState('editProfile');
  const toastContainerRef = useRef(null); 
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [changePasswordError, setChangePasswordError] = useState('');
 

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

    try {
      await handleChangePassword(oldPassword, newPassword, confirmPassword);
      console.log('Password updated successfully!');
      setChangePasswordError('');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Password change failed:', error);
      setChangePasswordError('Failed to change password. Please try again.');
    } 
  };

  useEffect(() => {
  
    return () => {
      toast.dismiss(); 
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setSuccessMessage(null); 
    }
    if (errorMessage) {
      toast.error(errorMessage);
      setErrorMessage(null);
    }
    if (changePasswordError) {
      toast.error(changePasswordError);
      setChangePasswordError(null); 
    }
  }, [successMessage, errorMessage, changePasswordError, setSuccessMessage, setErrorMessage]);

  const handleCancel = () => {
    handleCancelClick();
    onClose();
  };

  return (
    <>
      <ToastContainer ref={toastContainerRef} />
      {isOpen && (
        <ModalBackdrop onClick={onClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>User Account</h3>
              <CloseButton onClick={onClose} aria-label="Close modal">×</CloseButton>
            </ModalHeader>

            <ModalNav>
              <NavItem
                active={currentView === 'editProfile'}
                onClick={() => setCurrentView('editProfile')}
              >
                Edit Profile
              </NavItem>
              <NavItem
                active={currentView === 'changePassword'}
                onClick={() => setCurrentView('changePassword')}
              >
                Change Password
              </NavItem>
            </ModalNav>

            {currentView === 'editProfile' && (
              <>
                <ProfileImageContainer>
                  {previewImageUrl || imageUrl ? (
                    <ProfileImage src={previewImageUrl || imageUrl} alt="Profile Picture" />
                  ) : (
                    <DefaultProfileIcon />
                  )}
                  {isEditing && (
                    <UploadIcon htmlFor="upload-input">
                      <FaPlus />
                      <input
                        id="upload-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleImageChange(e);
                          setPreviewImageUrl(URL.createObjectURL(e.target.files[0]));
                        }}
                        style={{ display: 'none' }}
                      />
                    </UploadIcon>
                  )}
                </ProfileImageContainer>

                <ModalBody>
                  <ProfileDetailItem>
                    <ProfileDetailLabel>First Name:</ProfileDetailLabel>
                    <ProfileInput
                      type="text"
                      value={editedFirstName}
                      onChange={(e) => setEditedFirstName(e.target.value)}
                    />
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <ProfileDetailLabel>Last Name:</ProfileDetailLabel>
                    <ProfileInput
                      type="text"
                      value={editedLastName}
                      onChange={(e) => setEditedLastName(e.target.value)}
                    />
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <ProfileDetailLabel>Email:</ProfileDetailLabel>
                    <ProfileInput
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                    />
                  </ProfileDetailItem>
                  <ProfileDetailItem>
                    <ProfileDetailLabel>Address:</ProfileDetailLabel>
                    <ProfileInput
                      type="text"
                      value={editedAddress}
                      onChange={(e) => setEditedAddress(e.target.value)}
                    />
                  </ProfileDetailItem>
                </ModalBody>

                <ModalFooter>
                  <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                  <SaveButton onClick={handleSaveClick}>Save</SaveButton>
                </ModalFooter>
              </>
            )}

            {currentView === 'changePassword' && (
              <>
                <ModalBody>
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
                </ModalBody>
                <ModalFooter>
                  <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                  <SaveButton onClick={handlePasswordChange}>Save</SaveButton>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </ModalBackdrop>
      )}
    </>
  );
};

export default EditProfileModal;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  * {
    -webkit-tap-highlight-color: transparent;
  }
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  width: 90%; /* Make it responsive */
  max-width: 450px; /* Maximum width */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  position: relative;
  transition: height 1s ease-in-out;
  overflow-x: auto;
  


  @media (max-width: 768px) {
    padding: 20px;
    width: 95%;
    max-width: none; 
  }

  @media (max-width: 480px) {
    padding: 15px;
    width: 80%;
    max-width: none; 
  }
`;


const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    font-size: 1.5em;
    color: #333;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #ff5c5c;
  }
`;

const ModalNav = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const NavItem = styled.div`
  flex: 1;
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;
  border-bottom: ${(props) => (props.active ? '3px solid #000099' : 'none')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? '#000099' : '#333')};
  transition: border-bottom 0.3s, color 0.3s;

  &:hover {
    color: #000099;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;

`;

const ProfileImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

  const UploadIcon = styled.label`
  position: absolute;
  bottom: -10px;
  background-color: #007bff;
  color: #ffffff;
  right: 40%;
  transform: translateX(50%);
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

@media (max-width: 1024px) {
  right: 45%;
  width: 23px;
  height: 23px;
}

@media (max-width: 768px) {
  right: 40%;
}

@media (max-width: 480px) {
  right: 35%;
}
`;


const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;

`;

const ProfileDetailItem = styled.div`
  display: flex;
  margin-bottom: 15px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProfileDetailLabel = styled.div`
  font-weight: bold;
  margin-right: 10px;
  width: 100px; 
  font-family: 'Poppins', sans-serif;
  color: #333;

  @media (max-width: 768px) {
    align-self: flex-start;
    margin-right: 0; 
    margin-bottom: 5px; 
    width: auto; 
    font-size: 14px;
  }
`;

const ProfileInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
  color: #333;

  &:focus {
    border-color: #ff6600;
    outline: none;
  }

  @media (max-width: 768px) {
    width: 90%;
    font-size: 12px;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between; 
  margin-top: 20px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const SaveButton = styled.button`
  flex: 1;
  font-family: 'Poppins', sans-serif;
  padding: 10px 20px;
  background-color: #000099;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  @media (max-width: 768px) {
    padding: 12px 15px; 
    margin-left: 5px; 
  }

  @media (max-width: 480px) {
    padding: 10px; 
    margin-left: 0; 
    margin-top: 10px;
    width: 100%; 

`;

const CancelButton = styled.button`
  flex: 1;
  font-family: 'Poppins', sans-serif;
  padding: 10px 20px;
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;

  @media (max-width: 768px) {
    padding: 12px 15px;
    margin-right: 5px; 
  }

  @media (max-width: 480px) {
    padding: 10px; 
    margin-right: 0; 
    margin-top: 10px; 
    width: 100%;
  }
`;

const PasswordInput = styled.input`
  font-family: 'Poppins', sans-serif;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  margin-bottom: 15px;
  width: 95%;
  color: #333;

  &:focus {
    border-color: #ff6600;
    outline: none;
  }
`;
const DefaultProfileIcon = styled(FaUserCircle)`
  width: 150px;
  height: 150px;
  color: #ccc;
`;
