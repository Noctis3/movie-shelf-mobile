import axios from 'axios';
import { API_BASE_URL, API_KEY } from '@env';

console.log(API_BASE_URL, API_KEY);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

export default api;
