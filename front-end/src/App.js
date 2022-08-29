import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CustomerProducts from './pages/CustomerProducts/CustomerProducts';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <CustomerProducts /> } />
    </Routes>
  );
}

export default App;
