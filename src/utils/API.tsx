import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import cookie from 'cookie';

const baseURL: string = process.env.NODE_ENV === 'production'
  ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION!
  : process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT!;

const axiosClient = axios.create({
  baseURL: baseURL,
});

axiosClient.interceptors.request.use((config) => {
  let token: string | null = '';

  if (typeof window === 'undefined') {
    // Server-side: Read from incoming request cookies
    if (config.headers && config.headers.cookie) {
      const cookies = cookie.parse(config.headers.cookie);
      token = cookies.token; // Adjust based on your cookie's token key
    }
  } else {
    // Client-side: Read from localStorage
    token = localStorage.getItem('token');
  }

  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, (error: AxiosError) => {
  return Promise.reject(error);
});

export default axiosClient;
