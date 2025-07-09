import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, Stack, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ManagementAPI } from '../../../api/ManagementAPI';

const columns = [
  { field: 'bloodType', headerName: 'Nhóm máu', width: 150 },
  { field: 'volume', headerName: 'Dung tích (ml)', width: 200 },
];

export default function BloodInventoryReport() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  const fetchBloodInventoryData = async () => {
    setLoading(true);
    try {
      const response = await ManagementAPI.getBloodInventory();
      
      const inventoryData = response.data?.bloodInventory || [];
      
      const transformedData = inventoryData.map((item, index) => ({
        id: index + 1,
        bloodType: item.bloodType || '',
        volume: item.volume || item.quantity || 0,
      }));
      
      setRows(transformedData);
    } catch (error) {
      console.error('Error fetching blood inventory data:', error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      await ManagementAPI.exportBloodInventory();
    } catch (error) {
      console.error('Error exporting blood inventory:', error);
     
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    fetchBloodInventoryData();
  }, []);

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