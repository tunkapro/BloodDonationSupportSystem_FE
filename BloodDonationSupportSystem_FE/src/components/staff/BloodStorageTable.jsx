import React,{useState} from 'react';
import {
  AppBar, Toolbar, Typography, Box, Button,TextField,
  Container, Paper, TableContainer, Table,
  TableHead, TableRow, TableCell, TableBody,TablePagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
function BloodStorageTable({ data,onViewDashBoard,onCreateBloodBag}) {
 const navigate = useNavigate();
 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(8);
 const handleChangePage = (event, newPage) => {
  setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};

const [searchText, setSearchText] = useState('');
// data dồn vào filter này lọc ra tui máu theo nhóm data,mặc đinh là full nếu ko search
const filteredRows = data.filter((row) =>
  row.nhom.toLowerCase().includes(searchText.toLowerCase())
);

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
      <Box sx={{textAlign:'center'}}>
        <TextField sx={{mt:'5px',width:'500px'}} variant="outlined" size="small" onChange={(e) => setSearchText(e.target.value)}  placeholder='Tìm kiếm nhóm máu..'/>
      </Box>
     
      <Container sx={{ mt: 1 }}>
        <TableContainer component={Paper} >
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
              {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => (
                <TableRow key={row.tui}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
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
        <TablePagination
         rowsPerPageOptions={[]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count, page }) =>
          `Trang ${page + 1} trên ${Math.ceil(count / rowsPerPage)}`
        }
       
      />
      </Container>
    </Box>
  );
}
BloodStorageTable.defaultProps = {
  onCreateBloodBag: () => {},
  onViewDashBoard:()=>{},
};
export default BloodStorageTable;

