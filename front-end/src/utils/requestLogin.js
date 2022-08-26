import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const requestLogin = async (endpoint, body) => {
  console.log('entrei no requestLogin');
  const { data } = await api.post(endpoint, body);
  return data;
};

export default api;
