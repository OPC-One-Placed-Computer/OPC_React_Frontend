import './App.css';
import React, { useState } from 'react';
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


function App() {
  const [overlayActive, setOverlayActive] = useState(false);

  const toggleOverlay = () => {
    setOverlayActive(!overlayActive);
  };


  return (
    <Router>
      <div className="App">
      <NavigationBar toggleOverlay={toggleOverlay} overlayActive={overlayActive} />
        <div className={`overlay ${overlayActive ? 'active' : ''}`} onClick={toggleOverlay}></div>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
