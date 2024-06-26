import React, { useState } from 'react';
import styled from 'styled-components';

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    address: '123 Main St, Anytown, USA',
    productName: 'Sample Product',
    price: 100,
    quantity: 2,
    productImage: 'https://via.placeholder.com/150',
    shippingOption: 'COD',
    productSubtotal: 200,
    shippingSubtotal: 20,
    totalPayment: 220,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Implement the order submission logic here
    console.log('Order placed:', formData);
  };

  return (
    <OrderContainer>
      <Form onSubmit={handlePlaceOrder}>
        <Section>
          <Label>Delivery Address</Label>
          <FormGroup>
            <InputLabel>Name:</InputLabel>
            <TextView>{formData.fullName}</TextView>
          </FormGroup>
          <FormGroup>
            <InputLabel>Address:</InputLabel>
            <TextView>{formData.address}</TextView>
          </FormGroup>
        </Section>

        <Section>
          <Label>Product Details</Label>
          <FormGroup>
            <InputLabel>Product Name:</InputLabel>
            <TextView>{formData.productName}</TextView>
          </FormGroup>
          <FormGroup>
            <InputLabel>Price:</InputLabel>
            <TextView>{`₱${formData.price.toFixed(2)}`}</TextView>
          </FormGroup>
          <FormGroup>
            <InputLabel>Quantity:</InputLabel>
            <TextView>{formData.quantity}</TextView>
          </FormGroup>
          <ProductImage src={formData.productImage} alt="Product" />
        </Section>

        <Section>
          <Label>Shipping Option</Label>
          <FormGroup>
            <InputLabel>COD:</InputLabel>
            <TextView>{formData.shippingOption}</TextView>
          </FormGroup>
        </Section>

        <Section>
          <Label>Payment Details</Label>
          <FormGroup>
            <InputLabel>Product Subtotal:</InputLabel>
            <TextView>{`₱${formData.productSubtotal.toFixed(2)}`}</TextView>
          </FormGroup>
          <FormGroup>
            <InputLabel>Shipping Subtotal:</InputLabel>
            <TextView>{`₱${formData.shippingSubtotal.toFixed(2)}`}</TextView>
          </FormGroup>
          <FormGroup>
            <InputLabel>Total Payment:</InputLabel>
            <TextView>{`₱${formData.totalPayment.toFixed(2)}`}</TextView>
          </FormGroup>
        </Section>

        <SubmitButton type="submit">Place Order</SubmitButton>
      </Form>
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
`

const Form = styled.form`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
`

const Section = styled.div`
  margin-bottom: 20px;
`

const Label = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const InputLabel = styled.label`
  margin-bottom: 5px;
  color: #666;
`

const TextView = styled.span`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  display: inline-block;
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`

const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 5px;
`
