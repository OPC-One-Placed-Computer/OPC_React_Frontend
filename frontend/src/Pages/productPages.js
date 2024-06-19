import React, { useState } from 'react';
import Product from '../Components/product'; 
import '../Styles/product.css';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const products = [
    {
      id: 1,
      image: 'https://via.placeholder.com/200',
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

  return (
    <div className="products-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="products-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <Product
              image={product.image}
              brand={product.brand}
              productName={product.productName}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
