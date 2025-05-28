// services/authService.js
import axios from '../config/axios';

export const login = async (username, password) => {
  try {
    const res = await axios.post("/auth/login", { username, password });
    localStorage.setItem("token", res.data.jwt);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Login failed";
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

