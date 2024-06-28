import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Product from '../Components/product'; 
import styled from 'styled-components';
import { IoSearchOutline } from "react-icons/io5";
import Axios from 'axios';
import Footer from '../Components/footer';
import ReactPaginate from 'react-paginate';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();  
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    Axios.get("https://onepc.online/api/v1/products")
      .then((response) => {
        console.log(response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
          const uniqueCategories = [...new Set(response.data.data.map(product => product.category))];
          const uniqueBrands = [...new Set(response.data.data.map(product => product.brand))];
          setCategories(uniqueCategories);
          setBrands(uniqueBrands);
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
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory ? product.category === selectedCategory : true) &&
    (selectedBrand ? product.brand === selectedBrand : true)
  );

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
  };

  const handleBrandChange = event => {
    setSelectedBrand(event.target.value);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.product_id}`, { state: { product } });
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredProducts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

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
          <Filters>
            <Select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>
            <Select value={selectedBrand} onChange={handleBrandChange}>
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </Select>
          </Filters>
          <ProductList>
            {currentPageData.map(product => (
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
          <PaginationContainer>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </PaginationContainer>
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
  padding: 50px;
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

const Filters = styled.div`
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`

const Select = styled.select`
  font-family: 'Poppins', sans-serif;
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 25px;
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .pagination {
    display: flex;
    list-style: none;
    gap: 10px;
  }

  .pagination li {
    cursor: pointer;
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .pagination li.active {
    background-color: #007bff;
    color: white;
  }
`
