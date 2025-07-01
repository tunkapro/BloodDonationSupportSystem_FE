import axios from "../config/axios";

export const getHealthChecksApi = () => axios.get("/staff/health-checks");
