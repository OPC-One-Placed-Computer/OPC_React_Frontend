import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';
import LoginFormHooks from '../Hooks/loginFormHooks';
import loginAnimated from '../Animations/loginAnimated.json';
import Lottie from 'lottie-react';

const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleSubmit
  } = LoginFormHooks();

  return (
    <LoginPage>
      {isLoading && (
        <LoaderContainer>
          <ClipLoader color="#007bff" />
        </LoaderContainer>
      )}
      <LoginContainer>
        <LottieContainer>
          <Lottie animationData={loginAnimated} />
        </LottieContainer>
        <LoginFormContainer>
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <FormGroup>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <SignInButton type="submit">Sign In</SignInButton>
            <NewCustomer>
              New customer? <Link to="/registerForm" className='link'>Create your account</Link>
            </NewCustomer>
          </form>
        </LoginFormContainer>
      </LoginContainer>
    </LoginPage>
  );
};

export default LoginForm;

const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
`;

const LoginContainer = styled.div`
background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Adding shadow border */
`;

const LottieContainer = styled.div`
  width: 100%;
  max-width: 300px;
  margin-left: 3rem; 
`;

const LoginFormContainer = styled.div`
  padding: 2rem;
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
  }

  button {
    font-family: 'Poppins', sans-serif;
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 1rem;
  }

  button:hover {
    background-color: #0a1827;
  }
`;

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
    font-family: 'Poppins', sans-serif;
    border: none;
    border-bottom: 1px solid black; /* Add bottom border */
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s;
    width: 100%;
  }

  input:focus {
    border-color: #007bff;
  }
`;


const SignInButton = styled.button`
  font-family: 'Poppins', sans-serif;
  width: 100%;
  max-width: 200px;
  padding: 0.75rem;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;

  &:hover {
    background-color: #0a1827;
  }
`;

const NewCustomer = styled.p`
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
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 1rem;
`;
