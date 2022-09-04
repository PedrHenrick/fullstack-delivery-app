import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { requestLogin } from '../../utils/requests';
import { changeEmail, changeName } from '../../redux/slices/client';

function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const NUMBER_SIX = 6;
  const USERNAME_LENGTH = 12;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'userName') {
      setUserName(value);
    }
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const isButtonDisabled = () => !(/\S+@\S+\.\S+/).test(email)
    || (password.length < NUMBER_SIX) || (userName.length < USERNAME_LENGTH);

  const handleClick = async (event) => {
    event.preventDefault();

    dispatch(changeName(userName));
    localStorage.setItem('name', userName);
    dispatch(changeEmail(email));
    localStorage.setItem('email', email);

    try {
      const { token } = await requestLogin(
        '/register',
        { email, password, name: userName },
      );
      console.log(token);
      navigate('/customer/products');
    } catch (error) {
      setIsValid(false);
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="userName">
          <input
            data-testid="common_register__input-name"
            type="text"
            name="userName"
            placeholder="Digite seu nome"
            value={ userName }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            data-testid="common_register__input-email"
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={ email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            data-testid="common_register__input-password"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            value={ password }
            onChange={ handleChange }
          />
        </label>
        <button
          data-testid="common_register__button-register"
          type="button"
          disabled={ isButtonDisabled() }
          onClick={ handleClick }
        >
          Cadastrar
        </button>
        {
          !isValid
          && (
            <p data-testid="common_register__element-invalid_register">
              Usuário já existe
            </p>
          )
        }
      </form>
    </div>
  );
}

export default Register;
