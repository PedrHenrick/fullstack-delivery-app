import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

function Card({ id, image, name, price, handleClick }) {
  const [quant, setQuant] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const findProduct = cart.find((product) => product.id === id);
    if (findProduct) {
      return setQuant(+findProduct.quantity);
    }
  }, [id]);

  const decreaseQnt = ({ target }) => setQuant((prevState) => {
    const value = prevState - 1;

    if (value <= 0) {
      handleClick(target.id, value);
      return 0;
    }
    handleClick(target.id, value);
    return value;
  });

  const increaseQnt = ({ target }) => setQuant((prevState) => {
    const value = prevState + 1;

    handleClick(target.id, value);
    return value;
  });

  const handleChange = ({ target }) => {
    if (+target.value <= 0) {
      setQuant(0);
      return handleClick(target.id, 0);
    }
    setQuant(+target.value);
    return handleClick(target.id, +target.value);
  };

  return (
    <div>
      <div>
        <h3
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          { name }

        </h3>
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ image }
          alt={ name }
          width="100px"
        />
        <p
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          {`R$ ${price.replace('.', ',')}`}
        </p>
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          id={ id }
          onClick={ decreaseQnt }

        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          type="number"
          id={ id }
          value={ quant }
          onChange={ handleChange }
        />
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          id={ id }
          onClick={ increaseQnt }

        >
          +
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Card;
