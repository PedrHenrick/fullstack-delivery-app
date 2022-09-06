import React, { useState, useEffect } from 'react';
import { requestUsersWithToken } from '../../utils/requests';
// import { useNavigate } from 'react-router-dom';

function CartItems() {
  const [cartItems, setCartItems] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [atualize, setAtualize] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  // const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let count = 0;
      const getCartItems = JSON.parse(localStorage.getItem('cart'));
      getCartItems.forEach((item) => { count += +item.subTotal; });
      setTotalValue(count);
      setCartItems(getCartItems);
    })();
  }, [atualize]);

  useEffect(() => {
    (async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const getSellers = await requestUsersWithToken('/sellers', token);
      setSellers(getSellers);
    })();
  }, []);

  const handleClick = ({ name }) => {
    const newCartItens = cartItems.filter((item) => item.name !== name);
    const stringifyItem = JSON.stringify(newCartItens);

    localStorage.setItem('cart', stringifyItem);
    setAtualize(!atualize);
  };

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
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0
            && cartItems.map((item, index) => (
              <tr key={ index + 1 }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-name-${index}` }
                >
                  {item.name}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  {item.quantity}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  { `R$ ${item.price.replace('.', ',')}` }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  { `R$ ${item.subTotal.replace('.', ',')}` }
                </td>
                <td>
                  <button
                    type="button"
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                    onClick={ () => handleClick(item) }
                  >
                    remover
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <p
        data-testid="customer_checkout__element-order-total-price"
      >
        { `Total Pedido: R$ ${totalValue.toFixed(2).replace('.', ',')}`}
      </p>
      <form>
        <label htmlFor="seller">
          <select
            id="seller"
            data-testid="customer_checkout__select-seller"
            required
          >
            {sellers.length
              && sellers.map((seller) => (
                <option
                  key={ seller.id }
                >
                  {seller.name}
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="endereco">
          Endereço
          <input
            name="endereco"
            data-testid="customer_checkout__input-address"
            required
          />
        </label>
        <label htmlFor="numero">
          Número
          <input
            name="numero"
            data-testid="customer_checkout__input-addressNumber"
            required
          />
        </label>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
}

export default CartItems;
