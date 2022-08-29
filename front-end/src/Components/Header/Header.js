import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
      <nav>
        <Link to="/customer/products">Produtos</Link>
        <Link to="/customer/orders">Meus Pedidos</Link>
        <Link to="/login">Sair</Link>
      </nav>
    </div>
  );
}

export default Header;
