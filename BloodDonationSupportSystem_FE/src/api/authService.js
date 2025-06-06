// services/authService.js
import axios from "../config/axios";

const API_URL = "/auth/";

export const login = async (phoneNumber, password) => {
  try {
    const res = await axios.post(API_URL + login, { phoneNumber, password });
    localStorage.setItem("token", res.data.data.token);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Login failed";
  }
};

export const register = async (
  phoneNumber,
  password,
  fullName,
  gender,
  birthday,
  address
) => {
  try {
    const res = await axios.post(API_URL + register, {
      phoneNumber,
      password,
      fullName,
      gender,
      birthday,
      address,
    });
    localStorage.setItem("token", res.data.data.token);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "register failed";
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
