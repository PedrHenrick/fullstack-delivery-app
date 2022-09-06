import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { requestGetWithToken } from '../../utils/requests';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const NUMBER_8 = 8;
  const NUMBER_4 = 4;
  const NUMBER_2 = 2;
  const NUMBER_0 = 0;
  const NUMBER_5 = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const productsOrders = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const arrProducts = await requestGetWithToken('/customer/orders', token);
      setOrders(arrProducts);
    };
    productsOrders();
  }, []);

  function formatDate(date) {
    const strData = `${date.substr(NUMBER_8, NUMBER_2)}`
      + `/${date.substr(NUMBER_5, NUMBER_2)}`
      + `/${date.substr(NUMBER_0, NUMBER_4)}`;
    return strData;
  }

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
