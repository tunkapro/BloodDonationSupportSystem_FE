import React, { useEffect, useState } from 'react';
import axios from '../../../config/axios';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';
import { 
  Typography, 
  Snackbar, 
  Alert, 
  CircularProgress, 
  Box, 
  Container,
} from '@mui/material';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/profile')
      .then((res) => setUser(res.data.data))
      .catch(() => setError('Không thể tải hồ sơ người dùng.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = (updatedData) => {
    const { phoneNumber, bloodType, ...editableData } = updatedData;
    
    axios.put('/profile', editableData)
      .then((res) => {
        setUser(res.data.data);
        setEditing(false);
        setSuccess('Cập nhật hồ sơ thành công.');
      })
      .catch(() => setError('Cập nhật hồ sơ thất bại.'));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography>Loading user profile...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        
        <Container maxWidth="md">
          {editing ? (
            <ProfileEdit
              user={user}
              onSave={handleSave}
              onCancel={() => setEditing(false)}
            />
          ) : (
            <ProfileView
              user={user}
              onEdit={() => setEditing(true)}
            />
          )}
        </Container>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!success}
          autoHideDuration={6000}
          onClose={() => setSuccess(null)}
        >
          <Alert onClose={() => setSuccess(null)} severity="success">
            {success}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default ProfilePage;