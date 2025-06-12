import { useState } from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    Button,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const [selectedItem, setSelectedItem] = useState('Tổng quan');
    const navigate = useNavigate();
    const menuItems = [
        {
            title: 'Danh mục',
            items: [
                { text: 'Tổng quan',path: '/admin/overview', icon: <DashboardIcon /> },
                { text: 'Quản Lí Người Dùng',path: '/admin/user-management', icon: <AssignmentIcon /> },
                { text: 'Quản Lí Kho Máu',path: '/admin/blood-inventory', icon: <ManageSearchIcon /> },
                { text: 'Quản Lí Trang',path: '/staff/overview', icon: <CalendarMonthIcon /> }
            ],
        }
    ];

    return (
        <Box>
            {/* <Box sx={{ display: 'flex'}}>
                <Box>
                    <Button color='white'><MenuOpenIcon bgcolor='black' /></Button>
                </Box>
                <Typography>Admin</Typography>
            </Box> */}
            <Box sx={{ width: 250, height: '100vh', overflowY: 'auto', bgcolor: '#0d47a1', color: '#fff' }}>
                {menuItems.map((section, i) => (
        <Box key={section.title}>
          <Typography sx={{ pl: 2, pt: i === 0 ? 2 : 1, fontWeight: 'bold', fontSize: 14 }}>
            {section.title}
          </Typography>
          <List>
            {section.items.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={selectedItem === item.text}
                  onClick={() => {setSelectedItem(item.text); navigate(item.path)}}
                  sx={{
                    color: '#fff',
                    '&.Mui-selected': {
                      bgcolor: '#1976d2',
                    },
                    '&.Mui-selected:hover': {
                      bgcolor: '#1565c0',
                    },
                    '&:hover': {
                      bgcolor: '#1565c0',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: '#fff', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mx: 2 }} />
        </Box>
      ))}
            </Box>
        </Box>
    );
}
