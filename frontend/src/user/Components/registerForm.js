import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RegisterFormHooks from '../Hooks/registerFormHooks';
import registerAnimated from '../Animations/registerAnimated.json';
import Lottie from 'lottie-react';

const RegisterForm = () => {
  const {
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
  } = RegisterFormHooks();

  return (
    <RegisterPage>
      <RegisterContainer>
        <LottieContainer>
          <Lottie animationData={registerAnimated} />
        </LottieContainer>
        <FormContainer>
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
        </FormContainer>
      </RegisterContainer>
    </RegisterPage>
  );
};

export default RegisterForm;

const RegisterPage = styled.div`
  * {
    -webkit-tap-highlight-color: transparent;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 1rem;
`;

const RegisterContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const LottieContainer = styled.div`
  width: 100%;
  max-width: 300px;
  margin-left: 3rem;

  @media (max-width: 768px) {
    margin-left: 0;
    max-width: 150px;
  }
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    form {
      width: 100%;
      max-width: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h2 {
      font-size: 3rem;
      color: #13072E;
      font-weight: bold;
      margin-bottom: 1.5rem;
      text-align: center;

      @media (max-width: 768px) {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
    }

    button {
      font-family: 'Poppins', sans-serif;
      width: 100%;
      padding: 0.75rem;
      background-color: #000099;
      color: #ffffff;
      border: none;
      border-radius: 25px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
      margin-top: 1rem;

      @media (max-width: 768px) {
        padding: 0.5rem;
        font-size: 0.875rem;
      }
    }

    button:hover {
      background-color: #000099;
    }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    margin-bottom: 0.5rem;
    color: #333333;
    text-align: left;

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }

  input {
    font-family: 'Poppins', sans-serif;
    border: none;
    border-bottom: 1px solid black;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s;

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }

  input:focus {
    border-color: #ff6600;
  }
`;

const Account = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: #666666;

  .link {
    color: #000099;
    text-decoration: none;
    transition: color 0.3s;
  }

  .link:hover {
    color: #0056b3;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
  font-size: 12px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const SuccessMessage = styled.div`
 font-size: 12px;
  color: green;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;
