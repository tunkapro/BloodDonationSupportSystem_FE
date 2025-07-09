import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Snackbar,
  Alert
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { registerAccount } from "../../../api/authService";
import { stringifyLocalDate } from "../../../utils/dayFormat";
import vi from "date-fns/locale/vi";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Toolbar } from "@mui/material";


const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const password = watch("password");

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const info = {
        ...data,
        dateOfBirth: JSON.parse(stringifyLocalDate(data.dateOfBirth)),
        status: "HOẠT ĐỘNG",
      };
      const reponse = await registerAccount(info);
      if (reponse.status == 200) {
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ padding : '50px' }}>
    <Toolbar />
      <Container maxWidth="sm">
      <Box
        sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}
      >
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
            {...register("phoneNumber", {
              required: "Vui lòng nhập số điện thoại",
              pattern: {
                value: /^\d{10}$/,
                message: "Số điện thoại không hợp lệ",
              },
            })}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            margin="normal"
            {...register("password", {
              required: "Vui lòng nhập mật khẩu",
              minLength: { value: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            fullWidth
            label="Xác nhận mật khẩu"
            type="password"
            margin="normal"
            {...register("confirmPassword", {
              required: "Vui lòng nhập lại mật khẩu",
              validate: (value) =>
                value === password || "Mật khẩu xác nhận không khớp",
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
            {...register("fullName", { required: "Vui lòng nhập họ và tên" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <FormControl fullWidth margin="normal" error={!!errors.gender}>
            <InputLabel id="gender-label">Giới tính</InputLabel>
            <Select
              labelId="gender-label"
              label="Giới tính"
              defaultValue=""
              {...register("gender", { required: "Vui lòng chọn giới tính" })}
            >
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
              <MenuItem value="Khác">Khác</MenuItem>
            </Select>
            {errors.gender && (
              <Typography variant="caption" color="error">
                {errors.gender.message}
              </Typography>
            )}
          </FormControl>

          <Controller
            name="dateOfBirth"
            control={control}
            rules={{ required: "Vui lòng chọn ngày sinh" }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
                <DatePicker
                  label="Ngày sinh"
                  value={field.value || null}
                  format="dd/MM/yyyy"
                  onChange={field.onChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="normal"
                      error={!!errors.dateOfBirth}
                      helperText={errors.dateOfBirth?.message}
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
            {...register("address", { required: "Vui lòng nhập địa chỉ" })}
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Đăng ký thành công! Đang chuyển hướng...
        </Alert>
      </Snackbar>
    </Container>
    </Box>
  );
};

export default RegisterPage;
