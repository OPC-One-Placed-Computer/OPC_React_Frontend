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
  const [filteredProducts, setFilteredProducts] = useState([]);
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
          setFilteredProducts(response.data.data);
          const uniqueCategories = [...new Set(response.data.data.map(product => product.category))];
          const uniqueBrands = [...new Set(response.data.data.map(product => product.brand))];
          setCategories(uniqueCategories);
          setBrands(uniqueBrands);
        } else {
          setProducts([]);
          setFilteredProducts([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setProducts([]);
        setFilteredProducts([]);
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      Axios.get(`https://onepc.online/api/v1/products/search?keyword=${searchTerm}`)
        .then((response) => {
          if (response.data && Array.isArray(response.data.data)) {
            setFilteredProducts(response.data.data);
          } else {
            setFilteredProducts([]);
          }
        })
        .catch((error) => {
          console.log(error);
          setFilteredProducts([]);
        });
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

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
  const currentPageData = filteredProducts.filter(product =>
    (selectedCategory ? product.category === selectedCategory : true) &&
    (selectedBrand ? product.brand === selectedBrand : true)
  ).slice(offset, offset + itemsPerPage);
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
`;

const ProductPage = styled.div`
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Search = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 37.5rem;

  .search-icon {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    font-size: 1.25rem;
    color: #ccc;
  }

  .search-input {
    font-family: 'Poppins', sans-serif;
    width: 100%;
    padding: 1rem 1.25rem 1rem 2.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 1.25rem;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    .search-icon {
      left: 0.75rem;
      font-size: 1rem;
    }
    
    .search-input {
      padding: 0.625rem 0.9375rem 0.625rem 2.25rem;
      font-size: 0.875rem;
    }
  }
`;

const Filters = styled.div`
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.625rem;
  }
`;

const Select = styled.select`
  font-family: 'Poppins', sans-serif;
  padding: 0.625rem 0.9375rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 1.25rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
  }
`

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15.625rem, 1fr));
  gap: 1.25rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr)); 
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(9.375rem, 1fr)); 
  }
`

const ProductCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }
`
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  .pagination {
    display: flex;
    list-style: none;
    gap: 0.625rem;
  }

  @media (max-width: 768px) {
    gap: 0.3125rem;
  }

  .pagination li a {
    padding: 0.625rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.3125rem;
    cursor: pointer;
  }

  .pagination li a:hover {
    background-color: #f0f0f0;
  }

  .pagination li.active a {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }

  .pagination li.disabled a {
    color: #ccc;
    cursor: not-allowed;
  }
`
