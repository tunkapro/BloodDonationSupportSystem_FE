import React, { useState } from 'react';
import { TextField, List, ListItem, Typography, Paper, Stack } from '@mui/material';

export default function NameFilter({ data }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc danh sách theo tên
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Stack spacing={2}>
      {/* Ô nhập để lọc theo tên */}
      <TextField
        label="Tìm kiếm theo tên"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Danh sách đã lọc */}
      <List>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <ListItem key={index}>
              <Paper sx={{ padding: 2, width: '100%' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.name}
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
