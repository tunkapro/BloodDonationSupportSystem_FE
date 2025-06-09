import { Box } from "@mui/material";

import { Outlet, useNavigate } from "react-router-dom";
import StaffSidebar from "./StaffSidebar";
import { useEffect } from "react";
import axios from "axios";

const StaffLayout = () => {
  const navigate = useNavigate();
  // get permission by call permission from authService or ManagementAPI to get Role to access this page
  useEffect(() => {
    const permision = async () => {
      try {
        const res = await axios.get("http://localhost:3001/staff");
        if (res.data.role !== "staff") {
          navigate("/404");
        }
      } catch (err) {
        navigate("/404");
      }
    };
    permision();
  });

  return (

    <Box  sx={{ display: 'flex',position:'relative' ,height: '100vh' }}>

      {/* Sidebar chiếm 20% */}
      <Box
        sx={{
          flex: 2,
          bgcolor: '#1a51a3',
          borderRight: '1px solid #ddd',
          position:'sticky',
          top:'0',
        }}
      >
        <StaffSidebar />
      </Box>

      {/* Nội dung chiếm 80% */}
      <Box
        sx={{
          flex: 8,
          overflowX: "hidden",
          bgcolor: "background.default",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default StaffLayout;
