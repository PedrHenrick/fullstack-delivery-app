import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { requestGetWithToken, requestUpdateToken } from '../../utils/requests';
import formatDate from '../../utils/serializeDate';

function HeaderTable() {
  const [productsOrder, setProductsOrder] = useState({});
  const [disablePreparing, setDisablePreparing] = useState(false);
  const [disableInTransit, setDisableInTransit] = useState(true);
  const [token, setToken] = useState('');

  const location = useLocation();
  const [idSale] = location.pathname.match(/[0-9]$/);

  useEffect(() => {
    (async () => {
      const { token: userToken } = JSON.parse(localStorage.getItem('user'));
      if (!userToken) navigate('/login');
      setToken(userToken);

      const getProducts = await requestGetWithToken(
        `/seller/orders/${idSale}`,
        userToken,
      );
      setProductsOrder(getProducts);
    })();
  }, [idSale, disablePreparing, disableInTransit]);

  const { saleDate, status } = productsOrder;

  const handleClick = async ({ target: { name } }) => {
    if (name === 'Preparando') {
      await requestUpdateToken(
        `/customer/orders/details/${idSale}`,
        { status: name },
        token,
      );
      setDisablePreparing(!disablePreparing);
      setDisableInTransit(!disableInTransit);
    } else if (name === 'Em Trânsito') {
      await requestUpdateToken(
        `/customer/orders/details/${idSale}`,
        { status: name },
        token,
      );
      setDisableInTransit(!disableInTransit);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th
              data-testid="seller_order_details__element-order-details-label-order-id"
            >
              {`Pedido: ${idSale}`}
            </th>
            <th
              data-testid="seller_order_details__element-order-details-label-order-date"
            >
              { saleDate && formatDate(saleDate) }
            </th>
            <th
              data-testid={
                'seller_order_details__element-order-details-label-delivery-status' || ''
              }
            >
              {status}
            </th>
            <button
              type="button"
              data-testid="seller_order_details__button-preparing-check"
              name="Preparando"
              disabled={ disablePreparing }
              onClick={ (e) => handleClick(e) }
            >
              Preparar pedido
            </button>
            <button
              type="button"
              data-testid="seller_order_details__button-dispatch-check"
              name="Em Trânsito"
              disabled={ disableInTransit }
              onClick={ (e) => handleClick(e) }
            >
              Saiu pra entrega
            </button>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default HeaderTable;
