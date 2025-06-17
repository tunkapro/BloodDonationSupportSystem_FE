import { Box } from "@mui/material";

import { Outlet, useNavigate } from "react-router-dom";
import StaffSidebar from "./StaffSidebar";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { Navigate } from "react-router-dom";

const StaffLayout = () => {
  const { user } = useAuth();
  setTimeout(() => {
    if (!user) return <Navigate to="/" />;
    console.log(user);
    if (user.role !== "ROLE_STAFF") return <Navigate to="/404" />;
    console.log(user.role);
  },[500]);
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar chiếm 20% */}
      <Box
        sx={{
          flex: 2,
          bgcolor: "background.paper",
          borderRight: "1px solid #ddd",
          height: "100vh",
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
