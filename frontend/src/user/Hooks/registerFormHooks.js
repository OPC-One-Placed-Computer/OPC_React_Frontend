import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterFormHooks = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 2000); 

    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const userData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    };

    try {
      await axios.post('https://onepc.online/api/v1/register', userData);
      setSuccessMessage('Registration successful!');
      setErrorMessage('');
      
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        setSuccessMessage('');
        navigate('/loginForm'); 
      }, 2000); 

    } catch (error) {
      setErrorMessage('The password field must be at least 8 characters.');
      setSuccessMessage('');
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    successMessage,
    errorMessage,
    handleSubmit
  };
};

export default RegisterFormHooks;
