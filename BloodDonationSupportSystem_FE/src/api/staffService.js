import axios from "../config/axios";


export const searchDonorsApi = (data) => axios.post("/staff/donors-search", data);