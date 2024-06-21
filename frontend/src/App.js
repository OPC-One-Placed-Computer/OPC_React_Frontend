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

function App() {
  const [overlayActive, setOverlayActive] = useState(false);

  const toggleOverlay = () => {
    setOverlayActive(!overlayActive);
  };

  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <div className={`overlay ${overlayActive ? 'active' : ''}`} onClick={toggleOverlay}></div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products/" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/loginForm" element={<LoginForm toggleOverlay={toggleOverlay} />} />
          <Route path="/registerForm" element={<RegisterForm />} />
          <Route path="/cartPage" element={<CartPage />} />
          <Route path="/HomePage" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
