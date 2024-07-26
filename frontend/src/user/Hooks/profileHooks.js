import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileHooks = () => {
  const [userId, setUserId] = useState('');
  const [fullName, setFullName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('https://onepc.online/api/v1/current/authentication', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { data } = response.data;
          const { user_id, first_name, last_name, email, address, image_path } = data;
  
          setUserId(user_id);
          setFullName(`${first_name} ${last_name}`);
          setFirstName(first_name);
          setLastName(last_name);
          setEmail(email);
          setAddress(address);
          setEditedFirstName(first_name);
          setEditedLastName(last_name);
          setEditedEmail(email);
          setEditedAddress(address);
          fetchImageUrl(image_path, token);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
  
    fetchUserProfile();
  }, [navigate]);
  

  const fetchImageUrl = async (imagePath, token) => {
    try {
      const response = await axios.get(`https://onepc.online/api/v1/download/file?path=${imagePath}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', 
      });

      const imageUrl = URL.createObjectURL(response.data);
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const firstName = editedFirstName?.trim() || '';
        const lastName = editedLastName?.trim() || '';
        const email = editedEmail?.trim() || '';
        const address = editedAddress?.trim() || '';
  
        const formData = new FormData();
        formData.append('first_name', firstName);
        if (lastName) {
          formData.append('last_name', lastName);
        }
        formData.append('email', email);
        formData.append('address', address);
        if (selectedImage) {
          formData.append('image', selectedImage);
        }
  
        const response = await axios.post(
          `https://onepc.online/api/v1/user/update/${userId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
  
        console.log('Response:', response);
  
        const { message, user } = response.data;
        if (user) {
          setFullName(`${user.first_name} ${user.last_name}`);
          setFirstName(user.first_name);
          setLastName(user.last_name);
          setEmail(user.email);
          setAddress(user.address);
          setEditedFirstName(user.first_name);
          setEditedLastName(user.last_name);
          setEditedEmail(user.email);
          setEditedAddress(user.address);
          setSuccessMessage(message);
          setSelectedImage(null);
          setPreviewImageUrl(null);
          fetchImageUrl(user.image_path, token);
          setIsEditing(false);
        } else {
          throw new Error('Invalid response data');
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
    }
  };
  
  const handleCancelClick = () => {
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
    setEditedEmail(email);
    setEditedAddress(address);
    setPreviewImageUrl(null);
    setIsEditing(false);
  };
  

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    try {
      const response = await axios.get('https://onepc.online/api/v1/current/authentication', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data; 
    } catch (error) {
      console.error('Error fetching current user data:', error);
      throw error;
    }
  };

  const handleChangePassword = async (oldPassword, newPassword, confirmPassword) => {
    if (newPassword.trim() !== confirmPassword.trim()) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    try {
      const currentUser = await fetchCurrentUser();

      const formData = new FormData();
      formData.append('old_password', oldPassword.trim());
      formData.append('new_password', newPassword.trim());
      formData.append('new_password_confirmation', confirmPassword.trim());
      formData.append('first_name', currentUser.first_name);
      formData.append('last_name', currentUser.last_name);
      formData.append('email', currentUser.email);
      formData.append('address', currentUser.address);

      await axios.post(`https://onepc.online/api/v1/user/update/${currentUser.user_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Password updated successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      if (error.response && error.response.status === 422) {
        setErrorMessage(error.response.data.message);
        console.log(error.response.data.errors || {});
      } else {
        setErrorMessage('Failed to change password. Please try again.');
      }
    }
  };

  return {
    fullName,
    firstName,
    lastName,
    email,
    address,
    isLoading,
    imageUrl,
    previewImageUrl,
    isEditing,
    editedFirstName,
    editedLastName,
    editedEmail,
    editedAddress,
    successMessage,
    errorMessage,
    setSuccessMessage,
    setErrorMessage,
    setEditedFirstName,
    setEditedLastName,
    setEditedEmail,
    setEditedAddress,
    handleImageChange,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleChangePassword,
    setPreviewImageUrl
  };
};

export default ProfileHooks;
