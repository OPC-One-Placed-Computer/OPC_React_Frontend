import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { CgDetailsMore } from "react-icons/cg";
import { IoIosInformationCircle } from "react-icons/io";
import axios from 'axios';

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const products = location.state ? location.state.products : [];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://onepc.online/api/v1/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setAddress(response.data.address);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const totalPayment = products.reduce((acc, product) => acc + Number(product.subtotal), 0);

    const orderData = {
      full_name: fullName,
      shipping_address: address,
      total: totalPayment,
      cart_items: products.map(product => ({
        id: product.cart_id, // Updated this line to use id instead of cart_id
        quantity: product.quantity
      }))
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://onepc.online/api/v1/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log('Order placed successfully:', response.data);
      setLoading(false);
      navigate('/placedOrderItems');
    } catch (error) {
      console.error('Error placing order:', error.response.data); // Log the response data for more details
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
      navigate('/cartPage'); // Navigate to the homepage or any other page after cancellation
  };

  const totalPayment = products.reduce((acc, product) => acc + Number(product.subtotal), 0);

  return (
    <OrderContainer>
      <Form onSubmit={handleSubmit}>
        <Section>
          <SectionTitle><IoIosInformationCircle />Customer Information</SectionTitle>
          <FormRow>
            <FormLabel>Full Name:</FormLabel>
            <FullNameDisplay>{fullName}</FullNameDisplay>
          </FormRow>
          <FormRow>
            <FormLabel>Address:</FormLabel>
            <FormInput
              type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </FormRow>
        </Section>

        <Section>
          <SectionTitle><CgDetailsMore />Order Summary</SectionTitle>
          {products.map((product, index) => (
            <ProductDetail key={index}>
              <ProductImage src={product.productImage} alt={product.productName} />
              <ProductInfo>
                <ProductName>{product.productName}</ProductName>
                <ProductPrice>₱{Number(product.price)}</ProductPrice>
                <ProductQuantity>Quantity: {product.quantity}</ProductQuantity>
                <ProductSubtotal>Subtotal: ₱{Number(product.subtotal)}</ProductSubtotal>
              </ProductInfo>
            </ProductDetail>
          ))}
        </Section>

        <TotalSection>
          <TotalLabel>Total Payment:</TotalLabel>
          <TotalAmount>₱{totalPayment.toFixed(2)}</TotalAmount>
        </TotalSection>

        <ButtonContainer>
          <CancelButton type="button" onClick={handleCancelOrder}>Cancel Order</CancelButton>
          <SubmitButton type="submit">Place Order</SubmitButton>
        </ButtonContainer>
      </Form>
      {loading && (
        <LoaderContainer>
          <ClipLoader color="#007bff" loading={loading} size={35} />
        </LoaderContainer>
      )}
    </OrderContainer>
  );
};

export default PlaceOrder;

const OrderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Form = styled.form`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;
  color: black;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px; 
    font-size: 2.5rem; 
  }
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  width: 120px;
  font-size: 1rem;
  color: black;
`
const FormInput = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`
const FullNameDisplay = styled.span`
  flex: 1;
  padding: 8px;
  font-size: 1rem;
  border-radius: 5px;
  line-height: 1.5;
  display: inline-block;
`
const ProductDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`
const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 20px;
`
const ProductInfo = styled.div`
  flex: 1;
  color: black;
`
const ProductName = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 5px;
`
const ProductPrice = styled.p`
  font-size: 1rem;
`
const ProductQuantity = styled.p`
  font-size: 1rem;
`
const ProductSubtotal = styled.p`
  font-size: 1rem;
  font-weight: bold;
`
const TotalSection = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`
const TotalLabel = styled.p`
  font-size: 1.2rem;
  margin-right: 20px;
`
const TotalAmount = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`
const SubmitButton = styled.button`
  font-family: 'Poppins', sans-serif;
  padding: 10px;
  background-color: #000099;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`
const CancelButton = styled.button`
  font-family: 'Poppins', sans-serif;
  padding: 10px;
  background-color: #ff6347;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4500;
  }
`
const LoaderContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
