import React from 'react';
import {
  Avatar,
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  Button,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
} from '@mui/icons-material';

const ProfileView = ({ user, onEdit }) => {

  const getInitials = (fullName) => {
    if (!fullName) return "?";
    const words = fullName.split(" ");
    return words.length >= 2 ? words[0][0] + words[words.length - 1][0] : fullName[0];
  };

  return (
    <Paper sx={{ width: '100%', height: 'auto', m: 'auto', padding: 5 }}>
      <Stack spacing={2}>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, fontSize: '2rem' }}>
          <strong>Thông tin tài khoản</strong>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{ bgcolor: "primary.main", width: 70, height: 70, fontSize: "1.5rem", fontWeight: "bold" }}
          >
            {getInitials(user.fullName)}
          </Avatar>
          <Box>
            <Typography variant="h5">{user.fullName || "Người dùng"}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user.phoneNumber || "Chưa cập nhật số điện thoại"}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Typography><strong>Địa chỉ:</strong> {user.address || "Chưa cập nhật địa chỉ"}</Typography>
        <Typography><strong>Giới tính:</strong> {user.gender}</Typography>
        <Typography>
          <strong>Ngày sinh:</strong> {
            user.dayOfBirth &&
            new Date(user.dayOfBirth).toLocaleDateString('vi-VN')
          }
        </Typography>
        <Typography>
          <strong>Nhóm máu:</strong> {user.bloodType ? user.bloodType : "Chưa cập nhật"}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<EditIcon />}
            onClick={onEdit}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)'
            }}
          >
            Chỉnh sửa thông tin
          </Button>
        </Box>
      </Stack>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Chip
          label="Tài khoản đã xác thực"
          color="success"
          variant="outlined"
          sx={{ borderRadius: 3 }}
        />
      </Box>
    </Paper>
  );
};

export default ProfileView;


