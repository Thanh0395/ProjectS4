// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000, // Request timeout in milliseconds
});

export default instance;