import axiosCustom from "../config/axios";

const login = async ({account, password}) => {
  try {
    const res = await axiosCustom.post("api/auth/login", {phoneNumber : account, password : password});
    setTimeout(() => console.log(res.data), 2000);
    localStorage.setItem("token", JSON.stringify(res.data.data.token));
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Login failed";
  }
};

export default login;