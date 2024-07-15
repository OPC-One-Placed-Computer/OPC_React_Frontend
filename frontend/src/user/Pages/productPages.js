import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../Components/product';
import styled from 'styled-components';
import { IoSearchOutline } from "react-icons/io5";
import Axios from 'axios';
import ReactPaginate from 'react-paginate';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page) => {
    try {
      const response = await Axios.get(`https://onepc.online/api/v1/products?page=${page}`);
      console.log("Fetch Products Response:", response.data); // Log response data
      if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
        const { data, meta } = response.data.data;
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        const uniqueBrands = [...new Set(data.map(product => product.brand))];
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);

        if (meta && meta.last_page) {
          setTotalPages(meta.last_page);
        } else {
          setTotalPages(1);
        }

        if (meta && meta.per_page) {
          setItemsPerPage(meta.per_page);
        }
      } else {
        setProducts([]);
        setFilteredProducts([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setFilteredProducts([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (selectedBrand) params.append('brand', selectedBrand);
        if (selectedCategory) params.append('category', selectedCategory);
        if (minPrice !== '') params.append('min_price', minPrice);
        if (maxPrice !== '') params.append('max_price', maxPrice);

        const query = `https://onepc.online/api/v1/products?${params.toString()}`;

        const response = await Axios.get(query);
        console.log("Filtered Products Response:", response.data); // Log filtered products response

        if (response.data && response.data.data) {
          setFilteredProducts(response.data.data.data);
          const { meta } = response.data.data;
          if (meta && meta.last_page) {
            setTotalPages(meta.last_page);
          } else {
            setTotalPages(1);
          }
        } else {
          setFilteredProducts([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching filtered products:", error);
        setFilteredProducts([]);
        setTotalPages(1);
      }
    };

    fetchFilteredProducts();
  }, [searchTerm, selectedBrand, selectedCategory, minPrice, maxPrice]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
  };

  const handleBrandChange = event => {
    setSelectedBrand(event.target.value);
  };

  const handleMinPriceChange = event => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = event => {
    setMaxPrice(event.target.value);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.product_id}`, { state: { product } });
  };

  const handlePageClick = ({ selected }) => {
    const nextPage = selected + 1;
    setCurrentPage(nextPage);
  };

  const offset = (currentPage - 1) * itemsPerPage;
  const currentPageData = filteredProducts.slice(offset, offset + itemsPerPage);


  // Debugging logs
  console.log("Current Page:", currentPage);
  console.log("Filtered Products:", filteredProducts);
  console.log("Current Page Data:", currentPageData);
  console.log("Offset:", offset);
  console.log("Items Per Page:", itemsPerPage);
  return (
    <PageContainer>
      <Sidebar>
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
          <Input 
            type="number" 
            placeholder="Min Price" 
            value={minPrice} 
            onChange={handleMinPriceChange} 
          />
          <Input 
            type="number" 
            placeholder="Max Price" 
            value={maxPrice} 
            onChange={handleMaxPriceChange} 
          />
        </Filters>
      </Sidebar>
      <Content>
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
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </PaginationContainer>
      </Content>
    </PageContainer>
  );
};

export default ProductsPage;


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Sidebar = styled.div`
  width: 100%;
  padding: 20px;
  position: fixed;
  background-color: #f8f8f8;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;

  @media (min-width: 768px) {
    width: 250px;
    height: 100vh;
  }
`;

const Content = styled.div`
  margin-left: 0;
  padding: 1.5rem;
  flex: 1;

  @media (min-width: 768px) {
    margin-left: 270px;
    padding: 3rem;
  }
`;

const Search = styled.div`
  margin-bottom: 2rem;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;

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
    padding: 1rem 1rem 1rem 2.75rem; 
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 2rem;
    box-sizing: border-box;

    @media (max-width: 768px) {
      width: 100%; 
      padding: 0.75rem 1rem 0.75rem 2.75rem; 
      font-size: 0.875rem;
    }
  }
`;

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;

  @media (max-width: 768px) {
    width: calc(100% - 2.75rem);
    gap: 0.625rem;
  }
`;
const Input = styled.input`
  font-family: 'Poppins', sans-serif;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 2rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.75rem; 
    font-size: 0.875rem;
  }
`;

const Select = styled.select`
  font-family: 'Poppins', sans-serif;
  width: 100%;
  padding: 0.625rem 0.9375rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 2rem;

  @media (max-width: 768px) {
    width: calc(100% - 2px);
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
  }

  option {
    font-size: 0.875rem;
    padding: 0.5rem 0.9375rem;
    font-family: 'Poppins', sans-serif;
    width: 100%; 

    @media (max-width: 768px) {
      padding: 0.5rem 0.75rem; 
    }
  }
`;


const ProductList = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr)); 
gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr)); 
    margin-top: 200px;
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(9.375rem, 1fr)); 
    margin-top: 200px;
  }
`;

const ProductCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }
`;

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
    text-decoration: none;
    color: inherit;
    font-family: 'Poppins', sans-serif;
  }

  .pagination li.active a {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
  }
`;
