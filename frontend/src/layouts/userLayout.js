// src/layouts/UserLayout.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from '../user/Components/navigationBar';
import Homepage from '../user/Pages/HomePage';
import ProductsPage from '../user/Pages/productPages';
import ProductDetailPage from '../user/Pages/productDetailPage';
import LoginForm from '../user/Components/loginForm';
import RegisterForm from '../user/Components/registerForm';
import CartPage from '../user/Pages/cartPage';
import Profile from '../user/Components/profile';
import PlaceOrder from '../user/Components/placeOrder';
import PlacedOrderItems from '../user/Components/placedOrderItems';
import styled from 'styled-components';

const UserLayout = () => (
  <>
    <NavigationBar />
    <Content>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<ProductsPage />} />
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
  </>
);

export default UserLayout;

const Content = styled.div`
padding-top: 90px;
overflow-x: hidden;
`;
