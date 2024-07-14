import axios from 'axios';
import { getToken } from '../auth';

export const BASE_URL = 'http://localhost:9090';

export const myAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
  async (config) => {
    const token = getToken();
    console.log('Token:', token); // Debug: Log the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(config)
    }
    return config;
  },
  (error) => Promise.reject(error)
);
