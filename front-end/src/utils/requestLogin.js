import axios from 'axios';

const api = axios.create({
  URL: 'http://localhost:3001',
});

export const requestLogin = async (endpoint, body) => {
  console.log('entrei no requestLogin');
  const { data } = await api.post(endpoint, body);
  console.log('fiz o post');
  return data;
};

export default api;
