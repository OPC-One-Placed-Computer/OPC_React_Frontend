import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const RegisterForm = () => {
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
      const response = await axios.post('https://onepc.online/api/v1/register', userData);
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
      setErrorMessage(error.response ? error.response.data : error.message);
      setSuccessMessage('');
    }
  };

  return (
    <RegisterContainer>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        <FormGroup>
          <label>First Name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-input" required/>
        </FormGroup>
        <FormGroup>
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </FormGroup>
        <button type="submit">Register</button>
        <Account>Already have an account? <Link to="/loginForm" className="link">Login here</Link></Account>
      </form>
    </RegisterContainer>
  );
};

export default RegisterForm;

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;

  form {
    background-color: #ffffff;
    padding: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 350px;
  }

  h2 {
    font-size: 2rem;
    color: #13072E;
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #0a1827;
  }
`

const FormGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    color: #333333;
    text-align: left; 
  }

  input {
    padding: 0.5rem;
    border: 1px solid #cccccc;
    border-radius: 10px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s;
  }

  input:focus {
    border-color: #007bff;
  }
`

const Account = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: #666666;

  .link {
    color: #007bff;
    text-decoration: none;
    transition: color 0.3s;
  }

  .link:hover {
    color: #0056b3;
    text-decoration: underline;
  }
`

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  padding: 0.75rem;
  border-radius: 5px;
  margin-bottom: 1rem;
`

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  padding: 0.75rem;
  border-radius: 5px;
  margin-bottom: 1rem;
`
