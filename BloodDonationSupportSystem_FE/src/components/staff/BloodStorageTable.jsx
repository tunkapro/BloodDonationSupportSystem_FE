import React from 'react';
import {
  AppBar, Toolbar, Typography, Box, Button,
  Container, Paper, TableContainer, Table,
  TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function BloodStorageTable({ data,onViewDashBoard,onCreateBloodBag}) {
 const navigate = useNavigate();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Kho máu</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={onViewDashBoard} >Tổng quan</Button>
          {/* chưa clear là sài  onClick={()=>navigate("/staff/storage") hay onclick={onStorage} */}
          <Button color="inherit" onClick={()=>navigate("/staff/storage/blood-bag-list", { state: { shouldReload: true }})}>Danh mục máu</Button>
          <Button color="inherit" onClick={onCreateBloodBag}>Tạo túi máu</Button>
          <Button color="inherit">Xuất bịch máu</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Mã túi máu</TableCell>
                <TableCell>Nhóm máu</TableCell>
                <TableCell>Dung tích</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Ngày nhập</TableCell>
                <TableCell>Hạn sử dụng</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Mã đăng kí hiến máu</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row,index) => (
                <TableRow key={row.tui}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.tui}</TableCell>
                  <TableCell>{row.nhom}</TableCell>
                  <TableCell>{row.dungTich}</TableCell>
                  <TableCell>{row.soluong}</TableCell>
                  <TableCell>{row.nhap}</TableCell>
                  <TableCell>{row.hetHan}</TableCell>
                  <TableCell>{row.trangThai}</TableCell>
                  <TableCell>{row.maHienMau}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
BloodStorageTable.defaultProps = {
  onCreateBloodBag: () => {},
  onViewDashBoard:()=>{},
};
export default BloodStorageTable;

