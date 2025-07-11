import { Box, Button, Toolbar } from "@mui/material";

import { downloadCertificate } from "../../../api/certificate";

export default function CertificatePage() {
  const handleClick = async () => {
    const res = await downloadCertificate();
    console.log(res);
  };

  return (

      <Box sx={{ marginTop: "30px" }}>
      <Toolbar/>
        <Button onClick={handleClick}> Bấm</Button>
      </Box>

  );
}
