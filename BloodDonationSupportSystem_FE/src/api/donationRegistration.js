import axios from "../config/axios";
import { apiResponse } from "../utils/apiHelper";

const API_URL = "/member";

export const registerDonation = async (data) => {
  console.log(data);
  
  return await apiResponse(() => axios.post(`${API_URL}/registration`, data));
};

export const cancelDonationRegistration = (donationRegistrationId) =>
  axios.put(`/staff/cancel-registration/${donationRegistrationId}`, {
    status: 'HỦY',
  });