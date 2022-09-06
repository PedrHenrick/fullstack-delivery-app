import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import CustomerOrders from './pages/CustomerOrders/CustomerOrders';
import CustomerCheckout from './pages/CustomerCheckout/CustomerCheckout';
import CustomerProducts from './pages/CustomerProducts/CustomerProducts';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SellerOrders from './pages/SellerOrders';
import ProductsDetails from './pages/ProductsDetails';
import AdminRegister from './pages/Admin/AdminRegister';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/seller-orders" element={ <SellerOrders /> } />
      <Route path="/products-details" element={ <ProductsDetails /> } />
      <Route path="/customer/products" element={ <CustomerProducts /> } />
      <Route path="/customer/orders" element={ <CustomerOrders /> } />
      <Route path="/customer/checkout" element={ <CustomerCheckout /> } />
      <Route path="/admin/manage" element={ <AdminRegister /> } />
    </Routes>
  );
}

export default App;
