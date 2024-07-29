import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';
import { MdAccountCircle } from "react-icons/md";
import { FaAddressBook, FaCalendarAlt, FaCreditCard } from "react-icons/fa";
import Footer from './footer';
import useFetchOrders from '../Hooks/placeOrderItemsHooks';

const SingleViewOrder = () => {
    const { imageUrls } = useFetchOrders();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://onepc.online/api/v1/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(response.data.data);
      } catch (err) {
        setError('Error fetching order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  if (loading) {
    return (
      <LoadingContainer>
        <ClipLoader color="#333" size={50} />
      </LoadingContainer>
    );
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <>
      <Container>
        <OrderContainer>
          <OrderDetailsContainer>
            <OrderInfo>
              <h2>Order Information</h2>
              <OrderDetail>
                <IconContainer>
                  <MdAccountCircle />
                </IconContainer>
                <OrderField>{order.full_name}</OrderField>
              </OrderDetail>
              <OrderDetail>
                <IconContainer>
                  <FaAddressBook />
                </IconContainer>
                <OrderField>{order.shipping_address}</OrderField>
              </OrderDetail>
              <OrderDetail>
                <IconContainer>
                  <FaCalendarAlt />
                </IconContainer>
                <OrderField>{formatDate(order.created_at)}</OrderField>
              </OrderDetail>
              <OrderDetail>
                <IconContainer>
                 <FaCreditCard />
                </IconContainer>
                <OrderField>{order.payment_method}</OrderField>
              </OrderDetail>
            </OrderInfo>
            <OrderItems>
              <h2>My Purchase</h2>
              <OrderItemsTable>
                <thead>
                  <TableRow>
                    <TableHeader>Product Image</TableHeader>
                    <TableHeader>Product Name</TableHeader>
                    <TableHeader>Quantity</TableHeader>
                    <TableHeader>Price</TableHeader>
                    <TableHeader>Subtotal</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {order.order_items.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                      <ProductImage src={imageUrls[item.product.image_path] || ''} alt={item.product.product_name} />
                      </TableCell>
                      <TableCell>{item.product.product_name}</TableCell>
                      <TableCell>₱{item.product.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>₱{item.subtotal}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </OrderItemsTable>
              <TotalAmount><strong>Total Amount:</strong> ₱{order.total}</TotalAmount>
              <TotalWrapper>
                <OrderStatus><strong>Status:</strong> {order.status}</OrderStatus>
              </TotalWrapper>
            </OrderItems>
          </OrderDetailsContainer>
        </OrderContainer>
      </Container>
      <Footer />
    </>
  );
};

export default SingleViewOrder;

const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
`;

const OrderContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  width: 90%;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  margin: 0 auto; 
`;

const OrderDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const OrderInfo = styled.div`
  flex: 1;
`;

const OrderDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const OrderField = styled.p`
  border-bottom: 1px solid #ccc;
  font-size: 1rem;
  color: #333;
  margin-left: 10px;
`;

const OrderItems = styled.div`
  flex: 2;
`;

const OrderItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  background-color: #fff;

  @media (max-width: 768px) {
    display: block;

    tbody tr {
      border-bottom: 1px solid #ddd;
    }
  
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th`
  padding: 10px;
  font-size: 1rem;
  color: #333;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px;
  }

  @media (max-width: 768px) {
    display: none; 
  }
`;

const TableCell = styled.td`
  padding: 10px;
  font-size: 1rem;
  color: #333;

  @media (max-width: 768px) {
      font-size: 0.9rem; 
      display: block;
      position: relative;
      box-sizing: border-box;
      border: none;
      height: 50px;

      &:nth-of-type(5) {
        display: none;
      }

      &:nth-of-type(1) {
        display: inline-block;
        width: calc(40% - 5px); 
        vertical-align: top;
        margin-left: 20px;
      }
  
      &:nth-of-type(2) {
        display: inline-block;
        width: calc(50% - 5px); 
        vertical-align: top;
      }
      &:nth-of-type(3) {
        display: block;
        margin-left: 20px; 
        margin-top: 10px;  
      }
      &:nth-of-type(4) {
        display: block;
        margin-left: 30px;   
      }
     
  }
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;

`;

const TotalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const TotalAmount = styled.span`
  font-weight: bold;
  color: #B22222;
  display: flex;
  justify-content: flex-end;
`;

const OrderStatus = styled.p`
  margin-right: 10px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const IconContainer = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;

  svg {
    font-size: 1.2rem;
    color: #343a40;
  }

  @media (max-width: 480px) {
    svg {
      font-size: 1rem;
    }
  }
`;