import axios from 'axios';
import environment from '../../enviroment.json'

const baseURL = environment.urls.dev;

const getToken = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
}

const api = axios.create({
  // baseURL: 'https://fakestoreapi.com',
  baseURL: baseURL,
  timeout: 10000,
});

const apiWithToken = axios.create({
  // baseURL: 'https://fakestoreapi.com',
  baseURL: baseURL,
  timeout: 10000,
  ...getToken(), // Request timeout in milliseconds
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

export {api ,apiWithToken};