import axios from "../config/axios";


export const getEmergencyRequests = () => axios.get("/staff/get-all-emergency-request");
export const createEmergencyRequest = (data) => axios.post("/staff/create-emergency-request", data);