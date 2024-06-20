import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Product from '../Components/product'; 
import styled from 'styled-components';

import Image1 from '../assets/bc_image.jpg';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();  // Use useNavigate
  
  const products = [
    {
      id: 1,
      image: Image1,
      brand: 'Example Brand 1',
      productName: 'Product 1',
      price: '19.99',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/200',
      brand: 'Example Brand 2',
      productName: 'Product 2',
      price: '29.99',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/200',
      brand: 'Example Brand 3',
      productName: 'Product 3',
      price: '39.99',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/200',
      brand: 'Example Brand 4',
      productName: 'Product 4',
      price: '49.99',
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/200',
      brand: 'Example Brand 5',
      productName: 'Product 5',
      price: '59.99',
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/200',
      brand: 'Example Brand 6',
      productName: 'Product 6',
      price: '39.99',
    },
    {
      id: 7,
      image: 'https://via.placeholder.com/200',
      brand: 'Example Brand 7',
      productName: 'Product 7',
      price: '69.99',
    },
    {
      id: 8,
      image: 'https://via.placeholder.com/200',
      brand: 'Example Brand 8',
      productName: 'Product 8',
      price: '29.99',
    },
  ];

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <ProductPage>
      <Search>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </Search>
      <ProductList>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} onClick={() => handleProductClick(product)}>
            <Product
              image={product.image}
              brand={product.brand}
              productName={product.productName}
              price={product.price}
            />
          </ProductCard>
        ))}
      </ProductList>
    </ProductPage>
  );
};

export default ProductsPage;

const ProductPage = styled.div `
  padding: 30px;
`
const Search = styled.div `
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  
  .search-input {
  width: 70%;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 25px;
  }
`
const ProductList = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`
const ProductCard = styled.div `
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  ProductCard:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

`
