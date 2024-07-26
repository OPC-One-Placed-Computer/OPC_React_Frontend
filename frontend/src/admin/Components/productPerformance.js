import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ProductPerformance = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductPerformance = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://onepc.online/api/v1/analytics/product-performance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        setLowStockProducts(response.data.data.low_stock_products);
        setOutOfStockProducts(response.data.data.out_of_stock_products);
      } catch (err) {
        setError('Error fetching product performance data.');
        console.error('There was an error fetching product performance data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductPerformance();
  }, []);

  if (loading) {
    return <Loading>Loading product performance data...</Loading>;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  return (
    <Container>
      <h2>Product Performance</h2>
      <TableContainer>
        <h3>Low Stock Products</h3>
        <ProductTable>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Stock Quantity</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.length === 0 ? (
              <tr>
                <td colSpan="3">No low stock products found.</td>
              </tr>
            ) : (
              lowStockProducts.map((product, index) => (
                <tr key={`${product.id}-${index}`}>
                  <td>{product.id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </ProductTable>
      </TableContainer>

      <TableContainer>
        <h3>Out of Stock Products</h3>
        <ProductTable>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
            </tr>
          </thead>
          <tbody>
            {outOfStockProducts.length === 0 ? (
              <tr>
                <td colSpan="2">No out of stock products found.</td>
              </tr>
            ) : (
              outOfStockProducts.map((product, index) => (
                <tr key={`${product.id}-${index}`}>
                  <td>{product.id}</td>
                  <td>{product.product_name}</td>
                </tr>
              ))
            )}
          </tbody>
        </ProductTable>
      </TableContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TableContainer = styled.div`
  margin-bottom: 30px;
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
  color: #333;
`;

const Error = styled.div`
  color: #d9534f;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`;

export default ProductPerformance;
