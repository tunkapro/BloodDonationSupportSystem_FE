import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function BloodDonationRegister() {
    const navigate = useNavigate();
    function handleBloodDonationRegis() {
        navigate('/event');
    }
    return (
        <Box>
            <Button onClick={handleBloodDonationRegis}>Đăng Ký Hiến Máu</Button>
        </Box>
    );
}