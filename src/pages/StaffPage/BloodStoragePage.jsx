import React from 'react';
import BloodStorageTable from '../../components/staff/BloodStorageTable';
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material";
function BloodStoragePage() {
  
    const bloodBags = [
      { tui: 'b01',nhom: 'A+',dungTich: '450',soluong: '1', nhap: '10/5/2025', hetHan: '10/6/2025', trangThai: 'Đã nhận',maHienMau:'abc123456'},
      { tui: 'b02',nhom: 'A+',dungTich: '400',soluong: '1', nhap: '10/5/2025', hetHan: '10/6/2025', trangThai: 'Đã kiểm tra',maHienMau:'abc123457'},
      { tui: 'b03',nhom: 'B+',dungTich: '450',soluong: '1', nhap: '11/4/2025', hetHan: '11/5/2025', trangThai: 'Hết hạn',maHienMau:'abc123458'},
      { tui: 'b04',nhom: 'O+',dungTich: '450',soluong: '1', nhap: '12/5/2025', hetHan: '12/6/2025', trangThai: 'Không đạt',maHienMau:'abc123459'}
      
    ];
    const navigate = useNavigate();
  

    return (
      <Box>
        <BloodStorageTable
           data={bloodBags}
           onCreateBloodBag={() => navigate('/staff/storage/create')}
        />     
      </Box>
    );
  }
  
  export default BloodStoragePage;