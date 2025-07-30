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

export default function EmerFilterBar({
  searchTerm,
  setSearchTerm,
  dateFilter,
  setDateFilter,
  urgencyFilter,
  setUrgencyFilter,
  fulfillFilter,
  setFulfillFilter
}) {
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Tìm kiếm theo tên bệnh nhân */}
          <Grid item xs={12} md={6} width={470}>
            <TextField
              fullWidth
              label="Tìm kiếm"
              placeholder="Tìm kiếm theo tên bệnh nhân..."
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

          {/* Lọc theo ngày tạo đơn */}
          <Grid item xs={12} md={3} width={200}>
            <TextField
              type="date"
              fullWidth
              label="Ngày tạo đơn"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Lọc theo mức độ khẩn cấp */}
          <Grid item xs={12} md={3} width={200}>
            <TextField
              select
              fullWidth
              label="Mức độ khẩn cấp"
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="KHẨN CẤP">Khẩn cấp</MenuItem>
              <MenuItem value="RẤT KHẨN CẤP">Rất khẩn cấp</MenuItem>
              <MenuItem value="CỰC KÌ KHẨN CẤP">Cực kì khẩn cấp</MenuItem>
            </TextField>
          </Grid>

          
        </Grid>
      </CardContent>
    </Card>
  );
}
