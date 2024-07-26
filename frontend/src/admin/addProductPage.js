import React from 'react';
import AddProductForm from '../admin/Components/addProductForm';
import styled from 'styled-components';

const AddProductPage = () => {
  return (
    <PageContainer>
      <Content>
        <AddProductForm />
      </Content>
    </PageContainer>
  );
};

export default AddProductPage;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;
