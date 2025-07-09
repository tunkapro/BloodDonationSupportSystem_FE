import { useState } from 'react';
import { Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Button, Stack, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const DONATION_REPORT_FAKE = [
  {
    id: 1,
    address: 'Bệnh viện Chợ Rẫy, Quận 5, TP.HCM',
    donationDate: '2024-06-01',
    donorName: 'Nguyễn Văn A',
    staffName: 'Trần Thị B',
    status: 'Đã kiểm tra',
    bloodType: 'A+',
    volume: 450,
  },
  {
    id: 2,
    address: 'Bệnh viện Đại học Y Dược, Quận 5, TP.HCM',
    donationDate: '2024-06-02',
    donorName: 'Lê Văn C',
    staffName: 'Phạm Văn D',
    status: 'Chưa kiểm tra',
    bloodType: 'O-',
    volume: 350,
  },
  {
    id: 3,
    address: 'Bệnh viện Nhi Đồng 1, Quận 10, TP.HCM',
    donationDate: '2024-05-03',
    donorName: 'Trần Thị E',
    staffName: 'Ngô Văn F',
    status: 'Đã kiểm tra',
    bloodType: 'B+',
    volume: 500,
  },
  {
    id: 4,
    address: 'Bệnh viện Bình Dân, Quận 3, TP.HCM',
    donationDate: '2024-05-04',
    donorName: 'Phạm Thị G',
    staffName: 'Võ Văn H',
    status: 'Đã kiểm tra',
    bloodType: 'AB-',
    volume: 400,
  },
  {
    id: 5,
    address: 'Bệnh viện Quận 7, TP.HCM',
    donationDate: '2023-06-05',
    donorName: 'Đặng Văn I',
    staffName: 'Lý Thị K',
    status: 'Chưa kiểm tra',
    bloodType: 'O+',
    volume: 420,
  },
];

const columns = [
  { field: 'address', headerName: 'Địa chỉ bệnh viện', width: 250 },
  { field: 'donationDate', headerName: 'Ngày hiến', width: 120 },
  { field: 'donorName', headerName: 'Tên người hiến', width: 150 },
  { field: 'staffName', headerName: 'Tên nhân viên', width: 150 },
  {
    field: 'status',
    headerName: 'Trạng thái',
    width: 140,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === 'Đã kiểm tra' ? 'success' : 'warning'}
        size="small"
        sx={{ fontWeight: 600 }}
      />
    ),
  },
  { field: 'bloodType', headerName: 'Nhóm máu', width: 100 },
  { field: 'volume', headerName: 'Dung tích (ml)', width: 130 },
];

function getUniqueYears(data) {
  return Array.from(new Set(data.map(row => new Date(row.donationDate).getFullYear())));
}

function exportToCSV(data) {
  const header = ['Địa chỉ bệnh viện', 'Ngày hiến', 'Tên người hiến', 'Tên nhân viên', 'Trạng thái', 'Nhóm máu', 'Dung tích (ml)'];
  const rows = data.map(row => [row.address, row.donationDate, row.donorName, row.staffName, row.status, row.bloodType, row.volume]);
  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += header.join(',') + '\n';
  rows.forEach(rowArr => {
    csvContent += rowArr.join(',') + '\n';
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'blood_donation_report.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function BloodDonationReport() {
  const [rows] = useState(DONATION_REPORT_FAKE);
  const [month, setMonth] = useState('all');
  const [year, setYear] = useState('all');

  const years = getUniqueYears(rows);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleMonthChange = (e) => setMonth(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);

  const filteredRows = rows.filter(row => {
    const date = new Date(row.donationDate);
    const matchMonth = month === 'all' || date.getMonth() + 1 === month;
    const matchYear = year === 'all' || date.getFullYear() === year;
    return matchMonth && matchYear;
  });

  return (
    <Box sx={{ p: 2, background: '#f5f6fa', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 1100, margin: '32px auto' }}>
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
              <Select value={month} label="Tháng" onChange={handleMonthChange}>
                <MenuItem value="all">Tất cả</MenuItem>
                {months.map(m => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Năm</InputLabel>
              <Select value={year} label="Năm" onChange={handleYearChange}>
                <MenuItem value="all">Tất cả</MenuItem>
                {years.map(y => (
                  <MenuItem key={y} value={y}>{y}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={() => exportToCSV(filteredRows)}>
              Xuất CSV
            </Button>
          </Stack>
        </Paper>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={row => row.id}
          autoHeight
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
      </Paper>
    </Box>
  );
} 