import React, { useEffect, useState } from 'react';
import Product from '../admin/Components/adminProduct'; 
import AddProductForm from '../admin/Components/addProductForm';
import UpdateProductForm from '../admin/Components/updateProductForm';
import styled from 'styled-components';
import { IoSearchOutline } from "react-icons/io5";
import Axios from 'axios';
import ReactPaginate from 'react-paginate';

const ManageProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [newProductData, setNewProductData] = useState({
    product_name: '',
    category: '',
    brand: '',
    price: 0,
    image_path: ''
  });

 
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = (page) => {
    Axios.get(`https://onepc.online/api/v1/products?page=${page}`)
      .then((response) => {
        console.log("API response:", response);
        if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
          const productsData = response.data.data.data;
          const meta = response.data.data.meta;
          setProducts(productsData);
          setFilteredProducts(productsData);
          const uniqueCategories = [...new Set(productsData.map(product => product.category))];
          const uniqueBrands = [...new Set(productsData.map(product => product.brand))];
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
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
        setFilteredProducts([]);
        setTotalPages(1); 
      });
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const baseURL = 'https://onepc.online/api/v1/products';
        const params = new URLSearchParams();
  
        if (searchTerm) params.append('search', searchTerm);
        if (selectedBrand) params.append('brand', selectedBrand);
        if (selectedCategory) params.append('category', selectedCategory);
      
        const query = `${baseURL}?${params.toString()}`;
  
        const response = await Axios.get(query);
  
        if (response.data && response.data.data) {
          setFilteredProducts(response.data.data.data);
        } else {
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error("Error fetching filtered products:", error);
        setFilteredProducts([]);
      }
    };
  
    fetchFilteredProducts();
  }, [searchTerm, selectedBrand, selectedCategory, currentPage]);
  
  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
  };

  const handleBrandChange = event => {
    setSelectedBrand(event.target.value);
  };


  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };


  const handleDelete = (productId) => {
    Axios.delete(`https://onepc.online/api/v1/products/${productId}`)
      .then(() => {
        setProducts(products.filter(product => product.product_id !== productId));
      })
      .catch(error => {
        console.error("There was an error deleting the product!", error);
      });
  };

  const handleAdd = () => {
    setShowAddForm(true); 
  };

  const updateAdd = () => {
    setShowUpdateForm(true);
  }

  const handleCloseForm = () => {
    setShowAddForm(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProductData({ ...newProductData, [name]: value });
  };

  

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredProducts.slice(offset, offset + itemsPerPage);


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
          <AddButton onClick={handleAdd}>Add New Product</AddButton>
          <AddProductForm
            showAddForm={showAddForm}
            showUpdateForm={showUpdateForm}
            handleCloseForm={handleCloseForm}
            handleInputChange={handleInputChange}
            // handleFormSubmit={handleFormSubmit}
            newProductData={newProductData}
          />
          <ProductList>
            {currentPageData.map(product => (
              <ProductCard key={product.product_id}>
                <Product
                  image={product.image_path}
                  brand={product.brand}
                  product_name={product.product_name}
                  price={product.price}
                  product_id={product.product_id}
                />
                <ButtonContainer>
                  <ActionButton onClick={updateAdd}>Update</ActionButton>
                  <ActionButton onClick={() => handleDelete(product.product_id)}>Delete</ActionButton>
                </ButtonContainer>
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
        </ProductPage>
      </Content>
    </PageContainer>
  );
};

export default ManageProducts;

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

const AddButton = styled.button`
  font-family: 'Poppins', sans-serif;
  padding: 10px 20px;
  font-size: 16px;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;

  &:hover {
    background-color: #0056b3;
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
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`

const ActionButton = styled.button`
  font-family: 'Poppins', sans-serif;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #218838;
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

