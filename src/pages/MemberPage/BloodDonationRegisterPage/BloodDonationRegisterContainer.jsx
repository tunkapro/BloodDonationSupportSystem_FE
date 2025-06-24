import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Box, Grid, Stack } from "@mui/material";
import useLocalStorage from "../../../hook/useLocalStorage";
import { useEffect, useState } from "react";
import BloodDonationSurveyForm from "./BloodDonationSurveyForm";


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
        <Box >
            <BloodDonationSurveyForm data={item}/>
        </Box>
    );
}
