// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000, // Request timeout in milliseconds
});

// // Set up the request interceptor to include the token in the headers
// instance.interceptors.request.use((config) => {
//   // Retrieve token and user information from local storage
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default instance;