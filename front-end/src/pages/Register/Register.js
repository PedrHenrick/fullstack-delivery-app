import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { requestLogin, requestRegisterAdmin } from '../../utils/requests';
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
  const isAdmin = location.pathname.match(/admin/i);

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
    if (name === 'role') {
      setRole(value);
    }
  };

  const isButtonDisabled = () => !(/\S+@\S+\.\S+/).test(email)
    || (password.length < NUMBER_SIX) || (userName.length < USERNAME_LENGTH)
    || !role;

  const handleClick = async (event) => {
    event.preventDefault();

    dispatch(changeName(userName));
    localStorage.setItem('name', userName);
    dispatch(changeEmail(email));
    localStorage.setItem('email', email);
    dispatch(changeRole(role));

    if (!isAdmin) {
      try {
        const { token, user } = await requestLogin(
          '/register',
          { email, password, name: userName },
        );
        const localObj = {
          name: user.name,
          email: user.email,
          role: user.role,
          token,
        };
        localStorage.setItem('teste', JSON.stringify(localObj));
        navigate('/customer/products');
      } catch (error) {
        setIsValid(false);
      }
    } else {
      try {
        await requestRegisterAdmin(
          '/register',
          { email, password, name: userName, role },
        );
        // navigate('/customer/products');
      } catch (error) {
        setIsValid(false);
      }
    }
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
              <option value="vendedor">Vendedor</option>
              <option value="cliente">Cliente</option>
              <option selected value="administrator">Administrator</option>
              <option value="customer">Customer</option>
            </select>
          </label>
        ) }
        <button
          data-testid={
            isAdmin ? 'admin_manage__button-register' : 'common_register__button-register'
          }
          type="button"
          disabled={ isButtonDisabled() }
          onClick={ handleClick }
        >
          Cadastrar
        </button>
        {
          !isValid
          && (
            <p
              data-testid={
                isAdmin ? 'admin_manage__element-invalid_register'
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
