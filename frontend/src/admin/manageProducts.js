import React, { useEffect, useState } from 'react';
import AddProductForm from '../admin/Components/addProductForm';
import UpdateProductForm from './Components/updateProductForm';
import styled from 'styled-components';
import { IoSearchOutline } from "react-icons/io5";
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getImageUrl from '../tools/media';
import ReactPaginate from 'react-paginate';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ConfirmationModal from './Components/confirmationModal';

const ManageProducts = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isEditingProduct, setIsEditingProduct] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [productToDelete, setProductToDelete] = useState(null); 


  useEffect(() => {
    if (!isAddingProduct && !isEditingProduct) {
      fetchProducts(currentPage);
    }
  }, [currentPage, isAddingProduct, isEditingProduct]);

  const fetchProducts = async (page) => {
    try {
      const response = await Axios.get(`https://onepc.online/api/v1/products?page=${page}`);
      console.log('Fetched products:', response.data); // Debug fetched data
      if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
        const { data, meta } = response.data.data;
        const productsWithImages = await Promise.all(data.map(async (product) => {
          const imageUrl = await getImageUrl(product.image_path);
          return { ...product, imageUrl };
        }));

        setFilteredProducts(productsWithImages);
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

        const query = `https://onepc.online/api/v1/products?${params.toString()}`;

        const response = await Axios.get(query);
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
fetchProducts();
    fetchFilteredProducts();
  }, [searchTerm, selectedBrand, selectedCategory]);

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
    const nextPage = selected + 1;
    setCurrentPage(nextPage);
  };

  
  const handleDelete = (productId) => {
    setProductToDelete(productId);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    const token = localStorage.getItem('token');

    Axios.delete(`https://onepc.online/api/v1/products/${productToDelete}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        fetchProducts(currentPage);
        setIsModalOpen(false);
        toast.success('Product deleted successfully!');
      })
      .catch(error => {
        console.error("There was an error deleting the product!", error);
        toast.error('Failed to delete the product. Please try again.');
        setIsModalOpen(false);
      });
  };

  const handleAdd = () => {
    setIsAddingProduct(true);
  };

  const handleEdit = (product) => {
    console.log('Editing product:', product);
    setCurrentProduct(product);
    setIsEditingProduct(true); 
  };

  const handleUpdate = async (updatedProduct) => {
    const token = localStorage.getItem('token');
    try {
      const formData = new FormData();
      Object.keys(updatedProduct).forEach(key => {
        if (updatedProduct[key] !== undefined && updatedProduct[key] !== null) {
          formData.append(key, updatedProduct[key]);
        }
      });
  
      const response = await Axios.post(`https://onepc.online/api/v1/products/${updatedProduct.product_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Product updated:', response.data);
      fetchProducts(currentPage);
      setIsEditingProduct(false);
      setCurrentProduct(null);
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error("There was an error updating the product!", error);
      toast.error('Failed to update the product. Please try again.');
    }
  };

  const handleCloseForm = () => {
    setIsAddingProduct(false);
    setIsEditingProduct(false);
    setCurrentProduct(null);
  };


  return (
    <PageContainer>
      <Content>
        <ProductPage>
        {isAddingProduct ? (
            <AddProductForm 
            handleCloseForm={handleCloseForm} />
          ) : isEditingProduct ? (
            <UpdateProductForm
              handleCloseForm={handleCloseForm}
              currentProduct={currentProduct}
              handleUpdate={handleUpdate}
            />
          ) : (
            <>
              <Search>
                <SearchContainer>
                  <IoSearchOutline className="search-icon" />
                  <SearchInput
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                  />
                </SearchContainer>
              </Search>
              <FiltersAndButtonContainer>
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
                <AddButton onClick={handleAdd}>+ Add Product</AddButton>
              </FiltersAndButtonContainer>
              <ProductTableContainer>
                <ProductTable>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Brand</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => (
                      <tr key={product.product_id}>
                        <td><img src={product.imageUrl} alt={product.product_name} /></td>
                        <td>{product.brand}</td>
                        <td>{product.product_name}</td>
                        <td>{product.quantity}</td>
                        <td>${product.price}</td>
                        <td>
                        <ActionsContainer>
                            <FaEdit className="icon edit" onClick={() => handleEdit(product)} />
                            <FaTrash className="icon delete" onClick={() => handleDelete(product.product_id)} />
                          </ActionsContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </ProductTable>
              </ProductTableContainer>
              <PaginationContainer>
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={"..."}
                  pageCount={totalPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              </PaginationContainer>
            </>
          )}
           <ToastContainer />
        </ProductPage>
      </Content>
      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this product?"
      />
    </PageContainer>
  );
};

export default ManageProducts;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;

`;

const ProductPage = styled.div`
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px;
`;
const Search = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
 
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const SearchInput = styled.input`
  font-family: 'Poppins', sans-serif;
  flex-grow: 1; 
  padding: 10px;
  border: none;
  outline: none;
  font-size: 12px;
  border-radius: 20px;
  background: none; 
`;


const FiltersAndButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;


const Filters = styled.div`
  display: flex;
  justify-content: flex-start;


  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Select = styled.select`
  font-family: 'Poppins', sans-serif;
  padding: 10px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;

  @media (max-width: 600px) {
    margin-bottom: 10px;
    margin-right: 0;
  }
`;


const AddButton = styled.button`
  font-family: 'Poppins', sans-serif;
  align-self: flex-end;
  padding: 10px 20px;
  font-size: 12px;
  background-color: #000099;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProductTableContainer = styled.div`
  overflow-x: auto;
  max-height: 400px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  thead {
    position: sticky;
    top: 0;
    background-color: #f2f2f2;
    z-index: 1;
  }

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  td {
    vertical-align: top;
  }

  tr:hover {
    background-color: #f5f5f5;
  }

  img {
    width: 50px;  
    height: 50px;
    object-fit: cover; 
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;
  .icon {
    cursor: pointer;
    font-size: 18px;
  }
  .edit {
    color: #007bff;
    &:hover {
      color: #0056b3;
    }
  }
  .delete {
    color: #dc3545;
    &:hover {
      color: #c82333;
    }
  }
`;
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
