import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { requestLogin } from '../../utils/requests';
import { changeEmail, changeName } from '../../redux/slices/client';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  const NUMBER_SIX = 6;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const isButtonDisabled = () => !(/\S+@\S+\.\S+/).test(email)
    || (password.length < NUMBER_SIX);

  const handleClick = async (event) => {
    event.preventDefault();

    dispatch(changeEmail(email));

    try {
      const { token, user } = await requestLogin('/login', { email, password });
      const localObj = {
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      };

      dispatch(changeName(user.name));
      localStorage.setItem('user', JSON.stringify(localObj));

      if (user.role === 'administrator') navigate('/admin/manage');
      else if (user.role === 'seller') navigate('/seller/orders');
      else navigate('/customer/products');
    } catch (error) {
      setIsValid(false);
    }
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
          disabled={ isButtonDisabled() }
          onClick={ handleClick }
        >
          Login
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
          onClick={ () => navigate('/register') }
        >
          Ainda não abri conta
        </button>
        {
          !isValid
          && <p data-testid="common_login__element-invalid-email">Dados inválidos</p>
        }
      </form>
    </div>
  );
}

export default Login;
