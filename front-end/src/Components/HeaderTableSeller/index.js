import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { requestGetWithToken, requestUpdateToken } from '../../utils/requests';
import formatDate from '../../utils/serializeDate';

function HeaderTable() {
  const [productsOrder, setProductsOrder] = useState({});
  const [atualize, setAtualize] = useState(false);
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
      setProductsOrder(getProducts.dataValues);
    })();
  }, [idSale, atualize]);

  const { saleDate, status } = productsOrder;

  const handleClick = async (newStatus) => {
    await requestUpdateToken(
      `/customer/orders/details/${idSale}`,
      { status: newStatus },
      token,
    );
    setAtualize(!atualize);
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
              { status }
            </th>
            <button
              type="button"
              data-testid="seller_order_details__button-preparing-check"
              disabled={ productsOrder.status !== 'Pendente' }
              onClick={ () => handleClick('Preparando') }
            >
              Preparar pedido
            </button>
            <button
              type="button"
              data-testid="seller_order_details__button-dispatch-check"
              disabled={ productsOrder.status !== 'Preparando' }
              onClick={ () => handleClick('Em Trânsito') }
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
