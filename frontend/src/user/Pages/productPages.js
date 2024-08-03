import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../Components/product';
import styled from 'styled-components';
import { IoSearchOutline, IoFilterOutline } from "react-icons/io5";
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import emptyOrder from '../Animations/emptyOrder.json';
import Lottie from 'lottie-react';
import Slider from 'react-slider';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const sidebarRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page) => {
    try {
      const response = await Axios.get(`https://onepc.online/api/v1/products?page=${page}`);
      console.log("Fetch Products Response:", response.data); 
      if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
        const { data, meta } = response.data.data;
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
      } else {
        setFilteredProducts([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
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
        console.log("Filtered Products Response:", response.data); 

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

  
  useLayoutEffect(() => {
    const adjustMarginTop = () => {
      if (window.innerWidth <= 768 && sidebarRef.current && contentRef.current) {
        const sidebarHeight = sidebarRef.current.offsetHeight;
        contentRef.current.style.marginTop = `${sidebarHeight}px`;
      } else {
        contentRef.current.style.marginTop = '0px';
      }
    };

    adjustMarginTop();
    window.addEventListener('resize', adjustMarginTop);

    return () => {
      window.removeEventListener('resize', adjustMarginTop);
    };
  }, [showFilters]);

  useEffect(() => {
    let lastScrollY = window.scrollY; 
    let hasScrolledDown = false; 
  
    const handleScroll = () => {
      if (window.innerWidth <= 768) { 
        if (window.scrollY > lastScrollY) {
          hasScrolledDown = true; 
          setShowFilters(false);
        }
        lastScrollY = window.scrollY; 
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  

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

  const handleSliderChange = (values) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.product_id}`, { state: { product } });
  };

  const handlePageClick = ({ selected }) => {
    const nextPage = selected + 1;
    setCurrentPage(nextPage);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

 
  return (
    <PageContainer>
      <Sidebar ref={sidebarRef}>
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
          <FilterContainer onClick={toggleFilters}>
            <IoFilterOutline className="filter-icon"  />
            </FilterContainer>
        </Search>
        <Filters show={showFilters}>
          <div className='categoryCon'>
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
          </div>
          <InputContainer>
          <label>Min</label>
          <label>Max</label>
          </InputContainer>
          <PriceInputsContainer>
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
          </PriceInputsContainer>
          
          <SliderContainer>
            <Slider
              value={[minPrice, maxPrice]}
              min={0}
              max={100000}
              step={10}
              onChange={handleSliderChange}
              renderTrack={(props, state) => <div {...props} />}
              renderThumb={(props, state) => <div {...props} />}
            />
          </SliderContainer>
        </Filters>
      </Sidebar>
      <Content ref={contentRef}>
        <ProductList>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.product_id} onClick={() => handleProductClick(product)}>
                <Product
                  image={product.image_path}
                  brand={product.brand}
                  product_name={product.product_name}
                  price={product.price}
                  product_id={product.product_id}
                />
              </ProductCard>
            ))
          ) : (
            <NoProductsContainer>
              <Lottie animationData={emptyOrder} autoplay loop style={{ width: 200, height: 200 }} />
      <p>Your Product is empty.</p>
            </NoProductsContainer>
          )}
        </ProductList>
        {filteredProducts.length > 0 && (
          <PaginationContainer>
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
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
        )}
      </Content>
    </PageContainer>
  );
};

export default ProductsPage;


const PageContainer = styled.div`
  * {
    -webkit-tap-highlight-color: transparent;
  }
  display: flex;
  flex-direction: row; 
  min-height: 100vh;
  overflow-x: hidden;

  @media (max-width: 768px) {
    flex-direction: column; 
  }
`;
const NoProductsContainer = styled.div`
  position: absolute; 
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  p {
    font-size: 18px;
    margin-top: 20px;

    @media (max-width: 768px) {
      font-size: 16px;
      top: 50%;
      left: 50%;
    }
  }
`;
const Sidebar = styled.div`
padding-top: 20px;
  position: fixed;
  background-color: #f8f8f8;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  width: 250px; 
  height: 100%;
  amrgin: 10px;
  z-index: 1;

  
  @media (max-width: 768px) {
    width: calc(100% - 30px); 
    padding: 15px;
    height: auto;  
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    border-bottom-left-radius: 20px;  
    border-bottom-right-radius: 20px;
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: 1;
    transform: translateY(0);
  }
`;

const Content = styled.div`
  margin-left: 250px; 
  padding: 1.5rem;
  flex: 1;


  @media (max-width: 768px) {
    margin-left: 0; 
    padding: 1.5rem;
  }
`;

const Search = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
const SearchContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 80%;

  .search-icon {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    font-size: 1.25rem;
    color: #ccc;

    @media (max-width: 768px) {
      margin-top: 5px;
    }
  }

  .search-input {
    font-family: 'Poppins', sans-serif;
    padding: 0.7rem 0.7rem 0.7rem 2.5rem; 
    font-size: 12px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 2rem;
    box-sizing: border-box;


    @media (max-width: 768px) {
      margin-top: 10px;
      width: 100%; 
      padding: 0.75rem 1rem 0.75rem 2.75rem; 
      font-size: 0.875rem;
    }
  }
`
const FilterContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .filter-icon {
      font-size: 30px;
    }
  }
`;

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .categoryCon {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    display: ${props => props.show ? 'block' : 'none'};
    transform: ${props => (props.show ? 'translateX(0)' : 'translateX(-100%)')};
     
    .categoryCon {
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: center;
      gap: 20px;
    }
  }
`
const InputContainer = styled.div`
margin-top: 10px;
display: flex;
gap: 4rem;
width: 100%;
justify-content: center;

 label {
  font-size: 0.7rem;
 }

@media (max-width: 768px) {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-direction: row;
}
`
const PriceInputsContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 1rem;
  }
`
const Input = styled.input`
  font-family: 'Poppins', sans-serif;
  padding: 0.5rem 0.9rem; 
  font-size: 10px;
  border: 1px solid #ccc;
  border-radius: 2rem;
  box-sizing: border-box;
  width: 30%; 

  @media (max-width: 768px) {
    padding: 0.5rem 0.7rem; 
    gap: 10px;
    font-size: 10px;
    width: 20%; 
  }
`
const Select = styled.select`
  font-family: 'Poppins', sans-serif;
  width: 40%;
  align-self: center;
  padding: 0.5rem 0.7rem;
  font-size: 10px;
  border: 1px solid #ccc;
  border-radius: 2rem;

  @media (max-width: 768px) {
    width: 130px;
    font-size: 12px;
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
`
const ProductList = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr)); 
gap: 1rem;


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
  margin-top: 20px;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
  }

  .pagination li {
    margin: 0 5px;
    cursor: pointer;
  }

  .pagination li a {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 50%;
    text-decoration: none;
    color: #000099;
  }

  .pagination li.active a {
    background-color: #000099;
    color: white;
    border-color: #000099;
  }
`;
const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 80%;
  margin-top: 15px; 

  .track {
    height: 1px;
    background: black;
    border-radius: 3px;
    border: 1px solid black;
  }

  .thumb {
    height: 20px;
    width: 20px;
    background: #fff;
    border: 2px solid #000;
    border-radius: 50%;
    cursor: grab;
    transition: background 0.3s, border-color 0.3s;

    &:hover {
      background: #000;
      border-color: #fff;
    }
  }

  .thumb.active {
    background: #000;
    border-color: #fff;
  }

  .slider {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .value-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
  }

  .value {
    background-color: #f8f8f8;
    border: 1px solid #ccc;
    border-radius: 15px;
    padding: 5px 10px;
    font-family: 'Poppins', sans-serif;
    color: #000;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    .thumb {
      height: 16px;
      width: 16px;
    }

    .value {
      font-size: 12px;
      padding: 4px 8px;
    }

    .slider {
      margin-top: 10px;
      width: 90%; 
      margin: 0 auto;
    }

    .value-container {
      margin-top: 10px;
      width: 90%; 
      margin: 0 auto;
    }
  }

  @media (max-width: 480px) {
    .thumb {
      height: 12px;
      width: 12px;
    }

    .value {
      font-size: 10px;
      padding: 3px 6px;
    }

    .slider {
      width: 80%; 
    }

    .value-container {
      width: 80%; 
    }
  }
`
