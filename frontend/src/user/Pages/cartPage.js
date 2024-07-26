import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import updateCartItem from '../Function/updateCartItem';
import ProductDetailPage from './productDetailPage';
import emptyCart from '../Animations/emptyCart.json';
import Lottie from 'lottie-react';
import Modal from '../Components/modal';
import getImageUrl from '../../tools/media';
import Footer from '../Components/footer';
import Breadcrumb from '../Components/breadcrumb';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage('');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const fetchCartData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://onepc.online/api/v1/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const productsWithImageUrls = await Promise.all(
        response.data.data.map(async (product) => {
          const imageUrl = await getImageUrl(product.product.image_path);
          return { ...product, imageUrl };
        })
      );
      setProducts(productsWithImageUrls);
    } catch (error) {
      toast.error('Error fetching cart data.');
      console.error('Error fetching cart data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = async (cart_id, newQuantity) => {
    if (newQuantity > 0) {
      try {
        await updateCartItem(cart_id, newQuantity, setProducts);
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    } else if (newQuantity === 0) {
      await deleteCartItem(cart_id);
    }
  };

  const deleteCartItem = async (cart_id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`https://onepc.online/api/v1/cart/${cart_id}`, {
        quantity: 0,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(prevProducts => prevProducts.filter(product => product.cart_id !== cart_id));
      toast.success('Item removed from cart.');
    } catch (error) {
      toast.error('Error removing item from cart.');
      console.error('Error deleting cart item:', error);
    }
  };

  const handleCheckboxChange = (productId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(productId)
        ? prevSelectedItems.filter((id) => id !== productId)
        : [...prevSelectedItems, productId]
    );
  };

  const handleAllCheckboxChange = () => {
    if (isAllChecked) {
      setSelectedItems([]);
    } else {
      setSelectedItems(products.map(product => product.product_id));
    }
    setIsAllChecked(!isAllChecked);
  };

  const handleDeleteSelectedItems = async () => {
    if (selectedItems.length === 0) {
      toast.info('Please select a product to delete.');
    } else {
      const token = localStorage.getItem('token');
      try {
        await Promise.all(
          selectedItems.map(async (productId) => {
            const productToDelete = products.find(product => product.product_id === productId);
            if (productToDelete) {
              await axios.delete(`https://onepc.online/api/v1/cart/${productToDelete.cart_id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            }
          })
        );
        setSelectedItems([]);
        setProducts(prevProducts => prevProducts.filter(product => !selectedItems.includes(product.product_id)));
        toast.success('Selected items deleted successfully.');
      } catch (error) {
        toast.error('Error deleting selected items.');
        console.error('Error deleting cart items:', error);
      }
    }
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.info('Please select a product to checkout.');
    } else {
      const selectedProducts = products.filter(product => selectedItems.includes(product.product_id));
      navigate('/placeOrder', {
        state: {
          products: selectedProducts.map(product => ({
            productName: product.product.product_name,
            price: product.product.price,
            quantity: product.quantity,
            productImage: product.imageUrl,
            subtotal: product.subtotal,
            cart_id: product.cart_id
          })),
        },
      });
    }
  };

  const handleProductClick = async (product_id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://onepc.online/api/v1/products/${product_id}`);
      if (response.data) {
        setSelectedProduct(response.data.data);
        setIsModalOpen(true);
      } else {
        toast.info('Product not found.');
        console.log('Product not found:', product_id);
      }
    } catch (error) {
      toast.error('Error fetching product details.');
      console.error('Error fetching product details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const renderEmptyCart = () => (
    <EmptyCartContainer>
      <Lottie animationData={emptyCart} autoplay loop style={{ width: 200, height: 200 }} />
      <p>Your cart is empty.</p>
      <ReturnToShopButton onClick={() => navigate('/products')}>Return to Shop</ReturnToShopButton>
    </EmptyCartContainer>
  );

  const renderCartContent = () => {
    if (isLoading) {
      return (
        <LoaderContainer>
          <ScaleLoader color="#00008B" />
        </LoaderContainer>
      );
    } else if (products.length === 0) {
      return renderEmptyCart();
    } else {
      return (
        <>
         
          <CartLayout>
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              checked={isAllChecked}
              onChange={handleAllCheckboxChange}
            />
            <CheckboxLabel>Select All</CheckboxLabel>
          </CheckboxContainer>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.product_id}>
                      <td onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          type="checkbox"
                          checked={selectedItems.includes(product.product_id)}
                          onChange={() => handleCheckboxChange(product.product_id)}
                        />
                      </td>
                      <td>
                        <ProductImage src={product.imageUrl} alt={product.product.product_name} />
                      </td>
                      <td>
                        <ProductName onClick={() => handleProductClick(product.product_id)}>{product.product.product_name}</ProductName>
                      </td>
                      <td>₱{Number(product.product.price).toFixed(2)}</td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <QuantityControls>
                          <button className='subtract' onClick={() => handleQuantityChange(product.cart_id, product.quantity - 1)}>-</button>
                          <span>{product.quantity}</span>
                          <button className='addition' onClick={() => handleQuantityChange(product.cart_id, product.quantity + 1)}>+</button>
                        </QuantityControls>
                      </td>
                      <td>₱{Number(product.subtotal).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <TotalsTable>
                <thead>
                  <tr>
                    <th>Cart Totals</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td>₱{products.reduce((total, product) => total + parseFloat(product.subtotal), 0).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>₱{products.reduce((total, product) => total + parseFloat(product.subtotal), 0).toFixed(2)}</td>
                  </tr>
                  <tr>
                <td colSpan="5">
                <ActionButtons>
                <CheckoutButton onClick={handleCheckout}>Check Out</CheckoutButton>
                <DeleteButton onClick={handleDeleteSelectedItems}>Clear Cart</DeleteButton>
              </ActionButtons>
                </td>
                </tr>
                </tbody>
              </TotalsTable>
            </TableContainer>
          </CartLayout>
          <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            {selectedProduct && <ProductDetailPage product={selectedProduct} />}
          </Modal>
          
        </>
      );
    }
  };

  return (
    <>
    <PageContainer>
    <Breadcrumb items={[{ label: 'Home', path: '/HomePage' }, { label: 'Shopping Cart' }]} />
    <ToastContainer />
      {renderCartContent()}
    </PageContainer>
    <Footer />
    </>
  );
};

export default CartPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
`
const CartLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`
const TableContainer = styled.div`
  width: 90%;
  overflow-x: auto;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  background-color: #fff;
`
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  td, {
    height: 70px;
  }

  th {
    background-color: #f4f4f4;
  }
`
const TotalsTable = styled.table`
  width: 50%;
  border-collapse: collapse;
  border: 1px solid #ddd;
  height: 400px;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }
`
const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`
const ProductName = styled.span`
  cursor: pointer;
  color: #00008B;
`
const QuantityControls = styled.div`
  display: flex;
  align-items: center;

  button {
    background: #ddd;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }

  span {
    margin: 0 10px;
  }
`
const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
`
const DeleteButton = styled.button`
  font-family: 'Poppins', sans-serif;
  background-color:  #d22630;
  color: white;
  border: none;
  border-radius: 35px;
  height: 60px;
  padding: 10px 20px;
  cursor: pointer;
`
const CheckoutButton = styled.button`
  font-family: 'Poppins', sans-serif;
  height: 60px;
  background-color: #000099;
  border-radius: 35px;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`
const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  p {
    font-size: 18px;
    margin-top: 20px;
  }
`
const ReturnToShopButton = styled.button`
  font-family: 'Poppins', sans-serif;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
`
const CheckboxContainer = styled.div`
  width: 90%;
  margin-top: 30px;
  display: flex;
  align-items: center;
`
const Checkbox = styled.input`
  margin-right: 10px;
`
const CheckboxLabel = styled.label`
  font-size: 16px;
  color: #333;
`
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`


