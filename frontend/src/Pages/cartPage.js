import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "KINGSTON 16GB DDR4 3200MHZ FURY BEAST RAM",
      price: 2450.00,
      quantity: 1,
    },
    {
      id: 2,
      name: "Example Product 2",
      price: 1500.00,
      quantity: 2,
    },
    {
      id: 3,
      name: "Example Product 3",
      price: 1800.00,
      quantity: 1,
    },
    {
      id: 4,
      name: "Example Product 4",
      price: 1800.00,
      quantity: 1,
    }
  ]);

  const navigate = useNavigate();

  const decreaseQuantity = (productId) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const increaseQuantity = (productId) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    // Implement the checkout logic here
    navigate('/placeOrder', { state: { products, total: calculateTotal() } });
  };


  return (
    <CartContainer>
      <Table>
        <thead>
          <tr>
            <Th>PRODUCT</Th>
            <Th>PRICE</Th>
            <Th>QUANTITY</Th>
            <Th>TOTAL</Th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <Td>
                <ProductImage src="https://via.placeholder.com/50" alt="Product" />
                {product.name}
              </Td>
              <Td>₱{product.price.toFixed(2)}</Td>
              <Td>
                <QuantityControl>
                  <Button onClick={() => decreaseQuantity(product.id)}>-</Button>
                  <span>{product.quantity}</span>
                  <Button onClick={() => increaseQuantity(product.id)}>+</Button>
                </QuantityControl>
              </Td>
              <Td>₱{(product.price * product.quantity).toFixed(2)}</Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Summary>
        <Subtotal>
          SUBTOTAL: ₱{calculateTotal().toFixed(2)} PHP
        </Subtotal>
        <CheckoutButton onClick={handleCheckout}>Check Out</CheckoutButton>
      </Summary>
    </CartContainer>
  );
};

export default CartPage;

const CartContainer = styled.div`
  width: 100%;
  max-width: 1200px; /* Adjust maximum width as per your design */
  margin: 0 auto;
  padding: 20px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`

const Th = styled.th`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 1.2em;

  @media (max-width: 768px) {
    font-size: 1em; /* Adjust font size for smaller screens */
  }
`

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 1.1em;

  @media (max-width: 768px) {
    font-size: 1em; /* Adjust font size for smaller screens */
  }
`

const ProductImage = styled.img`
  width: 50px;
`

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`

const Button = styled.button`
  background-color: transparent;
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`

const Summary = styled.div`
  text-align: right;
  margin-top: 20px;
`

const Subtotal = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  color: red;
`

const CheckoutButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`
