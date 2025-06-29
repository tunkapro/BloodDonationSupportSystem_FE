import React, { useEffect, useState } from 'react';
import axios from '../../../config/axios';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';
import { Typography, Snackbar, Alert, CircularProgress, Box, Container } from '@mui/material';
import { Toolbar } from '@mui/material';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/member/profile')
      .then((res) => setUser(res.data.data))
      .catch(() => setError('Không thể tải hồ sơ người dùng.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = (updatedData) => {
  const { phoneNumber, bloodType, ...editableData } = updatedData;
  const selectedDate = new Date(editableData.dayOfBirth);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate > today) {
    setError('Ngày sinh không được lớn hơn ngày hiện tại.');
    return;
  }

  axios.put('/member/profile', editableData)
    .then((res) => {
      setUser(res.data.data);
      setEditing(false);
      setSuccess('Cập nhật hồ sơ thành công.');
    })
    .catch(() => setError('Cập nhật hồ sơ thất bại.'));
};

  if (loading) {
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Typography align="center" mt={5}>Loading user profile...</Typography>;
  }

  return (
    <>
      <div className="relative min-h-screen w-full bg-blue-400/40">
        <div className="absolute inset-0 backdrop-blur-sm z-0" />
        <div className="relative z-10 flex justify-center min-h-screen w-full px-4 pt-[64px]">
          <Container maxWidth="md">
            <Toolbar />
              <Box sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 8 }}>
                {editing ? (
                  <ProfileEdit user={user} onSave={handleSave} onCancel={() => setEditing(false)} />
                ) : (
                  <ProfileView user={user} onEdit={() => setEditing(true)} />
                )}
              </Box>
            <Snackbar
              open={!!error}
              autoHideDuration={4000}
              onClose={() => setError(null)}
            >
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            </Snackbar>

            <Snackbar
              open={!!success}
              autoHideDuration={4000}
              onClose={() => setSuccess(null)}
            >
              <Alert severity="success" onClose={() => setSuccess(null)}>
                {success}
              </Alert>
            </Snackbar>
          </Container>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;