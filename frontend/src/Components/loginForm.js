import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import '../Styles/loginForm.css'; 
import styled from 'styled-components'
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in with:', email, password);
  };

  return (
    <div>
    <loginContainer>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <formGroup>
          <label className="form-label" htmlFor="email">Email</label>
          <input 
            id="email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="form-input"
          />
        </formGroup>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="form-input"
          />
        </div>
        <button 
          type="submit" 
          className="login-button"
        >
          Sign In
        </button>
        <p className="register-link">
          New customer? <Link to="/registerForm" className="register-link-text">Create your account</Link>
        </p>
      </form>
      
      </loginContainer>
    <sampleDiv>
        <p>HII</p>
      </sampleDiv>
    </div>
  );
};

export default LoginForm;

const sampleDiv = styled.div`
display: flex;
margin: 0 auto; 
p {
  font-color: #ffffff;
  font-size: 100px;
}
`

const loginContainer = styled.div `
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
`
const formGroup = styled.div `
margin-bottom: 1rem;
  display: flex;
  flex-direction: column;

`
