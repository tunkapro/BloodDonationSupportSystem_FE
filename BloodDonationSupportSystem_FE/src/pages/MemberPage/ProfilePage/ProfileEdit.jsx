import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Stack,
  MenuItem
} from '@mui/material';

const genders = ['Nam', 'Nữ', 'Khác'];

const ProfileEdit = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Paper sx={{ width: '100%', height: 'auto', m: 'auto', p: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, fontSize: '2rem', pb: 2 }}>
        <strong>Chỉnh sửa thông tin tài khoản</strong>
      </Box>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Họ và tên"
          name="fullName"
          value={formData.fullName || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Số điện thoại"
          name="phoneNumber"
          value={formData.phoneNumber || ''}
          slotProps={{ input: { readOnly: true } }}
        />
        <TextField
          fullWidth
          label="Địa chỉ"
          name="address"
          value={formData.address || ''}
          onChange={handleChange}
        />
        <TextField
          select
          fullWidth
          label="Giới tính"
          name="gender"
          value={formData.gender || ''}
          onChange={handleChange}
        >
          {genders.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
        </TextField>
        <TextField
          fullWidth
          type="date"
          label="Ngày sinh"
          name="dayOfBirth"
          value={formData.dayOfBirth || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Nhóm máu"
          name="bloodType"
          value={formData.bloodType || 'Chưa cập nhật'}
          slotProps={{ input: { readOnly: true } }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={onCancel}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1rem',
              backgroundColor: 'white',
              color: 'black',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => onSave(formData)}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)'
            }}
          >
            Lưu
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ProfileEdit;

