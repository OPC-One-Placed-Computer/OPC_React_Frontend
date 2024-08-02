import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import updateCartItem from '../Function/updateCartItem';
import DetailProduct from '../Components/productDetail';
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
      console.error('Error fetching cart data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = async (cart_id, newQuantity) => {
    if (newQuantity > 0) {
      try {
        await updateCartItem(cart_id, newQuantity, setProducts);
        fetchCartData();
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
      await axios.delete(`https://onepc.online/api/v1/cart/${cart_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(prevProducts => prevProducts.filter(product => product.cart_id !== cart_id));
      toast.success('Item removed from cart.');
    } catch (error) {
      toast.error('Error deleting cart item');
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
            {selectedProduct && <DetailProduct product={selectedProduct} />}
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

<<<<<<< Updated upstream
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
=======
const ProductContainer = styled.div`
  * {
    -webkit-tap-highlight-color: transparent;
  }
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  height: auto;
>>>>>>> Stashed changes

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CartLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  @media (max-width: 768px) {
    margin-top: 10px;
    flex-direction: column; 
  }
`
const TableContainer = styled.div`
  width: 90%;
  overflow-x: auto;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  background-color: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  td {
    height: 70px;
  }

  th {
    background-color: #f4f4f4;
  }

  @media (max-width: 768px) {

    td {
      height: auto;
    }
    th {
      display: none;
    }

    tbody tr {
      display: block;
      border-bottom: 1px solid #ddd;
    }

    tbody td {
      display: block;
      position: relative;
      box-sizing: border-box;
      border: none;
    }

    tbody td:nth-of-type(2) {
      display: inline-block;
      vertical-align: top;
    }

    tbody td:nth-of-type(3) {
      display: inline-block;
      vertical-align: top;
    }

    tbody td:nth-of-type(4) {
      display: block;
      width: 100%;
      
    }

    tbody td:nth-of-type(6) {
      display: none;
    }
  }
`;



const TotalsTable = styled.table`
  flex: 1;
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

  @media (max-width: 768px) {
    width: 100%;
    font-size: 14px;
  }
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 15px;

  @media (max-width: 768px) {
    width: 80px; 
    height: 80px;
  }
`;

const ProductName = styled.span`
  cursor: pointer;
  color: #00008B;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;

  button {
    background: #ddd;
    border: none;
    padding: 5px 10px;
    cursor: pointer;

    @media (max-width: 768px) {
      padding: 8px 12px; 
    }
  }

  span {
    margin: 0 10px;

    @media (max-width: 768px) {
      margin: 0 8px; 
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const DeleteButton = styled.button`
  font-family: 'Poppins', sans-serif;
  background-color: #d22630;
<<<<<<< Updated upstream
=======
  width: 80%;
  max-width: 300px;
  min-width: 200px;
>>>>>>> Stashed changes
  color: white;
  border: none;
  border-radius: 35px;
  height: 60px;
  padding: 10px 20px;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 50px;
    padding: 8px 16px;
  }
`;

const CheckoutButton = styled.button`
  font-family: 'Poppins', sans-serif;
<<<<<<< Updated upstream
  height: 60px;
=======
  height: 50px;
  width: 80%;
  max-width: 300px; 
  min-width: 200px;
>>>>>>> Stashed changes
  background-color: #000099;
  border-radius: 35px;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 50px;
    padding: 8px 16px;
  }
`;

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

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

const ReturnToShopButton = styled.button`
  font-family: 'Poppins', sans-serif;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;

  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;

const CheckboxContainer = styled.div`
  width: 90%;
  margin-top: 30px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Checkbox = styled.input`
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-right: 5px;
  }
`;

const CheckboxLabel = styled.label`
  font-size: 16px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
