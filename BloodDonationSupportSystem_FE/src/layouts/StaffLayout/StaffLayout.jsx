
import { Box } from '@mui/material';

import { Outlet, useNavigate } from 'react-router-dom';
import StaffSidebar from './StaffSidebar';
import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';


const StaffLayout = () => {

  const { user } = useAuth();
    if (!user) return <Navigate to="/"/>
    if (user.role !== "ROLE_STAFF") return <Navigate to="/404" />


  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar chiếm 20% */}
      <Box
        sx={{
          flex: 2,
          bgcolor: "background.paper",
          borderRight: "1px solid #ddd",
          height: "100",
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
