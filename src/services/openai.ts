import axios from 'axios';

const openai = axios.create({
  baseURL: 'http://172.28.32.1:3333',
});

export default openai;
