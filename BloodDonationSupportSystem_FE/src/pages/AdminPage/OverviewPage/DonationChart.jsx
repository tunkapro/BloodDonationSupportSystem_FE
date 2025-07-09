import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Divider, FormControl, InputLabel, Select, MenuItem, Stack, useTheme } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const DonationChart = () => {
  const theme = useTheme();

  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [filteredChartData, setFilteredChartData] = useState({ labels: [], data: [] });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedBloodType, setSelectedBloodType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(y => ({ value: y, label: y }));
  const bloodTypes = [
    { value: 'all', label: 'Tất cả nhóm máu' },
    { value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' }, { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' }, { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' },
  ];
  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'success', label: 'Thành công' },
    { value: 'failed', label: 'Thất bại' },
  ];

  useEffect(() => {
    const currentDate = new Date();
    const labels = [];
    const data = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const label = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      labels.push(label);
      data.push(Math.floor(Math.random() * 71) + 50);
    }
    setChartData({ labels, data });
  }, []);

  useEffect(() => {
    let filteredData = [...chartData.data];
    let filteredLabels = [...chartData.labels];

    if (selectedYear !== 'all') {
      const yearStr = selectedYear.toString();
      const newFilteredLabels = filteredLabels.filter(label => label.startsWith(yearStr));
      if (newFilteredLabels.length > 0) {
        const startIndex = filteredLabels.indexOf(newFilteredLabels[0]);
        filteredLabels = newFilteredLabels;
        filteredData = chartData.data.slice(startIndex, startIndex + newFilteredLabels.length);
      } else {
        filteredLabels = [];
        filteredData = [];
      }
    }

    if (selectedBloodType !== 'all' || selectedStatus !== 'all') {
      filteredData = filteredData.map(value => {
        let adjustedValue = value;
        if (selectedBloodType !== 'all') {
          adjustedValue = Math.floor(adjustedValue * 0.8);
        }
        if (selectedStatus !== 'all') {
          adjustedValue = Math.floor(adjustedValue * (selectedStatus === 'success' ? 0.85 : 0.15));
        }
        return adjustedValue;
      });
    }
    setFilteredChartData({ labels: filteredLabels, data: filteredData });
  }, [selectedYear, selectedBloodType, selectedStatus, chartData]);

  const filters = [
    { id: 'year', label: 'Năm', value: selectedYear, options: years, handler: setSelectedYear },
    { id: 'bloodType', label: 'Nhóm máu', value: selectedBloodType, options: bloodTypes, handler: setSelectedBloodType },
    { id: 'status', label: 'Trạng thái', value: selectedStatus, options: statusOptions, handler: setSelectedStatus },
  ];

  return (
    <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: theme.palette.background.paper, boxShadow: 3 }}>
      <Typography variant="h6" mb={2} color="primary.main" fontWeight={600}>
        Biểu đồ số lượt hiến máu theo tháng
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          {filters.map(filter => (
            <FormControl key={filter.id} size="small" sx={{ minWidth: 120 }}>
              <InputLabel>{filter.label}</InputLabel>
              <Select
                value={filter.value}
                label={filter.label}
                onChange={(e) => filter.handler(e.target.value)}
              >
                {filter.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </Stack>
      </Box>

      <Box sx={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
        <LineChart
          xAxis={[{ scaleType: 'point', data: filteredChartData.labels }]}
          series={[{ 
            data: filteredChartData.data, 
            label: 'Lượt hiến máu', 
            color: selectedStatus === 'success' 
              ? theme.palette.success.main 
              : selectedStatus === 'failed' 
              ? theme.palette.error.main 
              : theme.palette.primary.main 
          }]}
          width={Math.max(600, filteredChartData.labels.length * 80)}
          height={320}
        />
      </Box>
    </Paper>
  );
};

export default DonationChart; 