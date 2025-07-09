
import customAxios from "../config/axios"

export const getBloodDonationSchedules = () => customAxios("/staff/schedules");

export const getScheduleSuggestions = (startDate, endDate) => customAxios("/member/schedules/suggestion", {
    params: {
        start: startDate,
        end: endDate,
    },
});