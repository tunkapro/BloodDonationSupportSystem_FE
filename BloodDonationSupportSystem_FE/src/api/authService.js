// services/authService.js
import axios from "../config/axios";

export const login = async (data) => {
  console.log(data);
    const res = await axios.post("/auth/login", data);
    localStorage.setItem("token", res.data.data.token);
    return res.data;
};

export const registerAccount = async (infor) => {
  try {
    const res = await axios.post("/auth/register", infor);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "register failed";
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
