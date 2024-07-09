import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/userLayout'; 
import AdminLayout from './layouts/adminLayout'; 

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/*" element={<UserLayout />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
`;
