import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.b7web.com.br/devbarber/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
