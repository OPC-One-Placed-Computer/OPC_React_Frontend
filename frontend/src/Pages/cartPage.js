import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartData();
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
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/placeOrder', { state: { products } });
  };

  return (
    <CartContainer>
      <Table>
        <thead>
          <tr>
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
              <Td><img src={`https://onepc.online${product.product.image_path}`} alt={product.product.product_name} width="50" /></Td>
              <Td>{product.product.product_name}</Td>
              <Td>₱{Number(product.product.price).toFixed(2)}</Td>
              <Td>{product.quantity}</Td>
              <Td>₱{Number(product.subtotal).toFixed(2)}</Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CheckoutButton onClick={handleCheckout}>Check Out</CheckoutButton>
    </CartContainer>
  );
};

export default CartPage;

const CartContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  background-color: #007bff;
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

const CheckoutButton = styled.button`
  margin-top: 20px;
  padding: 15px 30px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`
