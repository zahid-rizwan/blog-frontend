import axios from 'axios';
import { getToken } from '../auth';

export const BASE_URL = 'http://ec2-13-49-100-200.eu-north-1.compute.amazonaws.com:9090';

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
