import React from 'react';
import styled from 'styled-components';

const ConfirmationModal = ({ isVisible, onClose, onConfirm }) => {
  if (!isVisible) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>Confirm Cancellation</h3>
        <p>Are you sure you want to cancel this order?</p>
        <ButtonsContainer>
          <ConfirmButton onClick={onConfirm}>Delete</ConfirmButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </ButtonsContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmationModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  @media (max-width: 768px) {
    width: 90%;
    padding: 15px;
  }
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  text-align: center;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 10px;
  }
`;

const buttonStyles = `
  font-family: 'Poppins', sans-serif;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  color: white;
  font-size: 0.8rem;
  transition: background-color 0.3s;
  width: 100px;  

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 8px 16px;
    width: 80px;  
  }
`;

const ConfirmButton = styled.button`
  ${buttonStyles}
  background-color: #000099;

  &:hover {
    background-color: #000077;
  }
`;

const CancelButton = styled.button`
  ${buttonStyles}
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;
