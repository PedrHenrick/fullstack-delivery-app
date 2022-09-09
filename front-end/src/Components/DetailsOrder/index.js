import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { requestGetWithToken } from '../../utils/requests';

function DetailsOrder() {
  const [productsOrder, setProductsOrder] = useState({});
  const location = useLocation();
  const [idSale] = location.pathname.match(/[0-9]$/);
  const isRouteSeller = (/seller/i).test(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    const { token, role } = JSON.parse(localStorage.getItem('user'));
    (async () => {
      if (isRouteSeller && (role !== 'seller' && role !== 'administrator')) {
        navigate('/customer/orders');
      } else if (!isRouteSeller && role === 'seller') {
        navigate('/seller/orders');
      }

      const getProducts = await requestGetWithToken(
        `/customer/orders/details/${idSale}`,
        token,
      );
      setProductsOrder(getProducts);
    })();
  }, [idSale, isRouteSeller, navigate]);

  const { totalPrice, products } = productsOrder;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade (R$)</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {products?.map(({ name, quantity, price, id }, index) => (
            <tr key={ index + 1 }>
              <td
                data-testid={
                  isRouteSeller ? `
                    seller_order_details__element-order-table-item-number-${id}`
                    : `customer_order_details__element-order-table-number-${id}`
                }
              >
                { index + 1 }
              </td>
              <td
                data-testid={
                  isRouteSeller
                    ? `seller_order_details__element-order-table-name-<${id}`
                    : `customer_order_details__element-order-table-name-<${id}`
                }
              >
                { name }
              </td>
              <td
                data-testid={
                  isRouteSeller
                    ? `seller_order_details__element-order-table-quantity-${id}`
                    : `customer_order_details__element-order-table-quantity-${id}`
                }
              >
                { quantity }
              </td>
              <td
                data-testid={
                  isRouteSeller
                    ? `seller_order_details__element-order-table-unit-price-${id}`
                    : `customer_order_details__element-order-table-unit-price-${id}`
                }
              >
                { `R$ ${price.replace('.', ',')}` }
              </td>
              <td
                data-testid={
                  isRouteSeller
                    ? `seller_order_details__element-order-table-sub-total-${id}`
                    : `customer_order_details__element-order-table-sub-total-${id}`
                }
              >
                { `R$ ${(String(quantity * price)).replace('.', ',')}` }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        data-testid={ isRouteSeller ? 'seller_order_details__element-order-total-price'
          : 'customer_order_details__element-order-total-price' }
      >
        { `Total Pedido: R$ ${String(totalPrice).replace('.', ',')}`}
      </p>
    </div>
  );
}
export default DetailsOrder;
