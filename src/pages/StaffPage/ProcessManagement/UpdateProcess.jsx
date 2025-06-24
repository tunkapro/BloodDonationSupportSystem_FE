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

export default function UpdateProcess({ isOpen, onClose, donor, onSave, onDonorChange }) {
  if (!donor) return null;

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleConfirmSave = () => {
    if (donor.processStatus === "ĐÃ HIẾN") {
      if (!donor.volumeMl || Number(donor.volumeMl) <= 0) {
        alert('Vui lòng nhập lượng máu đã hiến (ml) hợp lệ.');
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

  const isDisabledByProcess = donor.processStatus !== "ĐÃ HIẾN";


  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Cập nhật thông tin hiến máu</DialogTitle>
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
          {/* Trạng thái tiến trình & Lượng máu */}
          <Grid item xs={12} sm={6} mt={2} width={415}>
            <Typography fontWeight="bold" fontSize={14} gutterBottom>
              Trạng thái tiến trình
            </Typography>
            <TextField
              select
              value={donor.processStatus}
              onChange={(e) => onDonorChange({ ...donor, processStatus: e.target.value })}
              fullWidth

            >
              <MenuItem value="ĐANG XỬ LÍ">Đang xử lí</MenuItem>
              <MenuItem value="ĐÃ HIẾN">Đã hiến</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} mt={2} width={415}>
            <Typography fontWeight="bold" fontSize={14} gutterBottom>
              Lượng máu hiến tặng
            </Typography>
            <TextField
              type="number"
              label="ml"
              value={donor.volumeMl}
              inputProps={{ min: 0 }}
              fullWidth
              required
              disabled={isDisabledByProcess}
              onChange={(e) => onDonorChange({ ...donor, volumeMl: e.target.value })}
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
