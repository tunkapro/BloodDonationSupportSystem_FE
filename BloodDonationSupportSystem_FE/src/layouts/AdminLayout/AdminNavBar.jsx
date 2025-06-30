import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';



const AdminNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const menuItems = [
    {
      title: "Danh mục",
      items: [
        {
          label: "Tổng quan",
          path: "/admin/overview",
          icon: <DashboardIcon />,
        },
        {
          label: "Quản Lí Người Dùng",
          path: "/admin/user-management",
          icon: <AssignmentIcon />,
        },
        {
          label: "Kho máu",
          path: "/admin/blood-inventory",
          icon: <ManageSearchIcon />,
        },
        {
          label: "Quản Lí Trang",
          path: "/admin/posts",
          icon: <CalendarMonthIcon />,
        },
      ],
    },
    {
      title: "Cài đặt",
      items: [
        {
          label: "Thông tin cá nhân",
          path: "/admin/profile",
          icon: <ManageAccountsIcon />,
        },
      ]
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#1a51a3",
        height: "100vh",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center', 
          gap: 1,
          p:1
        }}
      >
        <Box
          component="img"
          src="/logo/logo.png"
          alt="Logo"
          sx={{ width: 24, height: 24 }}
        />
        <Typography variant="h6">Trung tâm hiến máu</Typography>
      </Box>
      {menuItems.map((section, idx) => (
        <Box key={idx}>
          <List
            subheader={
              <div style={{ padding: "10px 16px", fontWeight: "bold" }}>
                {section.title}
              </div>
            }
          >
            {section.items.map((item, i) => (
              <ListItemButton
                key={i}
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{ color: "white", "&:hover": { bgcolor: "#4949ff" },"&.Mui-selected": {
                  color: "white",
                  backgroundColor: "#4949ff",
                } }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
          {idx < menuItems.length - 1 && <Divider sx={{ bgcolor: "#ccc" }} />}
        </Box>
      ))}
      <List sx={{p:0}}>
        <ListItemButton
          onClick={() => handleLogout()}
          sx={{ color: "white", "&:hover": { bgcolor: "#4949ff" } }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Đăng Xuất" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default AdminNavbar;
