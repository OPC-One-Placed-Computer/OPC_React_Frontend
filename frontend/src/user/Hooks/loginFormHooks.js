import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginFormHooks = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill out all fields.');
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    setIsLoading(true);

    try {
      if (email === 'admin@gmail.com' && password === 'admin123') {
        setTimeout(() => {
          navigate('/admin/AdminDashboard'); 
        }, 2000);
      } else {
        const response = await axios.post('https://onepc.online/api/v1/login', userData);
        console.log('Login successful:', response.data);
        const { token } = response.data;
        localStorage.setItem('token', token);
        
        setTimeout(() => {
          navigate('/products'); 
          window.location.reload(true);
        }, 2000);
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
    }, 2000);

    return () => clearTimeout(timer);
  }, [error]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleSubmit
  };
};

export default LoginFormHooks;
