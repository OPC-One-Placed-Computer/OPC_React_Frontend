import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ProfileHooks = () => {
  const [userId, setUserId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);
  const [editedFullName, setEditedFullName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [originalFullName, setOriginalFullName] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  const [originalAddress, setOriginalAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('https://onepc.online/api/v1/current-authentication', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { data } = response.data;
          const { user_id, first_name, last_name, email, address, image_path } = data;

          console.log(data);

          setUserId(user_id);
          setFullName(`${first_name} ${last_name}`);
          setEmail(email);
          setAddress(address);
          setOriginalFullName(`${first_name} ${last_name}`);
          setOriginalEmail(email);
          setOriginalAddress(address);
          setEditedFullName(`${first_name} ${last_name}`);
          setEditedEmail(email);
          setEditedAddress(address);
          fetchImageUrl(image_path, token);
          setIsLoading(false);
          console.log(token);
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
        const firstName = editedFullName.split(' ')[0]?.trim() || '';
        const lastName = editedFullName.split(' ')[1]?.trim() || '';
        const email = editedEmail?.trim() || '';
        const address = editedAddress?.trim() || '';
  
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('address', address);
        if (selectedImage) {
          formData.append('image', selectedImage);
        }
  
        const response = await axios.post(
          `https://onepc.online/api/v1/update-user/${userId}`,
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
          setEmail(user.email);
          setAddress(user.address);
          setOriginalFullName(`${user.first_name} ${user.last_name}`);
          setOriginalEmail(user.email);
          setOriginalAddress(user.address);
          setEditedFullName(`${user.first_name} ${user.last_name}`);
          setEditedEmail(user.email);
          setEditedAddress(user.address);
          setSuccessMessage(message);
          setSelectedImage(null);
          fetchImageUrl(user.image_path, token);
          setPreviewImageUrl(null);
          fetchImageUrl(user.imagePath, token);
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
    setEditedFullName(originalFullName);
    setEditedEmail(originalEmail);
    setEditedAddress(originalAddress);
    setIsEditing(false);
    setPreviewImageUrl(null);
  };

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    try {
      const response = await axios.get('https://onepc.online/api/v1/current-authentication', {
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

      await axios.post(`https://onepc.online/api/v1/update-user/${currentUser.user_id}`, formData, {
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
  };
};

export default ProfileHooks;
