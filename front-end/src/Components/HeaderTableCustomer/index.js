import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { requestGetWithToken } from '../../utils/requests';

function CustomerHeaderTable() {
  const [productsOrder, setProductsOrder] = useState({});
  const location = useLocation();
  const [idSale] = location.pathname.match(/[0-9]$/);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    (async () => {
      const getProducts = await requestGetWithToken(`/seller/orders/${idSale}`, token);
      setProductsOrder(getProducts);
    })();
  }, [idSale]);

  const { saleDate, status } = productsOrder;
  const NUMBER_8 = 8;
  const NUMBER_4 = 4;
  const NUMBER_2 = 2;
  const NUMBER_0 = 0;
  const NUMBER_5 = 5;

  function formatDate(date) {
    const strData = `
    ${date.substr(NUMBER_8, NUMBER_2)}/${
  date.substr(NUMBER_5, NUMBER_2)}/${
  date.substr(NUMBER_0, NUMBER_4)}`;
    return strData;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              {`Pedido: ${idSale}`}

            </th>
            <th>Pessoa vendedora</th>
            <th
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              { saleDate && formatDate(saleDate) }

            </th>
            <th
              data-testid={ `customer_order_details__
              element-order-details-label-delivery-status` }
            >
              {status}
            </th>
            <th>Marcar como entregue</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default CustomerHeaderTable;
