import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function BloodDonationRegisterForm({ onSubmit, initialValues = { startDate: "", endDate: "" } }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();



  const handleFormSubmit = (data) => {
    console.log("Form submitted:", data);
    onSubmit?.(data); 
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ mt: 2, maxWidth: 500 }}
    >
      <Typography variant="h6" gutterBottom>
        Đăng ký hiến máu
      </Typography>

      <TextField
        fullWidth
        label="Ngày bắt đầu mong muốn"
        type="date"
        {...register("startDate", { required: "Ngày bắt đầu là bắt buộc" })}
        InputLabelProps={{ shrink: true }}
        error={!!errors.startDate}
        helperText={errors.startDate?.message}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Ngày kết thúc mong muốn"
        type="date"
        {...register("endDate", {
          required: "Ngày kết thúc là bắt buộc",
          validate: (value, formValues) => {
            if (value < formValues.startDate) {
              return "Ngày kết thúc phải sau ngày bắt đầu";
            }
            return true;
          },
        })}
        InputLabelProps={{ shrink: true }}
        error={!!errors.endDate}
        helperText={errors.endDate?.message}
        margin="normal"
      />

      <Button sx={{ mt: 2 }} type="submit" variant="contained">
        Gửi đăng ký
      </Button>
    </Box>
  );
}
