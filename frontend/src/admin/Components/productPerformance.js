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
      <TablesContainer>
        <TableLow>
          <Title>Low Stock Products</Title>
          <ProductTable>
            <thead>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Product Name</TableHeader>
                <TableHeader>Quantity</TableHeader>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.length === 0 ? (
                <TableRow>
                  <TableData colSpan="3">No low stock products found.</TableData>
                </TableRow>
              ) : (
                lowStockProducts.map((product, index) => (
                  <TableRow key={`${product.id}-${index}`}>
                    <TableData>{product.id}</TableData>
                    <TableData>{product.product_name}</TableData>
                    <TableData>{product.quantity}</TableData>
                  </TableRow>
                ))
              )}
            </tbody>
          </ProductTable>
        </TableLow>

        <TableWrapper>
          <Title>Out of Stock Products</Title>
          <ProductTable>
            <thead>
              <tr>
                <TableHeader>Product ID</TableHeader>
                <TableHeader>Product Name</TableHeader>
              </tr>
            </thead>
            <tbody>
              {outOfStockProducts.length === 0 ? (
                <TableRow>
                  <TableData colSpan="2">No out of stock products found.</TableData>
                </TableRow>
              ) : (
                outOfStockProducts.map((product, index) => (
                  <TableRow key={`${product.id}-${index}`}>
                    <TableData>{product.id}</TableData>
                    <TableData>{product.product_name}</TableData>
                  </TableRow>
                ))
              )}
            </tbody>
          </ProductTable>
        </TableWrapper>
      </TablesContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 30px;
`;

const TablesContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

const TableWrapper = styled.div`
  width: 35%;
  height: auto;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
`;

const TableLow = styled.div`
  width: 65%;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h3`
  position: relative;
  padding-bottom: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: #ddd;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const ProductTable = styled.table`
  width: 100%;
  border: 1px solid #ddd;
  border-collapse: collapse;
  margin-top: 10px;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableData = styled.td`
  border-bottom: 1px solid #ddd;
  font-size: 12px;
  padding: 10px;
  text-align: left;
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
