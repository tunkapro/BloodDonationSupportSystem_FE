
import customAxios from "../config/axios"

export const getBloodDonationSchedules = async () => await customAxios("/staff/schedules");

export const getScheduleSuggestions = async (startDate, endDate) => await customAxios("/member/schedules/suggestion", {
    params: {
        start: startDate,
        end: endDate,
    },
});

export const getStatByDay = async () => await customAxios("/staff/registration/stat-by-day");


export const createSchedule = async (data) => await customAxios.post("/staff/schedule", data);