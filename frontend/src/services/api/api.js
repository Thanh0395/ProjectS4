import axios from 'axios';
import environment from '../../environment.json';

const baseURL = environment.urls.dev;

const getToken = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return token;
}

const createAxiosInstance = (tokenConfig = {}) => {
  return axios.create({
    baseURL: baseURL,
    timeout: 10000,
    ...tokenConfig,
  });
};

const api = createAxiosInstance();

const apiWithToken = createAxiosInstance({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
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

export { api, apiWithToken, getToken, baseURL };