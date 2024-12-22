import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/proxy', // Proxy to your backend
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
