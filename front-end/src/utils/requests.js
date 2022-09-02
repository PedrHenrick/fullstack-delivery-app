import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestProducts = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestUsers = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestRegisterAdmin = async (endpoint, body, token) => {
  const { data } = await api.post(endpoint, body, {
    headers: { Authorization: token },
  });
  return data;
};

export const requestUsersWithToken = async (endpoint, token) => {
  const { data } = await api.get(endpoint, {
    headers: { Authorization: token },
  });
  return data;
};

export const deleteUser = async (body, token) => {
  const { data } = await api.delete('/user', body, {
    headers: { Authorization: token },
  });
  return data;
};

export default api;
