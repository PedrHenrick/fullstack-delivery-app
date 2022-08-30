import React, { useState, useEffect } from 'react';

import { requestProducts } from '../../utils/requests';
// import allProducts from '../../utils/mockProducts';

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
        {products.map((product) => (
          <div key={ product.id }>
            <h3
              datatest-id={ `customer_products__element-card-title-${product.id}` }
            >
              { product.name }

            </h3>
            <img
              datatest-id={ `customer_products__img-card-bg-image-${product.id}` }
              src={ product.urlImage }
              alt={ product.name }
            />
            <p
              datatest-id={ `customer_products__element-card-price-${product.id}` }
            >
              {`R$ ${product.price}`}
            </p>
            <button
              datatest-id={ `customer_products__button-card-rm-item-${product.id}` }
              type="button"
              name="-"
              value={ product.id }
              // onClick={ handleClick }
            >
              -
            </button>
            <input
              datatest-id={ `customer_products__input-card-quantity-${product.id}` }
              type="number"
              min="0"
              placeholder="0"
              name={ product.id }
              // value={ localCart?.some((item) => +item.id === +product.id)
              //   ? localCart.find((item) => +item.id === +product.id).amount
              //   : 0 }
              // onChange={ handleChange }
            />
            <button
              datatest-id={ `customer_products__button-card-add-item-${product.id}` }
              type="button"
              name="+"
              value={ product.id }
              // onClick={ handleClick }
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
