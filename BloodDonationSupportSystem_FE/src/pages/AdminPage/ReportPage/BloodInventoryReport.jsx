import { useState } from 'react';
import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const BLOOD_INVENTORY_FAKE = [
  { id: 1, bloodType: 'A+', volume: 1200 },
  { id: 2, bloodType: 'A-', volume: 800 },
  { id: 3, bloodType: 'B+', volume: 950 },
  { id: 4, bloodType: 'B-', volume: 600 },
  { id: 5, bloodType: 'AB+', volume: 400 },
  { id: 6, bloodType: 'AB-', volume: 300 },
  { id: 7, bloodType: 'O+', volume: 1500 },
  { id: 8, bloodType: 'O-', volume: 700 },
];

const columns = [
  { field: 'bloodType', headerName: 'Nhóm máu', width: 150 },
  { field: 'volume', headerName: 'Dung tích (ml)', width: 200 },
];

function exportToCSV(data) {
  const header = ['Nhóm máu', 'Dung tích (ml)'];
  const rows = data.map(row => [row.bloodType, row.volume]);
  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += header.join(',') + '\n';
  rows.forEach(rowArr => {
    csvContent += rowArr.join(',') + '\n';
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'blood_inventory.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function BloodInventoryReport() {
  const [rows] = useState(BLOOD_INVENTORY_FAKE);

  return (
    <Box sx={{ p: 2, background: '#f5f6fa', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 700, margin: '32px auto' }}>
        <Typography variant="h5" textAlign={'center'} fontWeight={700} mb={1}>
          Báo Cáo Kho Máu
        </Typography>
        <Typography variant="subtitle1" textAlign={'center'} color="text.secondary" mb={3}>
          Xem tổng quan kho máu hiện tại và xuất file dữ liệu kho máu.
        </Typography>
        <Paper elevation={1} sx={{ p: 2, mb: 3, background: '#f8fafc' }}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={() => exportToCSV(rows)}>
              Xuất CSV
            </Button>
          </Stack>
        </Paper>
        <DataGrid
          rows={rows}
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