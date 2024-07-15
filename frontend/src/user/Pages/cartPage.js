import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import updateCartItem from '../Function/updateCartItem';
import ProductDetailPage from './productDetailPage';
import emptyCart from '../Animations/emptyCart.json'
import Lottie from 'lottie-react';
import Modal from '../Components/modal';

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage('');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const fetchCartData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://onepc.online/api/v1/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = async (cart_id, newQuantity) => {
    if (newQuantity > 0) {
      try {
        await updateCartItem(cart_id, newQuantity, setProducts);
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    } else if (newQuantity === 0) {
      await deleteCartItem(cart_id);
    }
  };

  const deleteCartItem = async (cart_id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`https://onepc.online/api/v1/cart/${cart_id}`, {
        quantity: 0,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the products state after successful deletion
      setProducts(prevProducts => prevProducts.filter(product => product.cart_id !== cart_id));
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handleCheckboxChange = (productId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(productId)
        ? prevSelectedItems.filter((id) => id !== productId)
        : [...prevSelectedItems, productId]
    );
  };

  const handleAllCheckboxChange = () => {
    if (isAllChecked) {
      setSelectedItems([]);
    } else {
      setSelectedItems(products.map(product => product.product_id));
    }
    setIsAllChecked(!isAllChecked);
  };

  const handleDeleteSelectedItems = async () => {
    if (selectedItems.length === 0) {
      setAlertMessage('Please select a product to delete');
    } else {
      const token = localStorage.getItem('token');
      try {
        await Promise.all(
          selectedItems.map(async (productId) => {
            const productToDelete = products.find(product => product.product_id === productId);
            if (productToDelete) {
              await axios.delete(`https://onepc.online/api/v1/cart/${productToDelete.cart_id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            }
          })
        );
        setSelectedItems([]);
        // Update the products state after successful deletion
        setProducts(prevProducts => prevProducts.filter(product => !selectedItems.includes(product.product_id)));
      } catch (error) {
        console.error('Error deleting cart items:', error);
      }
    }
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      setAlertMessage('Please select a product to checkout.');
    } else {
      const selectedProducts = products.filter(product => selectedItems.includes(product.product_id));
      navigate('/placeOrder', {
        state: {
          products: selectedProducts.map(product => ({
            productName: product.product.product_name,
            price: product.product.price,
            quantity: product.quantity,
            productImage: `https://onepc.online${product.product.image_path}`,
            subtotal: product.subtotal,
            cart_id: product.cart_id
          })),
        },
      });
    }
  };

  const handleProductClick = async (product_id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://onepc.online/api/v1/products/${product_id}`);
      if (response.data) {
        setSelectedProduct(response.data.data);
        setIsModalOpen(true);
      } else {
        console.log('Product not found:', product_id);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const renderEmptyCart = () => (
    <EmptyCartContainer>
      <Lottie animationData={emptyCart} autoplay loop style={{ width: 250, height: 250 }} />
      <p>Your cart is empty.</p>
      <ReturnToShopButton onClick={() => navigate('/products')}>Return to Shop</ReturnToShopButton>
    </EmptyCartContainer>
  );

  const renderCartContent = () => {
    if (isLoading) {
      return (
        <LoaderContainer>
          <ScaleLoader color="#00008B" />
        </LoaderContainer>
      );
    } else if (products.length === 0) {
      return renderEmptyCart();
    } else {
      return (
        <>
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              checked={isAllChecked}
              onChange={handleAllCheckboxChange}
            />
            <CheckboxLabel>Select All</CheckboxLabel>
          </CheckboxContainer>
          <ProductsContainer>
            {products.map(product => (
              <ProductCard key={product.product_id} onClick={() => handleProductClick(product.product_id)}>
                <CheckboxContainer onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    type="checkbox"
                    checked={selectedItems.includes(product.product_id)}
                    onChange={() => handleCheckboxChange(product.product_id)}
                  />
                </CheckboxContainer>
                <ProductImage src={`https://onepc.online${product.product.image_path}`} alt={product.product.product_name} />
                <ProductInfo>
                  <ProductName>{product.product.product_name}</ProductName>
                  <ProductPrice>₱{Number(product.product.price).toFixed(2)}</ProductPrice>
                  <QuantityControls onClick={(e) => e.stopPropagation()}>
                    <button className='subtract' onClick={() => handleQuantityChange(product.cart_id, product.quantity - 1)}>-</button>
                    <span>{product.quantity}</span>
                    <button className='addition' onClick={() => handleQuantityChange(product.cart_id, product.quantity + 1)}>+</button>
                  </QuantityControls>
                  <ProductSubtotal>Subtotal: ₱{Number(product.subtotal).toFixed(2)}</ProductSubtotal>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductsContainer>
          <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            {selectedProduct && <ProductDetailPage product={selectedProduct} />}
          </Modal>
          <ActionButtons>
            <DeleteButton onClick={handleDeleteSelectedItems}>Delete</DeleteButton>
            <CheckoutButton onClick={handleCheckout}>Check Out</CheckoutButton>
          </ActionButtons>
        </>
      );
    }
  };

  return (
    <CartContainer>
      {renderCartContent()}
      {alertMessage && (
        <AlertMessage>
          {alertMessage}
        </AlertMessage>
      )}
    </CartContainer>
  );
};

export default CartPage;

const CartContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
`;

const ProductCard = styled.div`
  background-color: #fefefe;
  border-radius: 10px;
  width: 100%;
  display: flex;
  padding: 20px;
  align-items: center;
  cursor: pointer; 
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.4);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const CheckboxLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 20px;
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProductName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 0;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    padding: 5px 10px;
    background-color: #007bff;
    height: 30px;
    width: 30px;
    color: #fff;
    border: none;
    border-radius: 25px;
    cursor: pointer;
  }
  .subtract {
    background-color: #dc3545;
  }

  .addition {
    background-color: #000099;
  }
  .

  span {
    font-size: 16px;
  }
`;

const ProductSubtotal = styled.p`
  font-size: 16px;
  color: #FF8C00;
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const DeleteButton = styled.button`
  font-family: 'Poppins', sans-serif;
  padding: 10px 20px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
`;

const CheckoutButton = styled.button`
  font-family: 'Poppins', sans-serif;
  padding: 10px 20px;
  background-color: #000099;    
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
`;

const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  p {
    font-size: 18px;
    color: #333;
  }
`;

const AlertMessage = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px 20px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  z-index: 1000;
`;
const ReturnToShopButton = styled.button`
  font-family: 'Poppins', sans-serif;
  background-color: #00008B;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 25px;

  &:hover {
    background-color: #0000CD;
  }
`;
