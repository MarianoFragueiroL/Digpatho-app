
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Cambia esto por la URL de tu API
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;
