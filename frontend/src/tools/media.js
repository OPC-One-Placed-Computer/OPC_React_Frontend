import axios from 'axios';

const getImageUrl = async (name) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`https://onepc.online/api/v1/download/file?path=${encodeURIComponent(name)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    });

    return URL.createObjectURL(response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error fetching image:', error.response.status, error.response.data);
    } else if (error.request) {
  
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

export default getImageUrl;
