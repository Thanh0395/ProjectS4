import axios from 'axios';

const getToken = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
}

const instance = axios.create({
  // baseURL: 'https://fakestoreapi.com',
  baseURL: 'http://localhost:8080/api/project4',
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

export default instance;