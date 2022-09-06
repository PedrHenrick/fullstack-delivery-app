import React, { useState, useEffect } from 'react';
import { requestGetWithToken } from '../../utils/requests';
// import { useNavigate } from 'react-router-dom';

function CartItems() {
  const [cartItems, setCartItems] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [atualize, setAtualize] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const getCartItems = JSON.parse(localStorage.getItem('cart'));
      setCartItems(getCartItems);
    })();
  }, [atualize]);

  useEffect(() => {
    (async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const getSellers = await requestGetWithToken('/sellers', token);
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
      { cartItems.length
      && cartItems.map((item, index) => (
        <div key={ index + 1 }>
          <h2>{ index + 1 }</h2>
          <h2>{ item.name }</h2>
          <h2>{ item.quantity }</h2>
          <h2>{ item.valueUnit }</h2>
          <h2>{ item.subTotal }</h2>
          <button
            type="button"
            onClick={ () => handleClick(item) }
          >
            remover
          </button>
        </div>
      ))}
      <form>
        <label htmlFor="seller">
          <select id="seller" required>
            { sellers.length
            && sellers.map((seller) => (
              <option key={ seller.id }>{ seller.name }</option>
            ))}
          </select>
        </label>
        <label htmlFor="endereco">
          Endereço
          <input
            name="endereco"
            required
          />
        </label>
        <label htmlFor="numero">
          Número
          <input
            name="numero"
            required
          />
        </label>
      </form>
    </div>
  );
}

export default CartItems;
