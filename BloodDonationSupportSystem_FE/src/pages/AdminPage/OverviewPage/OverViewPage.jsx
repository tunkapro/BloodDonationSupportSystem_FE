import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, Tooltip, useTheme, Divider } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const cardData = [
  {
    label: 'Tài khoản',
    icon: <PeopleIcon fontSize="large" color="primary" />, 
    tooltip: 'Tổng số tài khoản trong hệ thống',
    color: 'primary.main',
    bg: 'primary.lighter',
    key: 'userCount',
  },
  {
    label: 'Đăng ký hiến máu',
    icon: <AssignmentTurnedInIcon fontSize="large" color="info" />, 
    tooltip: 'Tổng số lượt đăng ký hiến máu',
    color: 'info.main',
    bg: 'info.lighter',
    key: 'donationRegisterCount',
  },
  {
    label: 'Hiến máu thành công',
    icon: <CheckCircleIcon fontSize="large" color="success" />, 
    tooltip: 'Số lượt hiến máu thành công',
    color: 'success.main',
    bg: 'success.lighter',
    key: 'donationSuccessCount',
  },
  {
    label: 'Hiến máu thất bại',
    icon: <CancelIcon fontSize="large" color="error" />, 
    tooltip: 'Số lượt hiến máu không thành công',
    color: 'error.main',
    bg: 'error.lighter',
    key: 'donationCancelCount',
  },
];

const OverViewPage = () => {
  const [userCount, setUserCount] = useState(0);
  const [donationRegisterCount, setDonationRegisterCount] = useState(0);
  const [donationSuccessCount, setDonationSuccessCount] = useState(0);
  const [donationCancelCount, setDonationCancelCount] = useState(0);
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const theme = useTheme();

  useEffect(() => {
    // Fake data
    setUserCount(1250);
    setDonationRegisterCount(890);
    setDonationSuccessCount(756);
    setDonationCancelCount(134);

    // Fake chart data for the last 12 months
    const currentDate = new Date();
    const labels = [];
    const data = [];
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const label = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      labels.push(label);
      // Generate random data between 50-120 for each month
      data.push(Math.floor(Math.random() * 71) + 50);
    }
    
    setChartData({ labels, data });
  }, []);

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
      <Grid container spacing={3} justifyContent="center" mb={4}>
        {cardData.map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={card.label}>
            <Tooltip title={card.tooltip} arrow>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 3,
                  background: theme.palette[card.bg?.split('.')?.[0]]?.[card.bg?.split('.')?.[1]] || theme.palette.background.paper,
                  boxShadow: `0 4px 24px 0 ${theme.palette[card.color?.split('.')?.[0]]?.[card.color?.split('.')?.[1]]}22`,
                  minHeight: 170,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-6px) scale(1.03)' },
                }}
              >
                {card.icon}
                <Typography variant="subtitle1" mt={1} color="text.secondary">
                  {card.label}
                </Typography>
                <Typography variant="h3" fontWeight={700} color={card.color} mt={1}>
                  {values[card.key]}
                </Typography>
              </Paper>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
      <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: theme.palette.background.paper, boxShadow: 3 }}>
        <Typography variant="h6" mb={2} color="primary.main" fontWeight={600}>
          Biểu đồ số lượt hiến máu theo tháng
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
          <LineChart
            xAxis={[{ scaleType: 'point', data: chartData.labels, label: 'Tháng' }]}
            series={[{ data: chartData.data, label: 'Lượt hiến máu', color: theme.palette.primary.main }]}
            width={Math.max(600, chartData.labels.length * 80)}
            height={320}
            grid={{ vertical: true, horizontal: true }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default OverViewPage; 