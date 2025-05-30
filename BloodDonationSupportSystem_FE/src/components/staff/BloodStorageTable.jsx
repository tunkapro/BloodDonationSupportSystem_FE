import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Container, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function BloodStorageTable() {
  // Dữ liệu cứng mẫu
  const rows = [
    { kho: 'v01', tui: 'b01', ten: 'Hồng cầu 350 A+', nhom: 'A', nhap: '10/5/2025', hetHan: '10/6/2025', trangThai: 'stored' ,soluong:'1'},
    { kho: 'v02', tui: 'b02', ten: 'Hồng cầu 350 A+', nhom: 'A', nhap: '10/5/2025', hetHan: '10/6/2025', trangThai: 'stored' ,soluong:'1'},
    // Có thể thêm nhiều dòng dữ liệu hơn nếu cần
  ];

  return (
    <Box>
      {/* Thanh công cụ với hai nút chức năng */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Kho máu</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit">Thêm bịch máu</Button>
          <Button color="inherit">Xuất bịch máu</Button>
        </Toolbar>
      </AppBar>

      {/* Bảng dữ liệu các túi máu */}
      <Container sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã kho</TableCell>
                <TableCell>Mã túi máu</TableCell>
                <TableCell>Tên túi máu</TableCell>
                <TableCell>Nhóm máu</TableCell>
                <TableCell>Ngày nhập</TableCell>
                <TableCell>Hạn sử dụng</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Số lượng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.tui}>
                  <TableCell>{row.kho}</TableCell>
                  <TableCell>{row.tui}</TableCell>
                  <TableCell>{row.ten}</TableCell>
                  <TableCell>{row.nhom}</TableCell>
                  <TableCell>{row.nhap}</TableCell>
                  <TableCell>{row.hetHan}</TableCell>
                  <TableCell>{row.trangThai}</TableCell>
                  <TableCell>{row.soluong}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}

export default BloodStorageTable;
