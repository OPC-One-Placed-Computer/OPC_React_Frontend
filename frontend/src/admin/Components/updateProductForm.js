import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const UpdateProductForm = ({ handleCloseForm, currentProduct, handleUpdate }) => {
  const [product, setProduct] = useState({
    product_id: '',
    product_name: '',
    price: '',
    quantity: '',
    brand: '',
    category: '',
    description: '',
    featured: false,
    image: null,
  });

  useEffect(() => {
    if (currentProduct) {
      setProduct({
        ...currentProduct,
        image: null, 
      });
    }
  }, [currentProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setProduct({
      ...product,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(product);
  };

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
    setProduct({ ...product, image: file });
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <CloseButton type="button" onClick={handleCloseForm}>×</CloseButton>
        <FormTitle>Update Product</FormTitle>
        <TopContainer>
          <LeftContainer>
            <FormGroup>
              <label htmlFor="product_name">Product Name:</label>
              <input
                className='longInput'
                type="text"
                id="product_name"
                name="product_name"
                value={product.product_name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="brand">Brand:</label>
              <input
                className='longInput'
                type="text"
                id="brand"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="category">Category:</label>
              <select
                className='category'
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
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
              <label htmlFor="price">Price:</label>
              <input
                className='smallInput'
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="quantity">Quantity:</label>
              <input
                className='smallInput'
                type="number"
                id="quantity"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </RightContainer>
        </TopContainer>

        <BottomContainer>
          <LeftBottomContainer>
            <FormGroup>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="featured">Featured:</label>
              <CheckboxContainer>
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={product.featured}
                  onChange={handleChange}
                />
                <CheckboxLabel>Yes</CheckboxLabel>
              </CheckboxContainer>
            </FormGroup>
          </LeftBottomContainer>

          <RightBottomContainer>
            <FormGroup>
              <label htmlFor="image">Image:</label>
              <ImageInputContainer
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                dragOver={dragOver}
              >
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }} 
                />
                <DragDropText>
                  Drag and drop your file here
                  <br />
                  or
                  <br />
                  <BrowseButton type="button" onClick={() => document.querySelector('#image').click()}>
                    Browse files
                  </BrowseButton>
                </DragDropText>
                <ImagePreview>
                  {product.image && <img src={URL.createObjectURL(product.image)} alt="Preview" />}
                </ImagePreview>
              </ImageInputContainer>
            </FormGroup>
          </RightBottomContainer>
        </BottomContainer>

        <SubmitButton type="submit">Update Product</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default UpdateProductForm;

const FormContainer = styled.div`
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

const Form = styled.form`
width: 100%;
display: flex;
flex-direction: column;
align-items: center; 
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;

  &:hover {
    color: #666;
  }
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 100%; 

  label {
    font-size: 16px;
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
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Poppins', sans-serif;
  align-self: flex-start;

  &:hover {
    background-color: #0056b3;
  }
`;


