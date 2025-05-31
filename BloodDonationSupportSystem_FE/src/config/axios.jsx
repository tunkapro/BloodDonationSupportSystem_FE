// services/axios.js
import axios from "axios";

const baseUrl = "http://localhost:8090"

const config = {
  baseURL: baseUrl
}

const api = axios.create(config)

api.defaults.baseURL = baseUrl;

const handleBefore = (config) => {
  const token = localStorage.getItem('token')?.replace('"', '');
  config.headers['Authorization'] = `Bearer ${token}`
  return config;
}

api.interceptors.request.use(handleBefore, null);

export default api;


// // Thêm interceptor để gắn token
// axiosCustom.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // hoặc sessionStorage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


