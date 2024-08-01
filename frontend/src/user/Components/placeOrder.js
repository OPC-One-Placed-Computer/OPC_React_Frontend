import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Footer from './footer';
import axios from 'axios';
import Breadcrumb from './breadcrumb';
import { MdAccountCircle } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import logo from '../../assets/logo.png'; 
import getImageUrl from '../../tools/media';

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(location.state ? location.state.products : []);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (location.state && location.state.products) {
      setProducts(location.state.products);
      localStorage.setItem('products', JSON.stringify(location.state.products));
    } else if (storedProducts.length > 0) {
      setProducts(storedProducts);
    }

    console.log('Products data passed to PlaceOrder:', products);
  }, [location.state]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = {};
      for (const product of products) {
        const url = await getImageUrl(product.imageName);
        urls[product.cart_id] = url;
      }
      setImageUrls(urls);
    };

    fetchImageUrls();
  }, [products]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://onepc.online/api/v1/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setFirstName(response.data.first_name || '');
        setLastName(response.data.last_name || '');
        setAddress(response.data.address || '');
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
  
    const cartItems = products.map(product => ({
      id: product.cart_id,
      quantity: product.quantity,
    }));
    const orderData = {
      full_name: fullName,
      shipping_address: address,
      total: totalPayment,
      payment_method: paymentMethod,
      cart_items: {
        id: cartItems.map(item => item.id)
      },
      // 'https://store.onepc.online/viewOrder'
      success_url: 'http://localhost:3000/viewOrder',
      cancel_url:  'http://localhost:3000/placeOrder'
    };
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://onepc.online/api/v1/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }

      });
  
      if (paymentMethod === 'stripe' && response.data.status && response.data.data.url) {
        window.location.href = response.data.data.url;
      } else { 
        console.log('Order placed successfully:', response.data);
        setLoading(false);
        navigate('/placedOrderItems');
      }
    } catch (error) {
      console.error('Error placing order:', error.response.data);
      setLoading(false);
    }
  };
  const handleCancelOrder = async () => {
    navigate('/cartPage'); 
  };

  const totalPayment = products.reduce((acc, product) => acc + Number(product.subtotal), 0);

  return (
    <>
    <OrderContainer>
      <Form onSubmit={handleSubmit}>
      <Breadcrumb items={[{ label: 'Home', path: '/HomePage' }, { label: 'Shopping Cart', path: '/cartPage' },
       { label: 'Checkout' }]} />
        <FormContent>
        <BillingContainer>
        <SectionTitle>Billing Details</SectionTitle>
          <BillingSection>
            <FormRow>
            <IconContainer>
                <MdAccountCircle />
              </IconContainer>
              <FullNameDisplay>{fullName}</FullNameDisplay>
            </FormRow>
            <FormRow>
            <IconContainer>
                <MdLocationPin />
              </IconContainer>
              <FormInput
                type="text"
                value={address}
                placeholder='Enter your address'
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </FormRow>
            <FormRow>
              <FormLabel>Payment</FormLabel>
            </FormRow>
            <RadioContainer>
              <PaymentOption>
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </PaymentOption>
              <PaymentOption>
                <input
                  type="radio"
                  id="stripe"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === 'stripe'}
                  onChange={() => setPaymentMethod('stripe')}
                />
                <label htmlFor="stripe">Credit Card</label>
              </PaymentOption>
            </RadioContainer>
            <ButtonContainer>
            <SubmitButton type="submit">Place Order</SubmitButton>
          <CancelButton type="button" onClick={handleCancelOrder}>Cancel Order</CancelButton>
        </ButtonContainer>
          </BillingSection>
          </BillingContainer>

          <OrderSummarySection>
            <SectionTitle>Order Summary</SectionTitle>
            <Table>
              <thead>
                <tr>
                  <TableHeader></TableHeader>
                  <TableHeader>Product Name</TableHeader>
                  <TableHeader>Price</TableHeader>
                  <TableHeader>Quantity</TableHeader>
                  <TableHeader>Subtotal</TableHeader>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                     <TableCell>
                      <ProductImage
                        src={imageUrls[product.cart_id] || logo}
                        alt={product.productName || 'Product Image'}
                        onError={(e) => e.target.src = logo} 
                      />
                    </TableCell>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>₱{Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>₱{Number(product.subtotal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                  </tr>
                ))}
                <tr>
                  <TableCell colSpan="4">Total Payment:</TableCell>
                  <TableCell>₱{totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                </tr>
              </tbody>
            </Table>
            
          </OrderSummarySection>
        </FormContent>
      </Form>

      {loading && (
        <LoaderContainer>
          <ScaleLoader color="#000099" loading={loading} size={35} />
        </LoaderContainer>
      )}
    </OrderContainer>
    <Footer />
    </>
  );
};

