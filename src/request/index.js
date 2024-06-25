import axios from "axios";
import { message } from "antd";

// 创建axios实例
const service = axios.create({
  baseURL: "http://110.41.83.180/api",
  timeout: 5000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求发送携带token
    // const token = window.sessionStorage.getItem('token')
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
  },
  (error) => {
    // 处理请求错误
    Promise.reject(error);
  }
);

// response拦截器
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error);
  }
);

export default service;
