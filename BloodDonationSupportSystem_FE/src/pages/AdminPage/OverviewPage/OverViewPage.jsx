import React, { useEffect, useState } from 'react';
import { Typography, Box, useTheme, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import StatisticsCards from './StatisticsCards';
import DonationChart from './DonationChart';
import BloodVolumeChart from './BloodVolumeChart';
import { ManagementAPI } from '../../../api/ManagementAPI';

const OverViewPage = () => {
  const [userCount, setUserCount] = useState(0);
  const [donationRegisterCount, setDonationRegisterCount] = useState(0);
  const [donationSuccessCount, setDonationSuccessCount] = useState(0);
  const [donationCancelCount, setDonationCancelCount] = useState(0);

  // Add year and month state
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState('all');

  const theme = useTheme();

  // Example: generate last 5 years for dropdown
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = [
    { value: 'all', label: 'Tất cả' },
    { value: 1, label: 'Tháng 1' },
    { value: 2, label: 'Tháng 2' },
    { value: 3, label: 'Tháng 3' },
    { value: 4, label: 'Tháng 4' },
    { value: 5, label: 'Tháng 5' },
    { value: 6, label: 'Tháng 6' },
    { value: 7, label: 'Tháng 7' },
    { value: 8, label: 'Tháng 8' },
    { value: 9, label: 'Tháng 9' },
    { value: 10, label: 'Tháng 10' },
    { value: 11, label: 'Tháng 11' },
    { value: 12, label: 'Tháng 12' },
  ];

  useEffect(() => {
    // Fetch data from API based on selectedYear and selectedMonth
    const fetchData = async () => {
      try {
        const data = await ManagementAPI.getOverviewStatistics(selectedYear, selectedMonth);
        setUserCount(data.userCount || 0);
        setDonationRegisterCount(data.donationRegisterCount || 0);
        setDonationSuccessCount(data.donationSuccessCount || 0);
        setDonationCancelCount(data.donationCancelCount || 0);
      } catch (error) {
        // Optionally handle error, for now just reset to 0
        setUserCount(0);
        setDonationRegisterCount(0);
        setDonationSuccessCount(0);
        setDonationCancelCount(0);
      }
    };
    fetchData();
  }, [selectedYear, selectedMonth]);

  const values = {
    userCount,
    donationRegisterCount,
    donationSuccessCount,
    donationCancelCount,
  };

  return (
    <Box sx={{ p: { xs: 1, md: 4 }, background: theme.palette.background.default, minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight={700} gutterBottom textAlign="center" color="primary.main">
        Thống kê tổng quan
      </Typography>

      {/* Filter controls */}
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        <Grid item>
          <FormControl size="small">
            <InputLabel id="year-select-label">Năm</InputLabel>
            <Select
              labelId="year-select-label"
              value={selectedYear}
              label="Năm"
              onChange={e => setSelectedYear(e.target.value)}
            >
              {years.map(year => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl size="small">
            <InputLabel id="month-select-label">Tháng</InputLabel>
            <Select
              labelId="month-select-label"
              value={selectedMonth}
              label="Tháng"
              onChange={e => setSelectedMonth(e.target.value)}
            >
              {months.map(month => (
                <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {/* End filter controls */}
      <StatisticsCards values={values} />
      <DonationChart />
      <BloodVolumeChart />
    </Box>
  );
};

export default OverViewPage; 