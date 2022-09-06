import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../Card/Card';
import { requestProducts } from '../../utils/requests';
// import { saveInfo } from '../../utils/localStorage';

function AllCards() {
  const [products, setProducts] = useState([]);
  const [valueCart, setValueCart] = useState(0);
  const [addOrRemoveCart, setaddOrRemoveCart] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await requestProducts('/product');
      const result = data.map((product) => ({ ...product }));
      const cart = JSON.parse(localStorage.getItem('cart'));
      if (cart) {
        let count = 0;
        cart.map((item) => {
          count += parseFloat(item.subTotal);
          return count;
        });
        setValueCart(count);
      }

      setProducts(await result);
    })();
  }, [addOrRemoveCart]);

  const handleClick = (prodId, prodQnt) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const item = products.find((product) => +product.id === +prodId);

    if (!cart) {
      localStorage.setItem('cart', JSON.stringify(
        [{ ...item,
          quantity: prodQnt,
          subTotal: (prodQnt * +item.price).toFixed(2) }],
      ));
      setaddOrRemoveCart(!addOrRemoveCart);
      return '';
    }
    if (!item) {
      localStorage.setItem('cart', JSON.stringify(
        [{ ...cart,
          ...item,
          quantity: prodQnt,
          subTotal: (prodQnt * +item.price).toFixed(2) }],
      ));
      setaddOrRemoveCart(!addOrRemoveCart);
      return '';
    }
    const filter = cart.filter((product) => product.id !== +prodId);
    if (prodQnt <= 0) {
      localStorage.setItem('cart', JSON.stringify(filter));
      setaddOrRemoveCart(!addOrRemoveCart);
      return '';
    }
    localStorage.setItem('cart', JSON.stringify([
      ...filter,
      { ...item,
        quantity: prodQnt,
        subTotal: (prodQnt * +item.price).toFixed(2) },
    ]));
    setaddOrRemoveCart(!addOrRemoveCart);
    return '';
  };

  return (
    <div>
      <button
        data-testid="customer_products__button-cart"
        type="button"
        disabled={ valueCart === 0 }
        onClick={ () => navigate('/customer/checkout') }
      >
        Ver Carrinho:
        <span data-testid="customer_products__checkout-bottom-value">
          {` R$: ${valueCart.toFixed(2).replace('.', ',')}`}
        </span>
      </button>
      <div>
        { products.length
        && products.map((product) => (
          <Card
            key={ product.id }
            id={ product.id }
            name={ product.name }
            price={ product.price }
            image={ product.urlImage }
            handleClick={ handleClick }
          />
        ))}
      </div>
    </div>
  );
}

export default AllCards;
