import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from '@mui/material';

export default function CancelDonor({ open, onClose, donor, onSave }) {
  if (!donor) return null;

  const handleConfirmCancel = () => {
    const updatedDonor = {
      ...donor,
      registrationStatus: 'HUỶ',
    };
    onSave(updatedDonor);  
    onClose();             
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận hủy đơn đăng ký</DialogTitle>
      <DialogContent>
        <Typography>
          Bạn có chắc chắn muốn hủy đơn đăng ký của <strong>{donor.donorFullName}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleConfirmCancel} color="error" variant="contained">
          Xác nhận hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}
