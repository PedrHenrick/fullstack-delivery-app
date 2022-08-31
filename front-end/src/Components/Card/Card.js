import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { requestProducts } from '../../utils/requests';
import { increment, decrement } from '../../redux/slices/cart';

function Card() {
  const [products, setProducts] = useState([]);
  const [incrementAmount, setIncrementAmount] = useState('0');
  console.log(incrementAmount);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const result = await requestProducts('/product');
      setProducts(await result);
    })();
  }, []);

  return (
    <div>
      { products.length
        && products.map(({ id, urlImage, name, price }) => (
          <div key={ id }>
            <h3
              data-testid={ `customer_products__element-card-title-${id}` }
            >
              { name }

            </h3>
            <img
              data-testid={ `customer_products__img-card-bg-image-${id}` }
              src={ urlImage }
              alt={ name }
            />
            <p
              data-testid={ `customer_products__element-card-price-${id}` }
            >
              {`R$ ${price.replace('.', ',')}`}
            </p>
            <button
              data-testid={ `customer_products__button-card-rm-item-${id}` }
              type="button"
              onClick={ dispatch(decrement()) }

            >
              -
            </button>
            <input
              data-testid={ `customer_products__input-card-quantity-${id}` }
              type="number"
              // placeholder="0"
              value={ incrementAmount }
              onChange={ ({ target }) => setIncrementAmount(target.value) }
            />
            <button
              data-testid={ `customer_products__button-card-add-item-${id}` }
              type="button"
              onClick={ () => dispatch(increment()) }

            >
              +
            </button>
          </div>
        ))}
    </div>
  );
}

export default Card;
