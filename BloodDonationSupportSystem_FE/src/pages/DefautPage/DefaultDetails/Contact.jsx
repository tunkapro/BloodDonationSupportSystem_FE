import { Box, Container, Typography } from "@mui/material";

export default function Contact() {
    return(
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                <h1>Liên hệ</h1>
            </Box>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginBottom: 5 }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginTop: 2 }}>
                    Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM
                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginTop: 2 }}>
                    Điện thoại: (028) 1234 5678
                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginTop: 2 }}>
                    Email:
                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginTop: 2 }}>
                    Website: www.example.com
                </Typography>
            </Container>
        </>
    )
}