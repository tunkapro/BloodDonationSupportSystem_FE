import { Box, Container, Typography } from "@mui/material";


export default function Footer() {
    return (
        <div>
            <Box bgcolor={"gray"} maxWidth="100%" height={50} display="flex" justifyContent="center" alignItems="center" color={"white"}>
                <Typography variant="h6" component="div">
                    Giọt máu vàng
                </Typography>
            </Box>
            <div style={{ padding: 20, backgroundColor: 'gray', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
                <Typography variant="body1" component="div">
                    Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM
                </Typography>
                <Typography variant="body1" component="div">
                    Điện thoại: 0123456789
                </Typography>
                <a href="">

                </a>
                <Typography variant="body1" component="div" sx={{ marginLeft: 2 }}>
                    Giọt máu vàng là một tổ chức phi lợi nhuận, hoạt động vì cộng đồng, với sứ mệnh kết nối những người hiến máu và những người cần máu.
                </Typography>
            </div>
            <Container maxWidth="lg" sx={{ padding: 2 }}>
                <Typography variant="body1" color="textSecondary" align="center">
                    © 2025 Giọt máu vàng. All rights reserved.
                </Typography>
            </Container>
        </div>
    );
}