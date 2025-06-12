import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Box, Grid, Stack } from "@mui/material";
import useLocalStorage from "../../../hook/useLocalStorage";
import { useEffect, useState } from "react";
import BloodDonationSurveyForm from "./BloodDonationSurveyForm";
import ProfileOfUser from "./ProfileOfUser";
import BloodDonationEvent from "./BloodDonationEvent";

export default function BloodDonationRegisterContainer () {
    const location = useLocation();
    const data = location.state?.item;
    const[item, setItem] = useLocalStorage("register-item", data);
    useEffect(() => {
        if (data && item !== data) {
            setItem(data); 
        }
    }, [data, item, setItem]);



    return(
        <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, mb: 4 }}>
            <BloodDonationSurveyForm/>
        </Box>
    );
}
