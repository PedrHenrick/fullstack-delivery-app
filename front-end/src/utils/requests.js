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

export const requestPostToken = async (endpoint, body, token) => {
  const { data } = await api.post(endpoint, body, {
    headers: { Authorization: token },
  });
  return data;
};

export const requestUpdateToken = async (endpoint, body, token) => {
  const { data } = await api.put(endpoint, body, {
    headers: { Authorization: token },
  });
  return data;
};

export const requestGetWithToken = async (endpoint, token) => {
  const { data } = await api.get(endpoint, {
    headers: { Authorization: token },
  });
  return data;
};

export const deleteUser = async (endpoint, token) => {
  const { data } = await api.delete(endpoint, {
    headers: { Authorization: token },
  });
  return data;
};

export default api;
