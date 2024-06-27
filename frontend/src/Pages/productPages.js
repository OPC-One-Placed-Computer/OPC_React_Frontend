import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Product from '../Components/product'; 
import styled from 'styled-components';
import { IoSearchOutline } from "react-icons/io5";
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
    <PageContainer>
      <Content>
    <ProductPage>
      <Search>
    <SearchContainer>
          <IoSearchOutline className="search-icon" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm} 
            onChange={handleSearchChange} 
            className="search-input" 
          />
        </SearchContainer>
        </Search>
      <ProductList>
        {filteredProducts.map(product => (
          <ProductCard key={product.product_id} onClick={() => handleProductClick(product)}>
            <Product
              image={product.image_path}
              brand={product.brand}
              product_name={product.product_name}
              price={product.price}
              product_id={product.product_id}
            />
          </ProductCard>
        ))}
      </ProductList>
    </ProductPage>
    </Content>
    <Footer />
    </PageContainer>
  );
};

export default ProductsPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const ProductPage = styled.div`
  padding: 30px;
`
const Content = styled.div`
  flex: 1;
`

const Search = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;

`
const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;

  .search-icon {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    font-size: 20px;
    color: #ccc;
  }

  .search-input {
    font-family: 'Poppins', sans-serif;
    width: 100%;
    padding: 15px 20px 15px 45px;
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
