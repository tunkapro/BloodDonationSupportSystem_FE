
import {
  Container, Box, TextField, Button, Typography, Divider
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

const RegisterPage = () => {
  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = (data) => {
    console.log('Dữ liệu đăng ký:', data);
    // Gửi dữ liệu tới backend API tại đây
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'white' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Đăng ký tài khoản
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Thông tin tài khoản
          </Typography>

          <TextField
            fullWidth
            label="Số điện thoại"
            margin="normal"
            {...register('phone', {
              required: 'Vui lòng nhập số điện thoại',
              pattern: { value: /^\d{10}$/, message: 'Số điện thoại không hợp lệ' },
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            margin="normal"
            {...register('password', {
              required: 'Vui lòng nhập mật khẩu',
              minLength: { value: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            fullWidth
            label="Xác nhận mật khẩu"
            type="password"
            margin="normal"
            {...register('confirmPassword', {
              required: 'Vui lòng nhập lại mật khẩu',
              validate: (value) =>
                value === password || 'Mật khẩu xác nhận không khớp',
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Thông tin người dùng
          </Typography>

          <TextField
            fullWidth
            label="Họ và tên"
            margin="normal"
            {...register('name', { required: 'Vui lòng nhập họ và tên' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <Controller
            name="birthday"
            control={control}
            rules={{ required: 'Vui lòng chọn ngày sinh' }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Ngày sinh"
                  value={field.value || null}
                  onChange={field.onChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="normal"
                      error={!!errors.birthday}
                      helperText={errors.birthday?.message}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />

          <TextField
            fullWidth
            label="Địa chỉ"
            margin="normal"
            {...register('address', { required: 'Vui lòng nhập địa chỉ' })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Đăng ký
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;