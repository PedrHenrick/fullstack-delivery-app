import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isSeller = (/seller/i).test(location.pathname);
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header>
      <nav>
        {!isSeller && (
          <Link
            data-testid="customer_products__element-navbar-link-products"
            to="/customer/products"
          >
            Produtos
          </Link>)}
        <Link
          data-testid="customer_products__element-navbar-link-orders"
          to={ isSeller ? '/seller/orders' : '/customer/orders' }
        >
          { isSeller ? 'Pedidos' : 'Meus Pedidos' }
        </Link>
        <div
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { user.name }
        </div>
        <Link
          data-testid="customer_products__element-navbar-link-logout"
          to="/login"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </Link>
      </nav>
    </header>
  );
}

export default Header;
