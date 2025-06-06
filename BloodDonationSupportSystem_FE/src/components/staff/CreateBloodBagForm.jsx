import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, MenuItem, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function CreateBloodBagForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nhom: "",
    dungTich: "",
    soluong: "1",
    nhap: null,
    hetHan: null,
    trangThai: "",
    maHienMau: "",
  });

  const [errors, setErrors] = useState({});

  const bloodTypes = [
    { value: "A_POSITIVE", label: "A+" },
    { value: "A_NEGATIVE", label: "A-" },
    { value: "B_POSITIVE", label: "B+" },
    { value: "B_NEGATIVE", label: "B-" },
    { value: "AB_POSITIVE", label: "AB+" },
    { value: "AB_NEGATIVE", label: "AB-" },
    { value: "O_POSITIVE", label: "O+" },
    { value: "O_NEGATIVE", label: "O-" },
  ];

  const isValidDate = (date) => date instanceof Date && !isNaN(date);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDateChange = (name, newValue) => {
    const date = isValidDate(newValue) ? newValue : null;
    setFormData((prev) => ({ ...prev, [name]: date }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const tempErrors = {};

    if (!formData.nhom) tempErrors.nhom = "Vui lòng chọn nhóm máu";
    if (!formData.dungTich || parseInt(formData.dungTich) <= 0)
      tempErrors.dungTich = "Vui lòng nhập dung tích số dương";

    if (!isValidDate(formData.nhap))
      tempErrors.nhap = "Vui lòng chọn ngày nhập hợp lệ";

    if (!isValidDate(formData.hetHan))
      tempErrors.hetHan = "Vui lòng chọn ngày hết hạn hợp lệ";

    if (
      isValidDate(formData.nhap) &&
      isValidDate(formData.hetHan) &&
      formData.hetHan < formData.nhap
    )
      tempErrors.hetHan = "Ngày hết hạn phải lớn hơn hoặc bằng ngày nhập";

    if (!formData.trangThai) tempErrors.trangThai = "Vui lòng nhập trạng thái";
    if (!formData.maHienMau) tempErrors.maHienMau = "Vui lòng nhập mã hiến máu";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Tạo túi máu:", formData);
      navigate("/staff/storage");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ m: 2, mx: "auto", width: "700px",height:'100vh' }}
    >
      <Typography sx={{ textAlign: "center", fontSize: 24, mb: 2 }}>
        Form tạo túi máu
      </Typography>

      <TextField
        select
        label="Nhóm máu"
        name="nhom"
        value={formData.nhom}
        onChange={handleChange}
        fullWidth
        margin="dense"
        error={Boolean(errors.nhom)}
        helperText={errors.nhom}
      >
        {bloodTypes.map((type) => (
          <MenuItem key={type.value} value={type.value}>
            {type.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Dung tích (ml)"
        name="dungTich"
        type="number"
        value={formData.dungTich}
        onChange={handleChange}
        fullWidth
        margin="dense"
        error={Boolean(errors.dungTich)}
        helperText={errors.dungTich}
      />

      <TextField
        label="Số lượng"
        name="soluong"
        type="number"
        value="1"
        disabled
        fullWidth
        margin="dense"
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <DatePicker
            label="Ngày nhập"
            value={formData.nhap}
            onChange={(newValue) => handleDateChange("nhap", newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "dense",
                error: Boolean(errors.nhap),
                helperText: errors.nhap,
              },
            }}
          />
          <DatePicker
            label="Ngày hết hạn"
            value={formData.hetHan}
            onChange={(newValue) => handleDateChange("hetHan", newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "dense",
                error: Boolean(errors.hetHan),
                helperText: errors.hetHan,
              },
            }}
          />
        </Box>
      </LocalizationProvider>

      <TextField
        label="Trạng thái"
        name="trangThai"
        value={formData.trangThai}
        onChange={handleChange}
        fullWidth
        margin="dense"
        error={Boolean(errors.trangThai)}
        helperText={errors.trangThai}
      />

      <TextField
        label="Mã hiến máu"
        name="maHienMau"
        value={formData.maHienMau}
        onChange={handleChange}
        fullWidth
        margin="dense"
        error={Boolean(errors.maHienMau)}
        helperText={errors.maHienMau}
      />

      <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-start", gap: 2 }}>
        <Button type="submit" variant="contained">
          Tạo túi máu
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Hủy
        </Button>
      </Box>
    </Box>
  );
}

export default CreateBloodBagForm;
