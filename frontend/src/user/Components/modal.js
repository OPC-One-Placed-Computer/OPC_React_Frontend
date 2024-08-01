import React from 'react';
import styled from 'styled-components';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  * {
    -webkit-tap-highlight-color: transparent;
  }
  background: white;
  padding: 20px;
  width: 90%; 
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border-radius: 8px; 

  @media (max-width: 768px) {
    width: 95%;
    padding: 0.5rem; 
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 0.5rem; 
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 1.2rem; 
  }
`;
