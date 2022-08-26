import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { changeName, changePassword } from '../../redux/slices/client';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  // const isButtonDisabled = () => !validate(email) || (password.length < 6);

  const handleClick = (event) => {
    event.preventDefault();

    dispatch(changeName(email));
    dispatch(changePassword(password));
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          <input
            data-testid="common_login__input-email"
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={ email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            data-testid="common_login__input-password"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            value={ password }
            onChange={ handleChange }
          />
        </label>
        <button
          data-testid="common_login__button-login"
          type="button"
          // disabled={ isButtonDisabled() }
          onClick={ handleClick }
        >
          Login
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
        >
          Ainda não abri conta
        </button>
        <p data-testid="common_login__element-invalid-email" />
      </form>
    </div>
  );
}

export default Login;
