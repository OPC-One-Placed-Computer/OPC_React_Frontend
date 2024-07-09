import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../admin/AdminDashboard';
import ManageProducts from '../admin/manageProducts'; 
import styled from 'styled-components';
import Sidebar from '../admin/Components/Sidebar';
import AdminProduct from '../admin/Components/adminProduct';

const AdminLayout = () => (
  <AdminContainer>
    <Sidebar />
    <AdminContent>
      <Routes>
        <Route path="/AdminDashboard" element={<AdminDashboard />} /> 
        <Route path="/manageProducts" element={<ManageProducts />} />
        <Route path="/adminProduct" element={<AdminProduct />} />
      </Routes>
    </AdminContent>
  </AdminContainer>
);


export default AdminLayout;

const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
`

const AdminContent = styled.div`
  flex: 1;
  margin-left: 250px; /* To offset the fixed sidebar */
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 10px;
  }
`

