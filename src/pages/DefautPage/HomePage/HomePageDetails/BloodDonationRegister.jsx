import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function BloodDonationRegister() {
    const navigate = useNavigate();
    function handleBloodDonationRegis() {
        navigate('/event');
    }
    return (
        <Box>
            <Button onClick={handleBloodDonationRegis}
                sx={{
                    backgroundColor: '#0D47A1',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#0D47A1',
                        opacity: 0.8,
                    },
                }}
            >Đăng Ký Hiến Máu</Button>
        </Box>
    );
}