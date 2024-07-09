import React from 'react';
import styled from 'styled-components';

const AddProductForm = ({ showAddForm, handleCloseForm, handleInputChange, handleFormSubmit, newProductData }) => (
  showAddForm && (
    <FormContainer onSubmit={handleFormSubmit}>
      <CloseButton onClick={handleCloseForm}>X</CloseButton>
      <FormGroup>
        <label>Product Name:</label>
        <input
          type="text"
          name="product_name"
          value={newProductData.product_name}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={newProductData.category}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <label>Brand:</label>
        <input
          type="text"
          name="brand"
          value={newProductData.brand}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={newProductData.price}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <label>Image URL:</label>
        <input
          type="text"
          name="image_path"
          value={newProductData.image_path}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <SubmitButton type="submit">Add Product</SubmitButton>
    </FormContainer>
  )
);

export default AddProductForm;

const FormContainer = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
`

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    font-size: 16px;
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`

const SubmitButton = styled.button`
  font-family: 'Poppins', sans-serif;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;

  &:hover {
    background-color: #0056b3;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  background: none;
  border: none;
  color: #999;

  &:hover {
    color: #555;
  }
`


