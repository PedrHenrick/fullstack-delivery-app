import React, { useState, useEffect } from 'react';

import { requestProducts } from '../../utils/requests';

function Card() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await requestProducts('/product');
      setProducts(await result);
    })();
  }, []);

  return (
    <>
      <div>
        {products.map(({ id, urlImage, name, price }) => (
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
              {`R$ ${price}`}
            </p>
            <button
              data-testid={ `customer_products__button-card-rm-item-${id}` }
              type="button"
              name="-"
              value={ id }

            >
              -
            </button>
            <input
              data-testid={ `customer_products__input-card-quantity-${id}` }
              type="number"
              min="0"
              placeholder="0"
              name={ id }
            />
            <button
              data-testid={ `customer_products__button-card-add-item-${id}` }
              type="button"
              name="+"
              value={ id }

            >
              +
            </button>
          </div>
        ))}
      </div>
      {/* <button
        data-testid="customer_products__button-cart"
        type="button"
        onClick={ handleSubmitCart }
      >
        { `Total R$:${}` }
      </button> */}
    </>
  );
}

export default Card;
