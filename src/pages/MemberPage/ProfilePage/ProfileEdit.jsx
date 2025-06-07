// ProfileEdit.jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Stack,
  MenuItem
} from '@mui/material';

const genders = ['MALE', 'FEMALE', 'OTHER'];

const ProfileEdit = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Paper sx={{ width: '100%', height: 'auto', m : 'auto', p: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2}}>
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
          label="Ngày sinh"
          name="dateOfBirth"
          type="date"
          shrink="true"
          value={formData.dateOfBirth || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Nhóm máu"
          name="bloodType"
          value={formData.bloodType || ''}
          slotProps={{ input: { readOnly: true } }}
        />
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={onCancel}>Cancel</Button>
          <Button variant="contained" onClick={() => onSave(formData)}>Save</Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ProfileEdit;
