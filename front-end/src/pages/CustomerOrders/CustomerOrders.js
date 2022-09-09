import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { requestGetWithToken } from '../../utils/requests';
import formatDate from '../../utils/serializeDate';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const productsOrders = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      if (!token) navigate('/login');
      const arrProducts = await requestGetWithToken('/customer/orders', token);
      setOrders(arrProducts);
    };
    productsOrders();
  }, [navigate]);

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
          <button
            type="button"
            key={ product.id }
            onClick={ () => goToDetails(product.id) }
          >
            <p
              data-testid={ `customer_orders__element-order-id-${product.id}` }
            >
              { product.id }
            </p>
            <p
              data-testid={ `customer_orders__element-delivery-status-${product.id}` }
            >
              { product.status }
            </p>
            <p
              data-testid={ `customer_orders__element-order-date-${product.id}` }
            >
              { formatDate(product.saleDate) }
            </p>
            <p
              data-testid={ `customer_orders__element-card-price-${product.id}` }
            >
              { product.totalPrice.replace('.', ',') }
            </p>
          </button>
        ))
      }
    </div>
  );
}

export default CustomerOrders;
