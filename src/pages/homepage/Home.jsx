import { Box, Container, Typography } from "@mui/material";
import BloodInformation from "./homepagedetail/BloodInformation";
import Blog from "./homepagedetail/Blog";
import Banner from "./homepagedetail/SlideShow";
import DonationTips from "./homepagedetail/DonationTip";
import ImportantNotes from '../../components/ImportantNotes';
import DateSearch from "./homepagedetail/DateSearch";

export default function Home() {
  return (
    <>
      <Container maxWidth={false} style={{ padding: 0 }}>
        <Box
          sx={{
            width: '100%',
            margin: '0 auto',
            borderRadius: 2,
            height: 'auto',
          }}
        >
          <Banner />
        </Box>
      </Container>
      <Box sx={{ backgroundColor: '#0D47A1', padding: 2, display: 'flex', justifyContent: 'center' }}>
        <DateSearch />
      </Box>
      <Box sx={{ marginTop: 5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        </Box>

        

        <Box
          component="section"
          sx={{
 
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" >
            <Container>             
              <BloodInformation></BloodInformation>
            </Container>
          </Typography>
        </Box>

        <Blog></Blog>

        <DonationTips></DonationTips>

        
      </Box>
    </>
  );
}
