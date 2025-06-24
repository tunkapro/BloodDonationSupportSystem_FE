import { Box,Container,Typography } from "@mui/material";

export default function ErrorPage() {
    return (

        <Container sx={{textAlign : 'center'}}>
            <Box sx={{
                backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '600px',
                width: '800px',
                margin: 'auto'
            }}>
            </Box>
            <Typography variant="h2" color="error">404 Not Found</Typography>
        </Container>
    );
}