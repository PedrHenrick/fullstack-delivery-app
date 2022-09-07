import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { requestGetWithToken } from '../../utils/requests';

function HeaderTable() {
  const [productsOrder, setProductsOrder] = useState({});
  const location = useLocation();
  const [idSale] = location.pathname.match(/[0-9]$/);
  const isSeller = (/seller/i).test(location.pathname);

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
            <th>{`Pedido: ${idSale}`}</th>
            { !isSeller && <th>Pessoa vendedora</th>}
            <th>{ formatDate(saleDate) }</th>
            <th>{status}</th>
            <th>Prepara pedido</th>
            <th>Saiu pra entrega</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default HeaderTable;
