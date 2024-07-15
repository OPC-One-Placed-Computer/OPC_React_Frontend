import React, { useEffect } from 'react';
import styled from 'styled-components';

const UpdateProductForm = ({ showUpdateForm, handleCloseForm, handleInputChange, productData, handleSubmit }) => {
  if (!showUpdateForm) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={handleCloseForm}>X</CloseButton>
        <form onSubmit={handleSubmit}>
          <label>
            Product Name:
            <input type="text" name="product_name" value={productData.product_name} onChange={handleInputChange} />
          </label>
          <label>
            Category:
            <input type="text" name="category" value={productData.category} onChange={handleInputChange} />
          </label>
          <label>
            Brand:
            <input type="text" name="brand" value={productData.brand} onChange={handleInputChange} />
          </label>
          <label>
            Price:
            <input type="number" name="price" value={productData.price} onChange={handleInputChange} />
          </label>
          <label>
            Image Path:
            <input type="text" name="image_path" value={productData.image_path} onChange={handleInputChange} />
          </label>
          <button type="submit">Update Product</button>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UpdateProductForm;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 100%;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
