import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  Typography,
  Paper,
  Stack,
} from '@mui/material';

export default function StatusFilterList({ data }) {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Lọc danh sách theo status
  const filteredData = data.filter((item) => {
    if (selectedStatus === 'all') return true;
    return item.status === selectedStatus;
  });

  return (
    <Stack spacing={2}>
      {/* Bộ lọc theo Trạng thái */}
      <FormControl fullWidth>
        <InputLabel>Trạng thái</InputLabel>
        <Select value={selectedStatus} onChange={handleStatusChange} label="Trạng thái">
          <MenuItem value="all">Tất cả</MenuItem>
          <MenuItem value="Bình Thường">Bình Thường</MenuItem>
          <MenuItem value="Khẩn Cấp">Khẩn Cấp</MenuItem>
        </Select>
      </FormControl>

      {/* Danh sách sau khi lọc */}
      <List>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <ListItem key={index}>
              <Paper sx={{ padding: 2, width: '100%' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Trạng thái:</strong> {item.status}
                </Typography>
                <Typography variant="body2">{item.address}</Typography>
              </Paper>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2">Không tìm thấy kết quả phù hợp.</Typography>
        )}
      </List>
    </Stack>
  );
}
