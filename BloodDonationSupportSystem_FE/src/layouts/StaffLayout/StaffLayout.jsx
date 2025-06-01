
import { Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import StaffSidebar from './StaffSidebar';
import { useEffect } from 'react';
import axios from 'axios';

const StaffLayout = () => {
  const navigate = useNavigate();
  // get permission by call permission from authService or ManagementAPI to get Role to access this page
  useEffect(() => 
  {
   const permision = async () => {
    try{
      const res = await axios.get("http://localhost:3001/staff");
      if(res.data.role !== 'staff'){
        navigate('/404')
      }
    }catch(err){
      navigate('/404')
    }
   } 
   permision()
  })

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
