import React from 'react';
import styled from 'styled-components';
import AddProductHooks from '../Hooks/addProductHooks';

const AddProductForm = ({ showAddForm, handleCloseForm }) => {
  const {
    newProductData,
    handleInputChange,
    handleCheckboxChange,
    handleImageChange,
    handleFormSubmit,
  } = AddProductHooks();

  return (
    showAddForm && (
      <Backdrop>
        <ModalContainer onSubmit={handleFormSubmit}>
          <CloseButton type="button" onClick={handleCloseForm}>×</CloseButton>
          <ModalTitle>Add New Product</ModalTitle>
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
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={newProductData.quantity}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Description:</label>
            <textarea
              name="description"
              value={newProductData.description}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Featured:</label>
            <input
              type="checkbox"
              name="featured"
              checked={newProductData.featured === 1}
              onChange={handleCheckboxChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </FormGroup>
          <SubmitButton type="submit">Add Product</SubmitButton>
        </ModalContainer>
      </Backdrop>
    )
  );
};

export default AddProductForm;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.form`
  width: 90%;
  max-width: 500px;
  max-height: 80vh; 
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: box-shadow 0.3s ease;
  overflow-y: auto;

  &:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 95%; 
  }
`;

const ModalTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const FormGroup = styled.div`

  label {
    font-size: 16px;
    font-weight: bold;
    display: block;
    color: #555;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }

  input[type="checkbox"] {
    width: auto;
    margin-left: 10px;
  }
`;

const SubmitButton = styled.button`
  font-family: 'Poppins', sans-serif;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  margin-top: 10px;
  border-radius: 25px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  background: none;
  border: none;
  color: #999;

  &:hover {
    color: #555;
  }
`;
