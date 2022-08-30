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

  console.log(products);

  return (
    <>
      <div>
        {products.map(({ id, urlImage, name, price }) => (
          <div key={ id }>
            { console.log(urlImage, id, price, name)}
            <h3
              datatest-id={ `customer_products__element-card-title-${id}` }
            >
              { name }

            </h3>
            <img
              datatest-id={ `customer_products__img-card-bg-image-${id}` }
              src={ urlImage }
              alt={ name }
            />
            <p
              datatest-id={ `customer_products__element-card-price-${id}` }
            >
              {`R$ ${price}`}
            </p>
            <button
              datatest-id={ `customer_products__button-card-rm-item-${id}` }
              type="button"
              name="-"
              value={ id }

            >
              -
            </button>
            <input
              datatest-id={ `customer_products__input-card-quantity-${id}` }
              type="number"
              min="0"
              placeholder="0"
              name={ id }
            />
            <button
              datatest-id={ `customer_products__button-card-add-item-${id}` }
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
        datatest-id="customer_products__button-cart"
        type="button"
        onClick={ handleSubmitCart }
      >
        { `Total R$:${}` }
      </button> */}
    </>
  );
}

export default Card;
