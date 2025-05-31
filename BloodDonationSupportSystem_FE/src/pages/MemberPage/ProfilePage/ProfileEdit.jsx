import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Stack,
  InputLabel
} from '@mui/material';

const ProfileEdit = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Paper sx={{ maxWidth: 600, m: 'auto', mt: 5, p: 3 }}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          value={formData.fullName || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address || ''}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Gender"
          name="gender"
          value={formData.gender || ''}
          onChange={handleChange}
        />
        <InputLabel htmlFor="dateOfBirth">Date of Birth</InputLabel>
        <TextField
          fullWidth
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth || ''}
          onChange={handleChange}
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