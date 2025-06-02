import BloodDonationScheduleCreate from "./BloodDonationScheduleCreate";
import BloodDonationSchedule from "./BloodDonationSchedulePage";
import { Box } from "@mui/material";

export default function BloodDonationScheduleComponent () {
    return(
        <Box>
            <BloodDonationSchedule/>
            <BloodDonationScheduleCreate/>
        </Box>
    );
}