import React, { useState } from 'react';
import styled from 'styled-components';

const OrderStatusModal = ({ isOpen, onRequestClose, order, newStatus, setNewStatus, handleStatusChange }) => {
  const getStatusOptions = (currentStatus, paymentMethod) => {
    const codStatusFlow = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'completed', 'cancelled'];
    const stripeStatusFlow = ['awaiting_payment', 'paid', 'confirmed', 'processing', 'shipped', 'delivered', 'completed', 'cancelled', 'refund', 'no_payment_received'];

    const statusFlow = paymentMethod === 'cod' ? codStatusFlow : stripeStatusFlow;
    const currentIndex = statusFlow.indexOf(currentStatus);

    if (currentIndex === -1) return [];
    return statusFlow.slice(currentIndex + 1);
  };

  return (
    <>
      {isOpen && (
        <Overlay>
          <ModalContent>
            {order && (
              <>
                <Header>
                  <Title>Edit Order</Title>
                  <CloseButton onClick={onRequestClose}>×</CloseButton>
                </Header>
                <Form>
                  <Label>
                    Customer Name:
                    <Input type="text" value={order.full_name} readOnly />
                  </Label>
                  <Label>
                    Order Date:
                    <Input type="text" value={new Date(order.created_at).toLocaleDateString()} readOnly />
                  </Label>
                  <Label>
                    Amount:
                    <Input type="text" value={`$${order.total}`} readOnly />
                  </Label>
                  <Label>
                    Payment Method:
                    <Input type="text" value={order.payment_method} readOnly />
                  </Label>
                  <Label>
                    Payment Status:
                    <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                      <option value="">Select status</option>
                      {getStatusOptions(order.status, order.payment_method).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </Select>
                  </Label>
                  <ButtonContainer>
                    <CancelButton onClick={onRequestClose}>Cancel</CancelButton>
                    <SaveButton onClick={() => handleStatusChange(order.order_id, newStatus)}>Save</SaveButton>
                  </ButtonContainer>
                </Form>
              </>
            )}
          </ModalContent>
        </Overlay>
      )}
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: visible;
`;

const Header = styled.div`
font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Form = styled.div`
font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 14px;
`;

const Input = styled.input`
  font-family: 'Poppins', sans-serif;
  padding: 0.5rem;
  border: 1px solid #ccc;
  font-size: 12px;
  border-radius: 5px;
  width: 95%;
  margin-top: 0.5rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #ff6600;
    outline: none;
  }
`;

const Select = styled.select`
  font-family: 'Poppins', sans-serif;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 12px;
  width: 100%;
  margin-top: 0.5rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #ff6600;
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const CancelButton = styled.button`
  font-family: 'Poppins', sans-serif;
  padding: 0.5rem 1rem;
  font-size: 12px;
  border: 1px solid #ccc;
  background-color: #dc3545;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  margin-right: 0.5rem;
  min-width: 120px;
  text-align: center; 

  &:hover {
    background-color: #c82333;
  }
`;

const SaveButton = styled.button`
  font-family: 'Poppins', sans-serif;
  padding: 0.5rem 1rem;
  border: none;
  font-size: 12px;
  background-color: #000099;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  min-width: 120px; 
  text-align: center;

  &:hover {
    background-color: #003366;
  }
`;

export default OrderStatusModal;