export default PlaceOrder;

const OrderContainer = styled.div`
  * {
    -webkit-tap-highlight-color: transparent;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;

  @media (max-width: 768px) {
    padding: 1rem;
    background-color: #ffffff;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 10px;

  }
`;

const FormContent = styled.div`
margin: 0 auto;
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const BillingContainer = styled.div`
flex: 1;
flex-direction: column;
width: auto;

`

const BillingSection = styled.div`
  background-color: #ffffff;
  padding: 20px;
  height: 400px;
  border: 1px solid #ccc;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin-bottom: 20px;
    height: auto; 
    padding: 10px; 
  }
`;

const OrderSummarySection = styled.div`
  flex: 2;
  background-color: #ffffff;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #343a40;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    font-size: 2.5rem;
  }
`;

const FormRow = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
margin-bottom: 10px;
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

const FormLabel = styled.label`
  width: 100px;
  font-size: 1rem;
  color: #343a40;
`;

const FormInput = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;

  &:focus {
    border-color: #ff6600;
    outline: none;
  }
`;

const FullNameDisplay = styled.span`
  flex: 1;
  padding: 8px;
  font-size: 1rem;
  border-radius: 5px;
  line-height: 1.5;
  display: inline-block;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;

  @media (max-width: 768px) {
    display: block;

    tbody tr {
      border-bottom: 1px solid #ddd;
    }
  
  }
 
`;

const TableHeader = styled.th`
  border-bottom: 1px solid #dee2e6;
  background-color: #f4f4f4;
  padding: 10px;
  text-align: left;
  font-size: 1.1rem;
  color: #343a40;

 
  @media (max-width: 768px) {
    display: none;
  }
  }
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;

  img {
    max-width: 70px;
    height: auto;
  }

  &:nth-of-type(2) {
    color: #000099;
  }
  &:nth-of-type(4) {
    text-align: center;
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
        margin-left: 30px; 
        margin-top: 10px;  
      }
      &:nth-of-type(4) {
        display: block;
        margin-left: 30px;   
        text-align: left; 
      }
     
  }
`;

const ProductImage = styled.img`
  width: 70px;
  height: auto;
`;

const RadioContainer = styled.div`
  margin-top: 15px;
  border-bottom: 1px solid #ccc;
`;

const PaymentOption = styled.div`
  margin-bottom: 10px;

  input[type='radio'] {
    margin-right: 8px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  justify-content: space-between;
  margin-top: 30px;
`;

const CancelButton = styled.button`
border-radius: 35px;
font-family: 'Poppins', sans-serif;
  background-color: #d22630;
  color: #fff;
  height: 50px;
  width: 300px;
  font-size: 0.9rem;
  border: none;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #c82333#ff6600;
  }
`;

const SubmitButton = styled.button`
font-family: 'Poppins', sans-serif;
border-radius: 35px;
  height: 50px;
  width: 300px;
  background-color: #000099;
  color: #fff;
  border: none;
  font-size: 0.9rem;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;

`;
