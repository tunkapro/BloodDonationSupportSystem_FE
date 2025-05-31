import React from 'react';
import BloodTypeSearch from './BloodTypeSearch';
import { Box, Typography } from '@mui/material';

const BloodCompatibility = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom
        sx={{ mb: 4 }}
      >
        Blood Type Compatibility Checker
      </Typography>
      <BloodTypeSearch />
    </Box>
  );
};

export default BloodCompatibility; 