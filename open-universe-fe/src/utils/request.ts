import { refreshToken } from '@/api/auth.api';
import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const AXIOS = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL,
  withCredentials: true,
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json;charset=utf-8',
  },
});

AXIOS.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log("interceptors.request", config);
    // config.headers.Authorization = `Bearer ${localStorage.getItem("TOKEN")}`;
    return config;
  },
  function (error) {
    // Do something with request error
    // console.log("interceptors.request.error", error);
    return Promise.reject(error);
  },
);

// Add a response interceptor
AXIOS.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log("interceptors.response", response);
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log("interceptors.response.error", error);
    if (error.response.status === 401)
      window.location.href = import.meta.env.VITE_BASE_URL + '/signin';
    const originalConfig = error.config;
    if (error.response && error.response.status === 419) {
      try {
        await refreshToken();
        originalConfig.headers['Authorization'] = `Bearer ${Cookies.get('access_token')}`;
        return AXIOS(originalConfig);
      } catch (err: any) {
        if (err.response && err.response.status === 400) {
          console.log(error);
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

interface RequestOptions {
  method: AxiosRequestConfig['method'];
  url: string;
  data?: any;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

const request = async ({
  method,
  url,
  data,
  onSuccess = () => {},
  onError = () => {},
}: RequestOptions) => {
  try {
    const response = await AXIOS({
      method,
      url,
      data,
    });
    // Xử lý hiển thị popup thành công
    // Code here
    onSuccess(response.data);
    return response;
  } catch (error) {
    // Xử lý hiển thị popup lỗi
    // Code here
    if (axios.isAxiosError(error)) {
      // Nếu là lỗi từ Axios, sử dụng error.response.data
      onError(error.response?.data);
    } else {
      // Nếu không phải lỗi từ Axios, xử lý một cách phù hợp
      onError(error);
    }
  }
};

export default request;
