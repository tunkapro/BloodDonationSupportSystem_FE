import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';




function AppBarHeader() {
  //'Home', 'News', 'q-a', 'Contact'
  const pages = [
    {
      title: "Trang Chủ",
      path: "/home"
    }, {
      title: "Tin Tức",
      path: "/news"
    },
    {
      title: "Hỏi - Đáp",
      path: "/q-a"
    }, {
      title: "Liên Hệ",
      path: "/contact"
    }
  ];
  // Register User
  const manage = [
    { title: "Đơn Đăng Ký", path: "/user/blood-donation-register" },
    { title: "Lịch Sử Hiến Máu", path: "/user/appointment-histories" }
  ]
  //'Profile', 'Account', 'Logout'
  const settings = [
    {
      title: "Hồ Sơ",
      path: "user/profile"
    },
    {
      title: "Logout",
      path: "user/logout"
    }
  ]
  // Get User Infor fake API. If have real API will decode TOkEN to GET Name and Role to Auth.
  //  if get Token is null will dont display permission of member like avata name
  const [user, setUser] = useState({
    fullName: "Trương Anh Tuấn",
    role: "member"
  });
  // handle Link

  const navigate = useNavigate();

  const handleClickSignin = () => {
    navigate('/login')
  };
  const handleClickSignup = () => {
    navigate('/register')
  };
  const handleLogout = () => {
    setUser(null);
    navigate('/')
  }



  //  handle UI
  const [selectedItem, setSelectedItem] = useState('Trang Chủ');
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='fixed' sx={{bgcolor: 'white'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* logo */}
          <Box sx={{margin: "0px 50px 0px 10px"}}><img src="/logo/logo.png" alt="Logo" style={{ height: 64 }} /></Box>
          {/* display menu icon and menu small screen*/}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'} }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color='black'
            >
              <MenuIcon />
            </IconButton>
            {/* menu  */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map(({ title, path }) => (
                <MenuItem key={title} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center', color: "black" }} to={path} component={Link} >{title}</Typography>
                </MenuItem>
              ))}
              {user && manage.map(({ title, path }) => (
                <MenuItem key={title} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center', color: "black" }} to={path} component={Link} >{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* display menu with large screen */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'left' }}>
            {pages.map(({ title, path }) => (
              <Button
                key={title}
                selected={selectedItem === title}
                onClick={() => { setSelectedItem(title); navigate(path) }}
                sx={{
                  my: 2, mx : 1,display: 'block', textAlign: 'center',
                  color: selectedItem === title ? 'white' : 'black',
                  bgcolor: selectedItem === title ? '#1976d2' : 'transparent',
                  '&:hover': {
                    bgcolor: selectedItem === title ? '#1565c0' : '#f5f5f5'
                  }
                }}
                component={Link}
                to={path}
              >
                <Typography >{title}</Typography>
              </Button>
            ))}
            {user && manage.map(({ title, path }) => (
              <Button
                key={title}
                selected={selectedItem === title}
                onClick={() => { setSelectedItem(title); navigate(path) }}
                sx={{
                  my: 2, color: 'black', display: 'block', textAlign: 'center', color: selectedItem === title ? 'white' : 'black',
                  bgcolor: selectedItem === title ? '#1976d2' : 'transparent',
                  '&:hover': {
                    bgcolor: selectedItem === title ? '#1565c0' : '#f5f5f5'
                  }
                }}
                component={Link}
                to={path}
              >
                <Typography >{title}</Typography>
              </Button>
            ))}
          </Box>
          {/* display when login success */}
          {user && <Box sx={{ flexGrow: 0 }}>
            {/* display avatar */}
            <Tooltip title="Open settings">

              <Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ marginRight: '10px' }} />
                <Typography color='black'>{user.fullName}</Typography>
              </Button>
            </Tooltip>
            {/* display settings */}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ title, path }) => (
                <MenuItem key={title} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }} component={Link} to={path}>{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
          {/* display box login or signup */}
          {!user &&
            <Button
              color="black"
              variant="outlined"
              onClick={handleClickSignin}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(30, 191, 219, 0.1)'
                }
              }}
            >
              <Typography sx={{ color: 'black' }}>Đăng nhập</Typography>
            </Button>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppBarHeader;
