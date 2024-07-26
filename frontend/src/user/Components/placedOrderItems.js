import React from 'react';
import styled from 'styled-components';
import useFetchOrders from '../Hooks/placeOrderItemsHooks';
import emptyOrder from '../Animations/emptyOrder.json';
import Lottie from 'lottie-react';
import ClipLoader from 'react-spinners/ClipLoader';
import { MdAccountCircle } from "react-icons/md";
import { FaAddressBook, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import Footer from './footer';

const PlacedOrderItems = () => {
  const { orders, loading, cancelOrder, currentPage, lastPage, setCurrentPage, imageUrls } = useFetchOrders();
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleCancelOrder = async (order_id) => {
    try {
      await cancelOrder(order_id);
      setSuccessMessage('Order cancelled successfully.');
    } catch (error) {
      setErrorMessage('Failed to cancel order. Please try again.');
    }
  };

  const handleNextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ClipLoader color="#333" size={50} />
      </LoadingContainer>
    );
  }

  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <EmptyOrdersContainer>
        <Lottie animationData={emptyOrder} style={{ width: 300, height: 300 }} />
        <NoOrdersMessage>No orders found.</NoOrdersMessage>
      </EmptyOrdersContainer>
    );
  }
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const getPaymentIcon = (paymentMethod) => {
    switch (paymentMethod) {
      case 'stripe':
        return <FaCreditCard />;
      case 'cod':
        return <FaMoneyBillWave />;
      default:
        return null;
    }
  };
  return (
    <div>
      <OrdersContainer>
        {orders.map((order, index) => (
          <OrderContainer key={index}>
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
                    {getPaymentIcon(order.payment_method)}
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
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>₱{item.product.price}</TableCell>
                        <TableCell>₱{item.subtotal}</TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </OrderItemsTable>
                <TotalAmount><strong>Total Amount:</strong> ₱{order.total}</TotalAmount>
                <TotalWrapper>
                  <OrderStatus><strong>Status:</strong> {order.status}</OrderStatus>
                  <CancelButton onClick={() => handleCancelOrder(order.order_id)} disabled={order.status === 'cancelled'}>
                    Cancel Order
                  </CancelButton>
                </TotalWrapper>
              </OrderItems>
            </OrderDetailsContainer>
          </OrderContainer>
        ))}
      </OrdersContainer>

      <PaginationContainer>
        <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</PaginationButton>
        <PaginationInfo>Page {currentPage} of {lastPage}</PaginationInfo>
        <PaginationButton onClick={handleNextPage} disabled={currentPage === lastPage}>Next Page</PaginationButton>
      </PaginationContainer>

      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Footer/>
    </div>
  );
};

export default PlacedOrderItems;

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;

const OrderDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
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
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th`
  padding: 10px;
  font-size: 1rem;
  color: #333;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
  font-size: 1rem;
  color: #333;
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

const CancelButton = styled.button`
  font-family: 'Poppins', sans-serif;
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 25px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => !props.disabled && '#c82333'};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const NoOrdersMessage = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

const EmptyOrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const SuccessMessage = styled.p`
  color: green;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  font-family: 'Poppins', sans-serif;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 25px;
  cursor: pointer;
  opacity: ${props => props.disabled ? 0.6 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => !props.disabled && '#0056b3'};
  }
`;

const PaginationInfo = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

const IconContainer = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;

  svg {
    font-size: 1.2rem;
    color: #343a40;
  }
`;
