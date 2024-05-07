
import axios from 'axios';
import cookie from 'cookie';


const baseURL = process.env.NODE_ENV === 'production'
  ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION
  : process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT;

const axiosClient = axios.create({
    baseURL: baseURL 
  });

  axiosClient.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
      // Try to read the token from the cookies included in the headers of the incoming request
      const cookies = cookie.parse(process.browser ? document.cookie : config.headers.cookie);
      const token = cookies.token;
      config.headers.Cookie = config.headers.cookie;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      // Client-side: safely use localStorage
        const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
});

export default axiosClient;
