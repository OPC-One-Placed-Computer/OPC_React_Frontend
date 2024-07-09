import React from 'react';
import styled from 'styled-components';
import getImageUrl from '../../tools/media'; 
import useFetchOrders from '../Hooks/placeOrderItemsHooks';

const PlacedOrderItems = () => {
  const { orders, loading } = useFetchOrders();

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
            </OrderInfo>
            <h2>My Purchase</h2>
            <OrderItems>
              {order.order_items.map((item, idx) => (
                <ProductItem key={idx}>
                  <ProductDetails>
                    <ProductImage src={getImageUrl(item.product.image_path)} alt={item.product.product_name} />
                    <ProductInfo>
                      <OrderField><strong>Product Name:</strong> {item.product.product_name}</OrderField>
                      <OrderField><strong>Quantity:</strong> {item.quantity}</OrderField>
                      <OrderField><strong>Subtotal:</strong> ₱{item.subtotal}</OrderField>
                    </ProductInfo>
                  </ProductDetails>
                </ProductItem>
              ))}
              <Amount>
              <TotalAmount><strong>Total Amount:</strong> ₱{order.total}</TotalAmount>
              </Amount>
              <TotalWrapper>
                <OrderStatus><strong>Status:</strong> {order.status}</OrderStatus>
                <CancelButton>Cancel Order</CancelButton>
              </TotalWrapper>
            </OrderItems>
          </OrderItem>
        ))}
      </OrderList>
    </OrdersContainer>
  );
};

const OrdersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const OrderList = styled.div`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
`;

const OrderItem = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderField = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 5px;
`;

const OrderItems = styled.div`
  margin-top: 10px;
`;

const ProductItem = styled.div`
  display: flex;
  align-items: flex-start; 
  justify-content: space-between; 
  margin-bottom: 10px;
`;

const ProductDetails = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
`;

const ProductInfo = styled.div`
  flex: 1; 
  display: flex;
  flex-direction: column;
`;

const TotalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;
  margin-top: 10px;
`;

const Amount = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
`;
const TotalAmount = styled.span`
  font-weight: bold;
`;

const OrderStatus = styled.p`
  margin-right: 10px; 
`;

const CancelButton = styled.button`
font-family: 'Poppins', sans-serif;
  background-color:  #dc3545;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

const NoOrdersMessage = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

export default PlacedOrderItems;
