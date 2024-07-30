import axios from 'axios';

const getImageUrl = async (name) => {
  try {
    const token = localStorage.getItem('token');
    const imageName = name.split('/').pop();
    const response = await axios.get('https://onepc.online/api/v1/download/product-image', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        image_name: imageName, 
      },
      responseType: 'blob',
    });

    console.log('Image fetched successfully:', response); 
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error during image fetch:', error); 
  }
};

export default getImageUrl;
