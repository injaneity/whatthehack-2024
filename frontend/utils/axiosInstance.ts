import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://54.151.179.131/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
