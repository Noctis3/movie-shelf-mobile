import axios from 'axios';

const openai = axios.create({
  baseURL: 'http://localhost:3333',
});

export default openai;
