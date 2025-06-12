// src/pages/OverviewPage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, CircularProgress, Typography } from '@mui/material';
import BloodDonorReport from '../OverviewPage/BloodDonorReport'
import PieAnimation from '../OverviewPage/PieAnimation';
import axios from '../../../config/axios';

export default function OverviewPage() {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/report')
      .then((res) => {setReport(res.data);
            setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!report) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">Không thể tải dữ liệu báo cáo</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <BloodDonorReport />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <PieAnimation donationStatus={report.donationStatus} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
