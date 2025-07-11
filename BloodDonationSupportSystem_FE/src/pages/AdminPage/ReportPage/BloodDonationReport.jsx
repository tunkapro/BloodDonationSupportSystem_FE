import { useState, useEffect } from 'react';
import { Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Stack, Chip, CircularProgress, Button, Card, CardContent, Avatar, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ManagementAPI } from '../../../api/ManagementAPI';
import { LocalHospital } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

const columns = [
  { field: 'stt', headerName: 'STT', width: 70 },
  { field: 'time', headerName: 'Thời gian', width: 150 },
  { field: 'location', headerName: 'Địa điểm', width: 150 },
  { field: 'registered', headerName: 'Số người đăng ký', width: 160 },
  { field: 'success', headerName: 'Số người hiến thành công', width: 200 },
  { field: 'failed', headerName: 'Số người hiến máu thất bại', width: 200 },
  { field: 'totalVolume', headerName: 'Lượng máu thu được (ml)', width: 200 },
];

export default function BloodDonationReport() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const fetchBloodDonationReport = async () => {
    if (!fromDate || !toDate) return;
    setLoading(true);
    try {

      const response = await ManagementAPI.getBloodDonationReport(fromDate, toDate);
      const reportData = response.data || [];
      const transformedData = reportData.map((item, index) => ({
        id: index + 1,
        stt: index + 1,
        time: item.time || '',
        location: item.location || '',
        registered: item.registered || 0,
        success: item.success || 0,
        failed: item.failed || 0,
        totalVolume: item.totalVolume || 0,
      }));
      setRows(transformedData);
    } catch (error) {
      console.error('Error fetching blood donation report:', error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
     
      await ManagementAPI.exportDonationRegistrationReport(fromDate, toDate);
    } catch (error) {
      console.error('Error exporting report:', error);
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    if (fromDate && toDate) {
      fetchBloodDonationReport();
    }
  }, [fromDate, toDate]);

  return (
    <Box sx={{ p: 2, background: '#f5f6fa', minHeight: '100vh' }}>
      <Card
        elevation={0}
        sx={{
          mb: 4,
          background: theme => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          borderRadius: 3
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                width: 56,
                height: 56
              }}
            >
              <LocalHospital sx={{ fontSize: 32 }} />
            </Avatar>
            <div>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Báo Cáo Hiến Máu
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Lọc, xuất file và xem chi tiết các lượt hiến máu theo khoảng ngày.
              </Typography>
            </div>
          </Stack>
        </CardContent>
      </Card>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 1200, margin: '32px auto' }}>
        {/* Title and subtitle moved to Card above */}
        <Paper elevation={1} sx={{ p: 2, mb: 3, background: '#f8fafc' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="flex-end">
              <DatePicker
                label="Từ ngày"
                value={fromDate}
                onChange={setFromDate}
                inputFormat="dd/MM/yy"
                renderInput={(params) => <TextField {...params} size="small" />}
                maxDate={toDate}
              />
              <DatePicker
                label="Đến ngày"
                value={toDate}
                onChange={setToDate}
                inputFormat="dd/MM/yy"
                renderInput={(params) => <TextField {...params} size="small" />}
                minDate={fromDate}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleExport}
                disabled={loading || exporting}
                startIcon={exporting ? <CircularProgress size={16} color="inherit" /> : null}
              >
                {exporting ? 'Đang xuất...' : 'Xuất Excel'}
              </Button>
            </Stack>
          </LocalizationProvider>
        </Paper>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={row => row.id}
            hideFooter
            density="compact"
            sx={{
              background: 'white',
              borderRadius: 2,
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#e3f2fd',
              },
            }}
          />
        )}
      </Paper>
    </Box>
  );
} 