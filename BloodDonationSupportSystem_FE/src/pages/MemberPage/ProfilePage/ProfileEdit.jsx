import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Stack,
  MenuItem,
  Alert,
  useTheme,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { vi } from 'date-fns/locale';

const genders = ['Nam', 'Nữ', 'Khác'];

const ProfileEdit = ({ user, onSave, onCancel }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    ...user,
    gender: user.gender || 'Nam'
  });
  const [errors, setErrors] = useState({});
  const [dateError, setDateError] = useState('');
  const [tempDateValue, setTempDateValue] = useState(getValidDate(user.dayOfBirth));

  function getValidDate(dateStr) {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleDateChange = (newDate) => {
    setTempDateValue(newDate);

    if (!newDate || isNaN(newDate.getTime())) {
      setFormData(prev => ({ ...prev, dayOfBirth: '' }));
      setDateError('Ngày sinh không hợp lệ');
      return;
    }

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (newDate > today) {
      setDateError('Ngày sinh không được lớn hơn ngày hiện tại');
      return;
    }

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 150);

    if (newDate < minDate) {
      setDateError('Ngày sinh không hợp lệ');
      return;
    }

    const age = today.getFullYear() - newDate.getFullYear();
    const m = today.getMonth() - newDate.getMonth();
    const d = today.getDate() - newDate.getDate();
    const exactAge = m < 0 || (m === 0 && d < 0) ? age - 1 : age;

    if (exactAge < 18) {
      setDateError('Bạn phải đủ 18 tuổi để đăng ký hiến máu');
      return;
    }

    if (exactAge > 60) {
      setDateError('Bạn phải dưới 60 tuổi để đăng ký hiến máu');
      return;
    }

    setDateError('');
    setFormData(prev => ({
      ...prev,
      dayOfBirth: newDate.toISOString().split('T')[0]
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName || formData.fullName.trim() === '') {
      newErrors.fullName = 'Họ tên không được để trống';
    }

    if (!formData.address || formData.address.trim() === '') {
      newErrors.address = 'Địa chỉ không được để trống';
    }

    if (!formData.dayOfBirth || formData.dayOfBirth.trim() === '') {
      newErrors.dayOfBirth = 'Ngày sinh không được để trống';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && !dateError;
  };

  const handleSave = () => {
    if (validate()) onSave(formData);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',

        }}
      >
        <Box sx={{ position: 'relative', p: 4 }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              mb: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            Chỉnh sửa thông tin cá nhân
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              opacity: 0.9,
            }}
          >
            Quản lý thông tin cá nhân của bạn
          </Typography>
        </Box>
      </Paper>
      <Paper sx={{ p: 5 }}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Họ và tên"
            name="fullName"
            value={formData.fullName || ''}
            onChange={handleChange}
            error={!!errors.fullName}
            helperText={errors.fullName}
          />
          {formData.phoneNumber ? (
            <TextField
              fullWidth
              label="Số điện thoại"
              name="phoneNumber"
              value={formData.phoneNumber}
              slotProps={{ input: { readOnly: true } }}
            />
          ) : (
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email || ""}
              slotProps={{ input: { readOnly: true } }}
            />
          )}
          <TextField
            fullWidth
            label="Địa chỉ"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
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

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
            <DatePicker
              label="Ngày sinh"
              value={tempDateValue}
              onChange={handleDateChange}
              format="dd/MM/yyyy"
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!dateError || !!errors.dayOfBirth,
                  helperText: dateError || errors.dayOfBirth,
                  inputProps: {
                    placeholder: 'Nhập hoặc chọn ngày sinh',
                    autoComplete: 'off',
                  }
                }
              }}
            />
          </LocalizationProvider>

          <TextField
            fullWidth
            label="Nhóm máu"
            name="bloodType"
            value={formData.bloodType || 'Chưa cập nhật'}
            slotProps={{ input: { readOnly: true } }}
          />

          {/* {(dateError || Object.keys(errors).length > 0) && (
            <Alert severity="error" sx={{ mt: 1 }}>
              Vui lòng kiểm tra lại thông tin đã nhập
            </Alert>
          )} */}

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
              onClick={handleSave}
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
    </Box>
  );
};

export default ProfileEdit;
