
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import StaffSidebar from "../../components/staff/StaffSidebar";


const StaffLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar chiếm 20% */}
      <Box
        sx={{
          flex: 2,
          bgcolor: 'background.paper',
          borderRight: '1px solid #ddd',
        }}
      >
        <StaffSidebar/>
      </Box>

      {/* Nội dung chiếm 80% */}
      <Box
        sx={{
          flex: 8,
          p: 2,
          overflowX: 'hidden',
          bgcolor: 'background.default',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default StaffLayout;
