import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import RoomIcon from "@mui/icons-material/Room";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import LogoutIcon from "@mui/icons-material/Logout";
import EmergencyIcon from "@mui/icons-material/Emergency";
import ChecklistIcon from '@mui/icons-material/Checklist';
const StaffSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Danh mục",
      items: [
        {
          label: "Yêu cầu hiến máu",
          path: "/staff/donation-request",
          icon: <ListAltIcon />,
        },
        {
          label: "Quản lí hiến máu",
          path: "/staff/blood-management",
          icon: <ChecklistIcon />,
        },
        {
          label: "Lịch Hiến Máu",
          path: "/staff/blood-donation-schedule",
          icon: <ManageSearchIcon />,
        },
        {
          label: "Kho máu",
          path: "/staff/storage/blood-donation-list",
          icon: <AccountBalanceIcon />,
        },
        {
          label: "Tìm theo khoảng cách",
          path: "/staff/find-by-distance",
          icon: <RoomIcon />,
        },
        {
          label: "Trường hợp khẩn cấp",
          path: "/staff/emergency",
          icon: <EmergencyIcon />,
        },
      ],
    },
    {
      title: "Cài đặt",
      items: [
        {
          label: "Thông tin cá nhân",
          path: "/staff/profile",
          icon: <ManageAccountsIcon />,
        },
        { label: "Đăng xuất", path: "/logout", icon: <LogoutIcon /> },
      ],
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
                sx={{ color: "white", "&:hover": { bgcolor: "#4949ff" } }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
          {idx < menuItems.length - 1 && <Divider sx={{ bgcolor: "#ccc" }} />}
        </Box>
      ))}
    </Box>
  );
};

export default StaffSidebar;
