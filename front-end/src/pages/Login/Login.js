import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

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
    localStorage.setItem('email', email);
    localStorage.setItem('date', new Date());
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={ email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            value={ password }
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          // disabled={ isButtonDisabled() }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
