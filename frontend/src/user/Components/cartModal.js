import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';

const CartModal = ({ isModalOpen, closeModal, cartItems, isLoading }) => {
  const navigate = useNavigate();

  if (!isModalOpen) return null;

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const handleViewCart = () => {
    closeModal(); // Close the modal
    navigate('/cartPages'); // Navigate to the CartPage
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000
        },
        content: {
          top: '0',
          right: '0',
          bottom: '0',
          left: 'auto',
          overflow: 'hidden',
          marginRight: '0',
          width: '40%',
          padding: '0',
          border: 'none',
          borderRadius: '25px 0 0 25px',
          zIndex: 1100
        }
      }}
    >
      <CartModalContent onClick={handleModalClick}>
        <Header>
          <h2>Your Cart</h2>
          <CloseButton onClick={closeModal} aria-label="Close cart modal">&times;</CloseButton>
        </Header>
        {isLoading ? (
          <LoaderWrapper>
            <ClipLoader color="#000099" loading={isLoading} size={50} />
          </LoaderWrapper>
        ) : (
          <CartItemsContainer>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <CartItemsList items={cartItems} />
            )}
          </CartItemsContainer>
        )}
      </CartModalContent>
      <Footer>
        <FooterButton onClick={handleViewCart}>
          View Cart
        </FooterButton>
      </Footer>
    </Modal>
  );
};

const CartItemsList = ({ items }) => (
  <CartItemsListContainer>
    {items.map(item => (
      <CartItem key={item.product_id}>
        <CartItemImage src={item.imageUrl} alt={item.product.product_name} />
        <CartItemDetails>
          <ProductName>{item.product.product_name}</ProductName>
          <ProductPrice>₱{item.product.price}</ProductPrice>
          <p>{item.quantity}</p>
        </CartItemDetails>
      </CartItem>
    ))}
  </CartItemsListContainer>
);

export default CartModal;

const CartModalContent = styled.div`
  font-family: 'Poppins', sans-serif;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #000099;
  transition: color 0.3s ease;

  &:hover {
    color: #003366;
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ProductName = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const ProductPrice = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
`;

const CartItemsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

const CartItemsListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CartItem = styled.li`
  display: flex;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
`;

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
    font-size: 16px;
    color: #333;
  }
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background: #fff;
  border-top: 1px solid #ddd;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
`;

const FooterButton = styled.button`
  background: #000099;
  font-family: 'Poppins', sans-serif;
  color: #fff;
  border: none;
  width: 30%;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 25px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #003366;
  }
`;
