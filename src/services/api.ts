import axios from 'axios';
import { API_BASE_URL, API_KEY } from '@env';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

export default api;
