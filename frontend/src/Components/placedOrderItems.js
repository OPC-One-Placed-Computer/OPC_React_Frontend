import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const PlacedOrderItems = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://onepc.online/api/v1/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        if (response.data && Array.isArray(response.data.data)) {
          setOrders(response.data.data);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <LoadingMessage>Loading orders...</LoadingMessage>;
  }

  if (!Array.isArray(orders) || orders.length === 0) {
    return <NoOrdersMessage>No orders found.</NoOrdersMessage>;
  }

  return (
    <OrdersContainer>
      <OrderList>
        {orders.map((order, index) => (
          <OrderItem key={index}>
            <OrderInfo>
              <OrderField><strong>Full Name:</strong> {order.full_name}</OrderField>
              <OrderField><strong>Shipping Address:</strong> {order.shipping_address}</OrderField>
              <OrderField><strong>Total:</strong> ₱{order.total}</OrderField>
              <OrderField><strong>Status:</strong> {order.status}</OrderField>
            </OrderInfo>
          </OrderItem>
        ))}
      </OrderList>
    </OrdersContainer>
  );
};

export default PlacedOrderItems;

const OrdersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`

const OrderList = styled.div`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
`

const OrderItem = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const OrderField = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 5px;
`

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  color: #333;
`

const NoOrdersMessage = styled.p`
  font-size: 1.2rem;
  color: #333;
`
