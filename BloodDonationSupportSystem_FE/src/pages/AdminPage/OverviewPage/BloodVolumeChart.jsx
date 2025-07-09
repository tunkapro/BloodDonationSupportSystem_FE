import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Divider, useTheme, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const BloodVolumeChart = () => {
  const theme = useTheme();

  const [rawBloodVolumeData, setRawBloodVolumeData] = useState([]);
  const [monthlyBloodVolumeData, setMonthlyBloodVolumeData] = useState({ labels: [], series: [] });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedBloodType, setSelectedBloodType] = useState('all');

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const months = [
    { value: 'all', label: 'Tất cả tháng' },
    { value: '1', label: 'Tháng 1' }, { value: '2', label: 'Tháng 2' }, { value: '3', label: 'Tháng 3' },
    { value: '4', label: 'Tháng 4' }, { value: '5', label: 'Tháng 5' }, { value: '6', label: 'Tháng 6' },
    { value: '7', label: 'Tháng 7' }, { value: '8', label: 'Tháng 8' }, { value: '9', label: 'Tháng 9' },
    { value: '10', label: 'Tháng 10' }, { value: '11', label: 'Tháng 11' }, { value: '12', label: 'Tháng 12' },
  ];
  const bloodTypes = [
    { value: 'all', label: 'Tất cả nhóm máu' },
    { value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' }, { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' }, { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' },
  ];

  useEffect(() => {
    const bloodTypesForVolume = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const yearsToGenerate = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
    const volumeData = [];
    
    yearsToGenerate.forEach(year => {
      for (let month = 1; month <= 12; month++) {
        const entry = { year, month };
        bloodTypesForVolume.forEach(bt => {
          entry[bt] = Math.floor(Math.random() * 500) + 100;
        });
        volumeData.push(entry);
      }
    });
    setRawBloodVolumeData(volumeData);
  }, []);
  
  useEffect(() => {
    if (rawBloodVolumeData.length === 0) return;

    const dataForYear = rawBloodVolumeData.filter(d => d.year === selectedYear);
    const allBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    
    if (selectedMonth === 'all') {
      const monthLabels = [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
      ];
      const typesToShow = selectedBloodType === 'all' 
        ? allBloodTypes 
        : [selectedBloodType];
      const newSeries = typesToShow.map(bt => ({
        label: bt,
        data: dataForYear.map(monthData => monthData[bt]),
      }));
      setMonthlyBloodVolumeData({ labels: monthLabels, series: newSeries });
    } else {
      const monthNum = parseInt(selectedMonth, 10);
      const dataForMonth = dataForYear.find(d => d.month === monthNum);
      if (dataForMonth) {
        const typesToShow = selectedBloodType === 'all'
          ? allBloodTypes
          : [selectedBloodType];
        const labels = typesToShow;
        const data = typesToShow.map(bt => dataForMonth[bt]);
        const newSeries = [{
          label: 'Thể tích (ml)',
          data,
        }];
        setMonthlyBloodVolumeData({ labels, series: newSeries });
      } else {
        setMonthlyBloodVolumeData({ labels: [], series: [] });
      }
    }
  }, [selectedYear, selectedMonth, selectedBloodType, rawBloodVolumeData]);

  return (
    <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, background: theme.palette.background.paper, boxShadow: 3, mt: 3 }}>
      <Typography variant="h6" mb={2} color="primary.main" fontWeight={600}>
        Thống kê thể tích máu theo tháng
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Năm</InputLabel>
              <Select value={selectedYear} label="Năm" onChange={(e) => setSelectedYear(e.target.value)}>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Tháng</InputLabel>
              <Select value={selectedMonth} label="Tháng" onChange={(e) => setSelectedMonth(e.target.value)}>
                {months.map((month) => (
                  <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Nhóm máu</InputLabel>
              <Select value={selectedBloodType} label="Nhóm máu" onChange={(e) => setSelectedBloodType(e.target.value)}>
                {bloodTypes.map((bloodType) => (
                  <MenuItem key={bloodType.value} value={bloodType.value}>{bloodType.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
        </Stack>
      </Box>

      <Box sx={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
        <BarChart
          xAxis={[{ 
            scaleType: 'band', 
            data: monthlyBloodVolumeData.labels
          }]}
          series={monthlyBloodVolumeData.series}
          width={Math.max(600, monthlyBloodVolumeData.labels.length * 100)}
          height={400}
        />
      </Box>
    </Paper>
  );
};

export default BloodVolumeChart; 