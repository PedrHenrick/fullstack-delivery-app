import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { requestLogin, requestPostToken } from '../../utils/requests';
import { changeEmail, changeName, changeRole } from '../../redux/slices/client';

function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isValid, setIsValid] = useState(true);
  const NUMBER_SIX = 6;
  const USERNAME_LENGTH = 12;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = (/admin/i).test(location.pathname);

  const handleChange = ({ target: { name, value } }) => {
    setIsValid(true);
    if (name === 'userName') {
      setUserName(value);
    }
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    if (name === 'role') {
      setRole(value);
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
    dispatch(changeRole(role));

    try {
      if (!isAdmin) {
        const { token, user } = await requestLogin(
          '/register',
          { email, password, name: userName },
        );
        const localObj = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          token,
        };
        localStorage.setItem('user', JSON.stringify(localObj));
        navigate('/customer/products');
      } else {
        const { token } = JSON.parse(localStorage.getItem('user'));
        await requestPostToken(
          '/registerAdmin',
          { email, password, name: userName, role },
          token,
        );
      }
    } catch (error) {
      setIsValid(false);
    }
    setUserName('');
    setEmail('');
    setPassword('');
    setRole('');
  };

  return (
    <div>
      <form>
        <label htmlFor="userName">
          <input
            data-testid={
              isAdmin ? 'admin_manage__input-name' : 'common_register__input-name'
            }
            type="text"
            name="userName"
            placeholder="Digite seu nome"
            value={ userName }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            data-testid={
              isAdmin ? 'admin_manage__input-email' : 'common_register__input-email'
            }
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={ email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            data-testid={
              isAdmin ? 'admin_manage__input-password' : 'common_register__input-password'
            }
            type="password"
            name="password"
            placeholder="Digite sua senha"
            value={ password }
            onChange={ handleChange }
          />
        </label>
        {isAdmin
        && (
          <label htmlFor="role">
            <select
              onChange={ handleChange }
              name="role"
              data-testid="admin_manage__select-role"
            >
              <option value="seller">Vendedor</option>
              <option selected value="customer">Cliente</option>
              <option value="administrator">Administrador</option>
            </select>
          </label>
        ) }
        <button
          data-testid={
            isAdmin ? 'admin_manage__button-register' : 'common_register__button-register'
          }
          type="button"
          disabled={ !isAdmin ? isButtonDisabled() : isButtonDisabled() || !role }
          onClick={ handleClick }
        >
          Cadastrar
        </button>
        {
          !isValid
          && (
            <p
              data-testid={
                isAdmin ? 'admin_manage__element-invalid-register'
                  : 'common_register__element-invalid_register'
              }
            >
              Usuário já existe
            </p>
          )
        }
      </form>
    </div>
  );
}

export default Register;
