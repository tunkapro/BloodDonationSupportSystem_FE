import axios from "../config/axios";


export const searchDonorsApi = (data) => axios.post("/staff/donors-search", data);

//   await axios.put(`/staff/update-process-is-passed/${id}`, data);
export const updateProcess = (data) => axios.put("/staff/update-process-is-passed/${id}", data);