import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestGetWithToken, requestPostToken } from '../../utils/requests';

function CartItems() {
  const [cartItems, setCartItems] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [atualize, setAtualize] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [sellerId, setSellerId] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const NUMBER_10 = 10;
  const navigate = useNavigate();

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
      const getSellers = await requestGetWithToken('/sellers', token);
      setSellerId(getSellers[0].id);
      setSellers(getSellers);
    })();
  }, []);

  const isButtonDisabled = () => !address.length > NUMBER_10 || !number.length > 0;

  const handleClick = ({ name }) => {
    const newCartItens = cartItems.filter((item) => item.name !== name);
    const stringifyItem = JSON.stringify(newCartItens);

    localStorage.setItem('cart', stringifyItem);
    setAtualize(!atualize);
  };

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'seller') {
      setSellerId(value);
    }
    if (name === 'endereco') {
      setAddress(value);
    }
    if (name === 'numero') {
      setNumber(value);
    }
  };

  const createOrder = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const objectOrder = {
      userId: user.id,
      sellerId,
      productsIds: cartItems.map(({ id, quantity }) => ({ id, quantity })),
      totalPrice: totalValue,
      deliveryAddress: address,
      deliveryNumber: number,
    };

    const orderCreated = await requestPostToken(
      '/customer/orders',
      objectOrder,
      user.token,
    );
    navigate(`/customer/orders/${orderCreated.id}`);
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
            name="seller"
            data-testid="customer_checkout__select-seller"
            required
            onChange={ handleChange }
          >
            {sellers.length
              && sellers.map((seller) => (
                <option
                  key={ seller.id }
                  value={ seller.id }
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
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="numero">
          Número
          <input
            name="numero"
            data-testid="customer_checkout__input-addressNumber"
            required
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          disabled={ isButtonDisabled() }
          onClick={ createOrder }
        >
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
}

export default CartItems;
