import React, { useState, useEffect } from 'react';

import Card from '../Card/Card';
import { requestProducts } from '../../utils/requests';
// import { saveInfo } from '../../utils/localStorage';

function AllCards() {
  const [products, setProducts] = useState([]);
  const [valueCart, setValueCart] = useState(0);
  const [addOrRemoveCart, setaddOrRemoveCart] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await requestProducts('/product');
      const result = data.map((product) => ({ ...product }));
      const cart = JSON.parse(localStorage.getItem('cart'));
      if (cart) {
        let count = 0;
        cart.forEach((item) => {
          count += parseFloat(item.subTotal);
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
          subTotal: (prodQnt * +item.price).toFixed(2).replace('.', ',') }],
      ));
      setaddOrRemoveCart(!addOrRemoveCart);
      return 'oi';
    }
    if (!item) {
      localStorage.setItem('cart', JSON.stringify(
        [{ ...cart,
          ...item,
          quantity: prodQnt,
          subTotal: (prodQnt * item.price).toFixed(2).replace('.', ',') }],
      ));
      setaddOrRemoveCart(!addOrRemoveCart);
      return 'oie';
    }
    const filter = cart.filter((product) => product.id !== +prodId);
    if (prodQnt <= 0) {
      localStorage.setItem('cart', JSON.stringify(filter));
      setaddOrRemoveCart(!addOrRemoveCart);
      return 'oiee';
    }
    localStorage.setItem('cart', JSON.stringify([
      ...filter,
      { ...item,
        quantity: prodQnt,
        subTotal: (prodQnt * +item.price).toFixed(2).replace('.', ',') },
    ]));
    setaddOrRemoveCart(!addOrRemoveCart);
    return 'ola';
  };

  return (
    <div>
      <button
        data-testid="customer_products__button-cart"
        type="button"
        // onClick={ }
      >
        {`Total R$: ${valueCart}`}
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
