import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { requestGetWithToken, requestUpdateToken } from '../../utils/requests';
import formatDate from '../../utils/serializeDate';

function CustomerHeaderTable() {
  const [productsOrder, setProductsOrder] = useState({});
  const [disableDelivered, setDisableDelivered] = useState(false);
  const [saller, setSeller] = useState('');
  const [token, setToken] = useState('');
  const [atualize, setAtualize] = useState(true);

  const location = useLocation();
  const [idSale] = location.pathname.match(/[0-9]$/);

  useEffect(() => {
    (async () => {
      const { token: userToken } = JSON.parse(localStorage.getItem('user'));
      if (!userToken) navigate('/login');
      setToken(userToken);

      const getProducts = await requestGetWithToken(
        `/customer/orders/details/${idSale}`,
        userToken,
      );
      const sellers = await requestGetWithToken('/sellers', userToken);
      const getSeller = sellers.find((seller) => seller.id === getProducts.sellerId);

      if (getProducts.status === 'Pendente' || getProducts.status === 'Em Trânsito') {
        setDisableDelivered(true);
      }

      setSeller(getSeller);
      setProductsOrder(getProducts);
    })();
  }, [idSale, disableDelivered, atualize]);

  const { saleDate, status } = productsOrder;

  const handleClick = async ({ target: { name } }) => {
    await requestUpdateToken(
      `/customer/orders/details/${idSale}`,
      { status: name },
      token,
    );
    setDisableDelivered(true);
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
            {`P. Vend: ${saller.name}`}
          </th>
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
          <th
            data-testid="customer_order_details__button-delivery-check"
          >
            <button
              type="button"
              name="Entregue"
              disabled={ disableDelivered }
              onClick={ (e) => handleClick(e) }
            >
              Marcar como entregue
            </button>
          </th>
        </tr>
      </thead>
    </table>
  );
}

export default CustomerHeaderTable;
