import React, { useState } from 'react';
import styled from 'styled-components';
import useFetchOrders from '../Hooks/placeOrderItemsHooks';
import emptyOrder from '../Animations/emptyOrder.json';
import Lottie from 'lottie-react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { MdAccountCircle } from "react-icons/md";
import { FaAddressBook, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import Footer from './footer';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlacedOrderItems = () => {
  const { orders, loading, cancelOrder, lastPage, setCurrentPage, imageUrls } = useFetchOrders();
  
  const [activeTab, setActiveTab] = useState('To Pay');
  
  const handleCancelOrder = async (order_id) => {
    try {
      await cancelOrder(order_id);
      toast.success('Order cancelled successfully.');
    } catch (error) {
      toast.error('Failed to cancel order. Please try again.');
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const filterOrders = (status) => {
    switch (status) {
      case 'To Pay':
        return orders.filter(order => 
          order.status === 'pending' || order.status === 'awaiting payment'
        );
      case 'To Ship':
        return orders.filter(order => ['paid', 'confirmed', 'shipped'].includes(order.status));
      case 'To Receive':
        return orders.filter(order => order.status === 'delivered');
      case 'Completed':
        return orders.filter(order => order.status === 'completed');
      case 'Cancelled':
        return orders.filter(order => order.status === 'cancelled');
      case 'Refunded':
        return orders.filter(order => order.status === 'refunded');
      default:
        return orders;
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <ScaleLoader color="#000099" size={50} />
      </LoadingContainer>
    );
  }

  const filteredOrders = filterOrders(activeTab);

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
      <ToastContainer />
      <Tabs>
        {['To Pay', 'To Ship', 'To Receive', 'Completed', 'Cancelled', 'Refunded'].map((tab) => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </Tabs>
      <OrdersContainer>
        {filteredOrders.length === 0 ? (
          <EmptyOrdersContainer>
            <Lottie animationData={emptyOrder} style={{ width: 200, height: 200 }} />
            <NoOrdersMessage>No orders found.</NoOrdersMessage>
          </EmptyOrdersContainer>
        ) : (
          filteredOrders.map((order, index) => (
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
                    {activeTab === 'To Pay' && order.status === 'awaiting payment' ? (
                      <PayButton >
                        Pay
                      </PayButton>
                    ) : activeTab === 'To Pay' && (
                      <CancelButton onClick={() => handleCancelOrder(order.order_id)} disabled={order.status === 'cancelled'}>
                        Cancel Order
                      </CancelButton>
                    )}
                  </TotalWrapper>
                </OrderItems>
              </OrderDetailsContainer>
            </OrderContainer>
          ))
        )}
        <PaginationContainer>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={lastPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </PaginationContainer>
      </OrdersContainer>
      <Footer/>
    </div>
  );
};

export default PlacedOrderItems;

const PayButton = styled.button`
  font-family: 'Poppins', sans-serif;
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;
const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  overflow-x: auto; 
  white-space: nowrap; 
  -ms-overflow-style: none;  
  scrollbar-width: none; 

  &::-webkit-scrollbar {
    display: none; 
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const Tab = styled.button`
  background-color: transparent; 
  color: ${props => (props.active ? '#000099' : '#333')}; 
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-bottom: ${props => (props.active ? '2px solid #000099' : 'none')}; 
  font-family: 'Poppins', sans-serif;
  transition: color 0.3s ease, border-bottom 0.3s ease;
  width: 150px; 
  text-align: center; 
  white-space: nowrap; 

  &:hover {
    color: ${props => !props.active && '#666'}; 
  }

  @media (max-width: 768px) {
    width: 120px; 
    padding: 8px 12px;
  }

  @media (max-width: 480px) {
    width: 100px; 
    padding: 6px 10px;
    font-size: 0.9rem; 
  }
`;

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
`;

const OrderContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  width: 90%;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;;
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

  &:nth-of-type(2) {
    color: #000099;
  }

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
        margin-left: 20px;   
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


const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
  }

  .pagination li {
    margin: 0 5px;
    cursor: pointer;
  }

  .pagination li a {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 50%;
    text-decoration: none;
    color: #000099;
  }

  .pagination li.active a {
    background-color: #000099;
    color: white;
    border-color: #000099;
  }
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
