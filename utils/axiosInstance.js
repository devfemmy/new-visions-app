import AsyncStorage from '@react-native-async-storage/async-storage';
import {axios} from 'axios';
import Global from '../../Global';

export const axiosInstance = axios.create({
  baseURL: 'https://mo.visionsplus.net/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  async error => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
