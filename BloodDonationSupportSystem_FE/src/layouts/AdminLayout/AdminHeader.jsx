import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  InputBase, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  Fade, 
  Paper 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';

const admin = {
  name: 'Admin User',
  avatar: '',
};

export default function AdminHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate('/admin/profile');
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#fff', color: '#222', borderBottom: '1px solid #e2e8f0', zIndex: 1201 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: 72 }}>
        {/* Logo/Title */}
        <Typography variant="h6" fontWeight={700} color="primary" sx={{ letterSpacing: 1 }}>
          Blood Donation Admin
        </Typography>

        {/* Search Bar */}
        <Paper
          component="form"
          sx={{
            p: '2px 8px',
            display: 'flex',
            alignItems: 'center',
            width: 320,
            boxShadow: 'none',
            border: '1px solid #e2e8f0',
            borderRadius: 2,
            bgcolor: '#f8fafc',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Tìm kiếm..."
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton type="submit" sx={{ p: '6px', color: 'primary.main' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        {/* Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }} src={admin.avatar}>
            {admin.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
          </Avatar>
          <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#222' }}>
            {admin.name}
          </Typography>
          <IconButton onClick={handleProfileClick} size="small" sx={{ color: 'primary.main' }}>
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ mt: 1 }}
          >
            <MenuItem onClick={() => { handleClose(); handleProfile(); }}>Hồ sơ</MenuItem>
            <MenuItem onClick={() => { handleClose(); handleLogout(); }}>Đăng xuất</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 