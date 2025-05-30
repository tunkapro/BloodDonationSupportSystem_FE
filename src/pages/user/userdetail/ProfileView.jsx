import React from 'react';
import {
  Avatar,
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  Button
} from '@mui/material';

const ProfileView = ({ user, onEdit }) => (
  <Paper sx={{ maxWidth: 600, m: 'auto', mt: 5, p: 3 }}>
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar src={user.avatar} sx={{ width: 80, height: 80 }} />
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
      <Typography><strong>Date of Birth:</strong> {user.dateOfBirth}</Typography>
      <Typography><strong>Blood Type:</strong> {user.bloodType}</Typography>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={onEdit}>Edit</Button>
      </Box>
    </Stack>
  </Paper>
);

export default ProfileView;