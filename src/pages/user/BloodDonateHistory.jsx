import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  CircularProgress,
} from '@mui/material';
import {
  Bloodtype,
  CheckCircle,
  ErrorOutline,
  HourglassEmpty,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from '../../config/axios';

const getStatusIcon = (status) => {
  switch (status) {
    case 'COLLECTING':
      return <CheckCircle />;
    case 'SCREENING':
      return <HourglassEmpty />;
    case 'FAIL':
      return <ErrorOutline />;
    default:
      return <Bloodtype />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'COLLECTING':
      return '#4caf50';
    case 'SCREENING':
      return '#ff9800';
    case 'FAIL':
      return '#f44336';
    default:
      return '#9e9e9e';
  }
};

export default function BloodDonateHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/member/donation-history')
      .then((res) => setHistory(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  if (history.length === 0)
    return (
      <Box mt={5} textAlign="center">
        <Typography variant="h6">Chưa có lịch sử hiến máu nào.</Typography>
      </Box>
    );

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
         Lịch sử hiến máu
      </Typography>
      <Grid container spacing={3}>
        {history.map((donation) => (
          <Grid item xs={12} sm={6} md={4} key={donation.donationHistoryId}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    sx={{
                      bgcolor: getStatusColor(donation.processStatus),
                      mr: 2,
                    }}
                  >
                    {getStatusIcon(donation.processStatus)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">
                      {donation.processStatus}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(donation.donationDate).toLocaleDateString('vi-VN')}
                    </Typography>
                  </Box>
                </Box>
                <Typography>
                   Đã hiến: {donation.volumeMl} ml / Thu được: {donation.volumeCollected} ml
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
