import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Product from '../Components/product'; 
import styled from 'styled-components';
import Axios from 'axios';
import Footer from '../Components/footer';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get("https://onepc.online/api/v1/products")
      .then((response) => {
        console.log(response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          setProducts([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setProducts([]);
      });
  }, []);
  
  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div>
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
              image={product.image_path}
              brand={product.brand}
              product_name={product.product_name}
              price={product.price}
            />
          </ProductCard>
        ))}
      </ProductList>
    </ProductPage>
    <Footer />
    </div>
  );
};

export default ProductsPage;

const ProductPage = styled.div`
  padding: 30px;
`

const Search = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  
  .search-input {
    width: 100%;
    max-width: 400px; 
    padding: 15px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 25px;
  }
`

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
  }
`

const ProductCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`
