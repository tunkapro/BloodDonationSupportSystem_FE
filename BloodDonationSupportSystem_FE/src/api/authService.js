// services/authService.js
import axios from "../config/axios"

const API_URL = "api/auth/";

export const login = async (phoneNumber, password) => {
  try {
    const res = await axios.post(API_URL + "login", { phoneNumber, password });
    localStorage.setItem("token", res.data.data.token);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Login failed";
  }
};

export const registerAccount = async (infor) => {
  try {
    const res = await axios.post("http://localhost:8090/api/auth/register", infor);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "register failed";
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
