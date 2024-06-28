import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ScaleLoader from 'react-spinners/ScaleLoader'
import updateCartItem from '../Function/updateCartItem';

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    fetchCartData();

    return () => clearTimeout(timer);
  }, []);

  const fetchCartData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://onepc.online/api/v1/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching cart data:', error);
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
    }
  };
  const handleCheckboxChange = (productId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(productId)
        ? prevSelectedItems.filter((id) => id !== productId)
        : [...prevSelectedItems, productId]
    );
  };

  const handleDeleteSelectedItems = async () => {
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
      fetchCartData(); 
      setSelectedItems([]); 
    } catch (error) {
      console.error('Error deleting cart items:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/placeOrder', {
      state: {
        products: products.map(product => ({
          productName: product.product.product_name,
          price: product.product.price,
          quantity: product.quantity,
          productImage: `https://onepc.online${product.product.image_path}`,
          subtotal: product.subtotal,
        })),
      },
    });
  };
  
  const renderEmptyCart = () => (
    <EmptyCartContainer>
      <AiOutlineShoppingCart size={80} color="#007bff" />
      <p>Your cart is empty.</p>
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
      <Table>
        <thead>
          <tr>
            <Th></Th>
            <Th>IMAGE</Th>
            <Th>PRODUCT NAME</Th>
            <Th>PRICE</Th>
            <Th>QUANTITY</Th>
            <Th>SUBTOTAL</Th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
           <tr key={product.product_id}>
              <TdCheckbox>
                <Checkbox type="checkbox" checked={selectedItems.includes(product.product_id)} onChange={() => handleCheckboxChange(product.product_id)} />
              </TdCheckbox>
              <Td><img src={`https://onepc.online${product.product.image_path}`} alt={product.product.product_name} width="50" /></Td>
              <Td>{product.product.product_name}</Td>
              <Td>₱{Number(product.product.price).toFixed(2)}</Td>
              <Td>
              <QuantityControls>
                  <button className='subtract' onClick={() => handleQuantityChange(product.cart_id, product.quantity - 1)}>-</button>
                  <span>{product.quantity}</span>
                  <button className='addition'onClick={() => handleQuantityChange(product.cart_id, product.quantity + 1)}>+</button>
                </QuantityControls>
              </Td>
              <Td>₱{Number(product.subtotal).toFixed(2)}</Td>
              
            </tr>
          ))}
        </tbody>
      </Table>
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
    </CartContainer>
  );
};

export default CartPage;

const CartContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const Th = styled.th`
  text-align: left;
  padding: 15px;
  border-bottom: 2px solid #ddd;
  font-size: 1.2em;
  background-color: #000099;
  color: white;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`

const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  font-size: 1.1em;
  background-color: #f9f9f9;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1em;
  }

  img {
    border-radius: 5px;
  }
`
  const TdCheckbox = styled.td`
    padding: 15px;
    border-bottom: 1px solid #ddd;
    font-size: 1.1em;
    background-color: #f9f9f9;
    color: #333;
    text-align: center;
  `

  const Checkbox = styled.input`
    margin-right: 10px;
  `
  const QuantityControls = styled.div`
    display: flex;
    align-items: center;

    button {
      background-color: #007bff;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      border: none;
      border-radius: 50%;
      padding: 5px 10px;
      cursor: pointer;
      font-size: 1em;

      &:hover {
        background-color: #0056b3;
      }
    }
    .subtract {
      
      background-color: #dc3545;
    }
    .addition {
      background-color: #000099;
    }

    span {
      margin: 0 10px;
      font-size: 1.1em;
    }
  `
  const ActionButtons = styled.div`
    display: flex;
    justify-content: space-between;
  `
  const baseButtonStyles = `
  padding: 12px 24px;
  font-family: 'Poppins', sans-serif;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.1em; 
  cursor: pointer;
  transition: background-color 0.3s ease;
`

  const DeleteButton = styled.button`
    ${baseButtonStyles}
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }
  `
  const CheckoutButton = styled.button`
    ${baseButtonStyles}
    background-color: #000099;
    margin-top: 0; 

    &:hover {
      background-color: #0056b3;
    }
  `
  const EmptyCartContainer = styled.div`
    text-align: center;
    margin-top: 300px;
    p {
      font-size: 1.5em;
      color: #333;
      margin-top: 20px;
    }
  `

