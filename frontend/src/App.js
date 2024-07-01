import './App.css';
import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './Components/navigationBar';
import LoginForm from './Components/loginForm';
import RegisterForm from './Components/registerForm';
import Homepage from './Pages/HomePage';
import ProductsPage from './Pages/productPages';
import ProductDetailPage from './Pages/productDetailPage';
import CartPage from './Pages/cartPage'
import Profile from './Components/profile';
import PlaceOrder from './Components/placeOrder';
import PlacedOrderItems from './Components/placedOrderItems';


function App() {
  return (
    <Router>
      <Container>
      <NavigationBar />
      <Content>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products/" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/registerForm" element={<RegisterForm />} />
          <Route path="/cartPage" element={<CartPage />} />
          <Route path="/HomePage" element={<Homepage />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/placedOrderItems" element={<PlacedOrderItems />} />
        </Routes>
      </Content>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div `
  font-family: 'Poppins', sans-serif;
`
const Content = styled.div `
position:relative;
  padding-top: 90px;
`
