import React, { useState } from 'react';
import styled from 'styled-components';
import AddProductHooks from '../Hooks/addProductHooks';
import { ToastContainer } from 'react-toastify'; 

const AddProductForm = ({ handleCloseForm }) => {
  const {
    newProductData,
    handleInputChange,
    handleCheckboxChange,
    handleImageChange,
    handleFormSubmit,
  } = AddProductHooks();

  const [dragOver, setDragOver] = useState(false);


  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleImageChange({ target: { files: [file] } });
  };

  return (
    <>
      <FormContainer onSubmit={handleFormSubmit}>
        <CloseButton type="button" onClick={handleCloseForm}>×</CloseButton>

        <AddProductContainer>
          <FormTitle>Add New Product</FormTitle>

          <TopContainer>
            <LeftContainer>
              <FormGroup>
                <label>Product Name:</label>
                <input
                  className='longInput'
                  type="text"
                  name="product_name"
                  value={newProductData.product_name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Brand:</label>
                <input
                  className='longInput'
                  type="text"
                  name="brand"
                  value={newProductData.brand}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Category:</label>
                <select
                  className='category'
                  name="category"
                  value={newProductData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option>Select Category</option>
                  <option value="PC">PC</option>
                  <option value="Laptop">Laptop</option>
                </select>
              </FormGroup>
            </LeftContainer>

            <RightContainer>
              <FormGroup>
                <label>Price:</label>
                <input
                  className='smallInput'
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
                  className='smallInput'
                  type="number"
                  name="quantity"
                  value={newProductData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </RightContainer>
          </TopContainer>

          <BottomContainer>
            <LeftBottomContainer>
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
                <CheckboxContainer>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={newProductData.featured === 1}
                    onChange={handleCheckboxChange}
                  />
                  <CheckboxLabel>Yes</CheckboxLabel>
                </CheckboxContainer>
              </FormGroup>
            </LeftBottomContainer>

            <RightBottomContainer>
              <FormGroup>
                <label>Image:</label>
                <ImageInputContainer
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  dragOver={dragOver}
                >
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    style={{ display: 'none' }} 
                  />
                  <DragDropText>
                    Drag and drop your file here
                    <br />
                    or
                    <br />
                    <BrowseButton type="button" onClick={() => document.querySelector('input[type="file"]').click()}>
                      Browse files
                    </BrowseButton>
                  </DragDropText>
                  <ImagePreview>
                    {newProductData.image && <img src={URL.createObjectURL(newProductData.image)} alt="Preview" />}
                  </ImagePreview>
                </ImageInputContainer>
              </FormGroup>
            </RightBottomContainer>
          </BottomContainer>

          <SubmitButton type="submit">Add Product</SubmitButton>
        </AddProductContainer>
      </FormContainer>
      <ToastContainer /> 
    </>
  );
};

export default AddProductForm;


const FormContainer = styled.form`
  width: 90%;
  padding: 20px;
  position: relative;
  margin: 20px auto;
  background-color: #fff;
 border: 1px solid #ccc;
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center; 
`;

const AddProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

const FormTitle = styled.h2`
  font-size: 26px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 100%; 

  label {
    font-size: 14px;
    font-weight: 600;
    display: block;
    color: #555;
    margin-bottom: 5px;
  }

  .longInput {
    font-family: 'Poppins', sans-serif;
    width: 100%;
    max-width: 400px; 
    padding: 12px;
    font-size: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #ff6600;
      outline: none;
    }
  }
.category {
  font-family: 'Poppins', sans-serif;
  width: 100%;
  max-width: 200px; 
  padding: 12px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #ff6600;
    outline: none;
  }
}
  .smallInput {
    font-family: 'Poppins', sans-serif;
    width: 100%;
    max-width: 200px;
    padding: 12px;
    font-size: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #ff6600;
      outline: none;
    }
  }
  
  textarea {
    font-family: 'Poppins', sans-serif;
    width: 100%;
    max-width: 400px;
    padding: 12px;
    font-size: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #ff6600;
      outline: none;
    }

    resize: vertical;
    height: 150px;
  }

  input[type="checkbox"] {
    width: auto;
    margin-right: 10px;
  }
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;

const LeftContainer = styled.div`
  width: 48%;
`;

const RightContainer = styled.div`
  width: 48%;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const LeftBottomContainer = styled.div`
  width: 48%;
`;

const RightBottomContainer = styled.div`
  width: 48%;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxLabel = styled.span`
  font-size: 16px;
  color: #555;
`;

const ImageInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px dashed ${props => (props.dragOver ? '#007bff' : '#ccc')};
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: border-color 0.3s;

  &:hover {
    border-color: #ff6600;
  }
`;

const DragDropText = styled.div`
  text-align: center;
  color: #777;
  font-size: 16px;
  margin-bottom: 10px;
`;

const BrowseButton = styled.button`
font-family: 'Poppins', sans-serif;
  background: none;
  border: none;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
  font-size: 16px;
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 100px;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 10px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

const SubmitButton = styled.button`
  background-color: #000099;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Poppins', sans-serif;
  align-self: flex-start;

  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #555;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;
