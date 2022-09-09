import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { DivCard, OrderCard } from '../../styled-components/SellerOrders';
import { requestGetWithToken } from '../../utils/requests';
import formatDate from '../../utils/serializeDate';

function SellerOrdersCards() {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const { role } = JSON.parse(localStorage.getItem('user'));
      if (role !== 'seller' && role !== 'administrator') navigate('/customer/products');

      const data = await requestGetWithToken('/seller/orders', token);
      setOrders(data);
    };

    getOrders();
  }, [token, navigate]);

  return (
    <div>
      { orders?.map((element) => (
        <OrderCard
          key={ element.id }
          onClick={ () => navigate(`/seller/orders/${element.id}`) }
        >
          <span data-testid={ `seller_orders__element-order-id-${element.id}` }>
            <p>{ `Pedido: ${element.id}` }</p>
          </span>

          <DivCard>
            <h3
              data-testid={
                `seller_orders__element-delivery-status-${element.id}`
              }
            >
              {element.status}
            </h3>

            <h3 data-testid={ `seller_orders__element-order-date-${element.id}` }>
              { formatDate(element.saleDate) }
            </h3>

            <h3 data-testid={ `seller_orders__element-card-price-${element.id}` }>
              { `R$: ${element.totalPrice}` }
            </h3>
          </DivCard>

          <p data-testid={ `seller_orders__element-card-address-${element.id}` }>
            { `${element.deliveryAddress}, ${element.deliverynNumber}` }
          </p>
        </OrderCard>
      ))}
    </div>
  );
}

export default SellerOrdersCards;
