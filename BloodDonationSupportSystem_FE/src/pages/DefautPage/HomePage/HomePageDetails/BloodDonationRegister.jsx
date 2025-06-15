import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function BloodDonationRegister() {
    const navigate = useNavigate();
    function handleBloodDonationRegis() {
        navigate('/event');
    }
    return (
        <Box marginTop={5}>
            <Button variant="contained" sx={{'&:hover': {fontSize : '10'}}} color="error" onClick={handleBloodDonationRegis}>
                <Typography variant="h5" >
                    Đăng Ký Hiến Máu
                </Typography>
            </Button>
        </Box>
    );
}