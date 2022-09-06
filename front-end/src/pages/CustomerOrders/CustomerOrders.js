import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const productsOrders = async () => {
      const arrProducts = await axios.get('http://localhost:3001/customer/orders', {
      });
      setOrders(arrProducts.data);
    };
    productsOrders();
  }, []);

  const goToDetails = (id) => {
    const getProduct = orders.filter((element) => element.id === id);
    setOrders(getProduct);
    navigate(`/customer/orders/${getProduct[0].id}`);
  };
  return (
    <div>
      <Header />
      {
        orders.length > 0 && orders.map((product) => (
          <div
            key={ product.id }
          >
            <p
              datatestid={ `customer_orders__element-order-id-${product.id}` }
            >
              { `Pedido: ${product.deliveryNumber}` }
            </p>
            <p
              datatestid={ `customer_orders__element-delivery-status-${product.id}` }
            >
              { `Status: ${product.status}` }
            </p>
            <p
              datatestid={ `customer_orders__element-order-date-${product.id}` }
            >
              { `Data: ${product.saleDate}` }
            </p>
            <p
              datatestid={ `customer_orders__element-card-price-${product.id}` }
            >
              { `Valor: ${product.totalPrice}` }
            </p>
            <button type="button" onClick={ () => goToDetails(product.id) }>
              kalsdjald
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default CustomerOrders;
