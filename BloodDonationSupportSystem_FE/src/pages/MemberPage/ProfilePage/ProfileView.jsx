import React from 'react';
import {
  Avatar,
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  Button,
} from '@mui/material';

const ProfileView = ({ user, onEdit }) => {
  return (
    <Paper sx={{ width: '100%', height: 'auto', m: 'auto', padding: 5 }}>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <strong>Thông tin tài khoản</strong>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={user.avatar || '/default-avatar.png'} sx={{ width: 80, height: 80 }} />
          <Box>
            <Typography variant="h5">{user.fullName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user.phoneNumber}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Typography><strong>Address:</strong> {user.address}</Typography>
        <Typography><strong>Gender:</strong> {user.gender}</Typography>
        <Typography>
          <strong>Date of Birth:</strong> {
            user.dayOfBirth &&
            new Date(user.dayOfBirth).toLocaleDateString('vi-VN')
          }
        </Typography>
        <Typography><strong>Blood Type:</strong> {user.bloodType}</Typography>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={onEdit}>Edit</Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ProfileView;