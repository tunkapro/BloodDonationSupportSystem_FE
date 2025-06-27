import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { Search } from 'lucide-react';

export default function FilterBarProcess({
  searchTerm,
  setSearchTerm,
  dateFilter, 
  setDateFilter,
  processStatusFilter,
  setProcessStatusFilter,
  bloodTypeFilter,
  setBloodTypeFilter,
  priorityFilter,
  setPriorityFilter,
}) {
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* 🔍 Tìm kiếm - 2/3 chiều ngang */}
          <Grid item xs={12} md={8} sx={{ width: 450 }}>
            <TextField
              fullWidth
              label="Tìm kiếm"
              placeholder="Tìm kiếm theo tên người hiến máu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} style={{ color: '#9ca3af' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={2} sx={{ width: 200 }}>
            <TextField
              type="date"
              fullWidth
              label="Ngày đăng ký"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              InputLabelProps={{
                shrink: true, // để label không che mất ngày
              }}
            />
          </Grid>

           {/* 🚨 Mức độ */}
          <Grid item xs={12} md={2} sx={{ width: 150 }}>
            <TextField
              select
              fullWidth
              label="Mức độ"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="THÔNG THƯỜNG">Thông thường</MenuItem>
              <MenuItem value="KHẨN CẤP">Khẩn cấp</MenuItem>
            </TextField>
          </Grid>

          {/* ⏳ Trạng thái tiến trình */}
          <Grid item xs={12} md={2} sx={{ width: 150 }}>
            <TextField
              select
              fullWidth
              label="Trạng thái tiến trình"
              value={processStatusFilter}
              onChange={(e) => setProcessStatusFilter(e.target.value)}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="CHỜ ĐỢI">Chờ đợi</MenuItem>
              <MenuItem value="ĐANG XỬ LÍ">Đang xử lí</MenuItem>
            </TextField>
          </Grid>         

          <Grid item xs={12} md={2} sx={{ width: 100 }}>
            <TextField
              select
              fullWidth
              label="Nhóm máu"
              value={bloodTypeFilter}
              onChange={(e) => setBloodTypeFilter(e.target.value)}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
            </TextField>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
}
