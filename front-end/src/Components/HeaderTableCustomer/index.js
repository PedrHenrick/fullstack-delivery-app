import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { requestGetWithToken, requestUpdateToken } from '../../utils/requests';
import formatDate from '../../utils/serializeDate';

function CustomerHeaderTable() {
  const [productsOrder, setProductsOrder] = useState({});
  const [token, setToken] = useState('');
  const [atualize, setAtualize] = useState(true);

  const location = useLocation();
  const [idSale] = location.pathname.match(/[0-9]$/);

  useEffect(() => {
    (async () => {
      const { token: userToken } = JSON.parse(localStorage.getItem('user'));
      setToken(userToken);

      const getProducts = await requestGetWithToken(
        `/customer/orders/details/${idSale}`,
        userToken,
      );
      setProductsOrder(getProducts);
    })();
  }, [idSale, atualize]);

  const { saleDate, status, seller } = productsOrder;

  const handleClick = async (newStatus) => {
    await requestUpdateToken(
      `/customer/orders/details/${idSale}`,
      { status: newStatus },
      token,
    );
    setAtualize(!atualize);
  };

  return (
    <table>
      <thead>
        <tr>
          <th
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {`Pedido: ${idSale}`}

          </th>
          <th
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {`P. Vend: ${seller?.name}`}
          </th>
          <th
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            { saleDate && formatDate(saleDate) }
          </th>
          <th
            data-testid={
              'customer_order_details__element-order-details-label-delivery-status' || ''
            }
          >
            { status }
          </th>
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            disabled={ productsOrder.status !== 'Em Trânsito' }
            onClick={ () => handleClick('Entregue') }
          >
            Marcar como entregue
          </button>
        </tr>
      </thead>
    </table>
  );
}

export default CustomerHeaderTable;
