import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Footer from './footer';
import cancelOrder from '../Animations/cancelOrder.json';
import Lottie from 'lottie-react';

const OrderCancel = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const cancelOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `https://onepc.online/api/v1/orders/cancel`, 
          { order_id: orderId }, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
      } catch (err) {
        console.error('Error cancelling order:', err);
      }
    };

    cancelOrder();
  }, [orderId]);

  const handleBackToProducts = () => {
    navigate('/products'); 
  };

  return (
    <>
      <Container>
        <MessageContainer>
          <LottieContainer>
            <Lottie animationData={cancelOrder} autoplay loop />
          </LottieContainer>
          <h2>Order Cancelled Successfully</h2>
          <BackButton onClick={handleBackToProducts}>Back to Products</BackButton>
        </MessageContainer>
      </Container>
      <Footer />
    </>
  );
};

export default OrderCancel;

const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageContainer = styled.div`
  text-align: center;
  padding: 30px;
  border-radius: 15px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LottieContainer = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  font-family: 'Poppins', sans-serif;
  margin-top: 20px;
  padding: 12px 25px;
  font-size: 1.1rem;
  color: #fff;
  background-color: #000099;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;
