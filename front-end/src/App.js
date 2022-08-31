import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SellerOrders from './pages/SellerOrders';
import ProductsDetails from './pages/ProductsDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/seller-orders" element={ <SellerOrders /> } />
      <Route path="/products-details" element={ <ProductsDetails /> } />
    </Routes>
  );
}

export default App;
