// services/axios.js
import axios from "axios";

const axiosCustom = axios.create({
  baseURL: "http://localhost:8090", // URL backend
  headers: {
    "Content-Type": "application/json",
  },
});

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

export default axiosCustom;
