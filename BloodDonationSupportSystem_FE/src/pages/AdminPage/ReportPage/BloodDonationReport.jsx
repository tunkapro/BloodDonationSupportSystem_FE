import { useState, useEffect } from 'react';
import { Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Stack, Chip, CircularProgress, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ManagementAPI } from '../../../api/ManagementAPI';

const columns = [
  { field: 'fullName', headerName: 'Họ tên', width: 150 },
  { field: 'gender', headerName: 'Giới tính', width: 100 },
  { field: 'birthDate', headerName: 'Ngày sinh', width: 120 },
  { field: 'bloodType', headerName: 'Nhóm máu', width: 100 },
  { field: 'phoneNumber', headerName: 'Số điện thoại', width: 130 },
  { field: 'address', headerName: 'Địa chỉ', width: 200 },
  { field: 'registrationDate', headerName: 'Ngày đăng ký', width: 130 },
  {
    field: 'registrationStatus',
    headerName: 'Trạng thái đăng ký',
    width: 150,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === 'Đã tiếp nhận' ? 'success' : 'warning'}
        size="small"
        sx={{ fontWeight: 600 }}
      />
    ),
  },
];

function getUniqueYears(data) {
  return Array.from(new Set(data.map(row => {
    const dateParts = row.registrationDate.split('/');
    return parseInt(dateParts[2]);
  })));
}

export default function BloodDonationReport() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [month, setMonth] = useState('all');
  const [year, setYear] = useState('all');

  const fetchBloodDonationReport = async () => {
    setLoading(true);
    try {

      const response = await ManagementAPI.getOverviewStatistics(year, month);
      
  
      const reportData = response.data?.donationReports || [];
      
   
      const transformedData = reportData.map((item, index) => ({
        id: index + 1,
        fullName: item.fullName || item.donorName || '',
        gender: item.gender || '',
        birthDate: item.birthDate || '',
        bloodType: item.bloodType || '',
        phoneNumber: item.phoneNumber || item.phone || '',
        address: item.address || '',
        registrationDate: item.registrationDate || item.donationDate || '',
        registrationStatus: item.registrationStatus || item.status || 'Chờ xác nhận',
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
      await ManagementAPI.exportDonationRegistrationReport(year, month);
    } catch (error) {
      console.error('Error exporting report:', error);
   
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    fetchBloodDonationReport();
  }, [year, month]);

  const years = getUniqueYears(rows);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleMonthChange = (e) => setMonth(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);

  const filteredRows = rows.filter(row => {
    const dateParts = row.registrationDate.split('/');
    const day = parseInt(dateParts[0]);
    const monthNum = parseInt(dateParts[1]);
    const yearNum = parseInt(dateParts[2]);
    
    const matchMonth = month === 'all' || monthNum === month;
    const matchYear = year === 'all' || yearNum === year;
    return matchMonth && matchYear;
  });

  return (
    <Box sx={{ p: 2, background: '#f5f6fa', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 1200, margin: '32px auto' }}>
        <Typography variant="h5" textAlign={'center'} fontWeight={700} mb={1}>
          Báo Cáo Hiến Máu
        </Typography>
        <Typography variant="subtitle1" textAlign={'center'} color="text.secondary" mb={3}>
          Lọc, xuất file và xem chi tiết các lượt hiến máu theo tháng, năm.
        </Typography>
        <Paper elevation={1} sx={{ p: 2, mb: 3, background: '#f8fafc' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="flex-end">
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Tháng</InputLabel>
              <Select 
                value={month} 
                label="Tháng" 
                onChange={handleMonthChange}
                disabled={loading}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                {months.map(m => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Năm</InputLabel>
              <Select 
                value={year} 
                label="Năm" 
                onChange={handleYearChange}
                disabled={loading}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                {years.map(y => (
                  <MenuItem key={y} value={y}>{y}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
        </Paper>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={filteredRows}
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