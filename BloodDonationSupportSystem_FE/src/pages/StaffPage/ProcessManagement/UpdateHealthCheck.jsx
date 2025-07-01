import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
} from '@mui/material';

export default function UpdateHealthCheck({ isOpen, onClose, donor, onSave, onDonorChange }) {
  if (!donor) return null;

  const [openConfirm, setOpenConfirm] = useState(false);


  const handleConfirmSave = () => {
    if (donor.healthCheckStatus !== "CHỜ ĐỢI") {

      if (!donor.height || Number(donor.height) <= 0) {
        alert('Vui lòng nhập chiều cao hợp lệ.');
        return;
      }

      if (!donor.weight || Number(donor.weight) <= 0) {
        alert('Vui lòng nhập cân nặng hợp lệ.');
        return;
      }
    }
    setOpenConfirm(true);
  };

  const handleSave = () => {
    onSave(donor);
    onClose();
    setOpenConfirm(false);
  };

  const isDisabledByHealthCheck = donor.healthCheckStatus === "CHỜ ĐỢI";

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Cập nhật tình trạng sức khỏe</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Họ tên & Ngày đăng ký */}
          <Grid item xs={12} sm={6} width={415}>
            <Typography fontWeight="bold" fontSize={14} gutterBottom>
              Họ tên
            </Typography>
            <TextField
              value={donor.donorFullName}
              fullWidth
              disabled
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} width={415}>
            <Typography fontWeight="bold" fontSize={14} gutterBottom>
              Ngày đăng ký
            </Typography>
            <TextField
              value={new Date(donor.registrationDate).toLocaleDateString('vi-VN')}
              fullWidth
              disabled
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>


        <Grid container spacing={2} mt={2}>
          {/* Trạng thái sức khỏe & Nhóm máu */}
          <Grid item xs={12} sm={6} mt={2} width={415}>
            <Typography fontWeight="bold" fontSize={14} gutterBottom>
              Tình trạng sức khỏe
            </Typography>
            <TextField
              select
              value={donor.healthCheckStatus}
              onChange={(e) => onDonorChange({ ...donor, healthCheckStatus: e.target.value })}
              fullWidth
            >
              <MenuItem value="CHỜ ĐỢI">Chờ đợi</MenuItem>
              <MenuItem value="CHƯA ĐẠT">Chưa đạt</MenuItem>
              <MenuItem value="ĐÃ ĐẠT">Đã đạt</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} mt={2} width={415}>
            <Typography fontWeight="bold" fontSize={14} gutterBottom>
              Ghi chú
            </Typography>
            <TextField
              multiline
              value={donor.note}
              label={<em>Ghi chú thêm của nhân viên y tế</em>}
              fullWidth      
              onChange={(e) => onDonorChange({ ...donor, note: e.target.value })}
              disabled={isDisabledByHealthCheck}
            >

            </TextField>
          </Grid>

        </Grid>

        <Grid container spacing={2} mt={2}>
          {/* Chiều cao & Cân nặng */}
          <Grid item xs={12} sm={6} mt={2} width={415}>
            <Typography fontWeight="bold" fontSize={14} gutterBottom>
              Chiều cao
            </Typography>
            <TextField
              type="number"
              label="cm"
              value={donor.height}
              inputProps={{ min: 0 }}
              fullWidth
              required
              disabled={isDisabledByHealthCheck}
              onChange={(e) => onDonorChange({ ...donor, height: e.target.value })}
            />

          </Grid>

          <Grid item xs={12} sm={6} mt={2} width={415}>
            <Typography fontWeight="bold" fontSize={14} gutterBottom>
              Cân nặng
            </Typography>
            <TextField
              type="number"
              label="kg"
              value={donor.weight}
              inputProps={{ min: 0 }}
              fullWidth
              required
              disabled={isDisabledByHealthCheck}
              onChange={(e) => onDonorChange({ ...donor, weight: e.target.value })}
            />


          </Grid>
        </Grid>

      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Hủy
        </Button>
        <Button onClick={handleConfirmSave} variant="contained" color="primary">
          Lưu thay đổi
        </Button>
      </DialogActions>

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Xác nhận lưu thay đổi</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn lưu các thay đổi?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

    </Dialog>
  );
}
