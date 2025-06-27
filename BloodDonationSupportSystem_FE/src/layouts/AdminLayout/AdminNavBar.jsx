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
    Avatar,
    Chip,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const menuItems = [
        {
            title: null,
            items: [
                { text: 'Tổng quan', path: '/admin/overview', icon: <DashboardIcon /> },
            ],
        },
        {
            title: 'Quản lý',
            items: [
                { text: 'Người dùng', path: '/admin/user-management', icon: <AssignmentIcon /> },
                { text: 'Bài viết', path: '/admin/posts', icon: <CalendarMonthIcon /> },
                { text: 'Lịch hiến máu', path: '/admin/donation-calendar', icon: <CalendarMonthIcon /> },
                { text: 'Kho máu', path: '/admin/blood-bank', icon: <CalendarMonthIcon /> },
                { text: 'Đơn hiến máu', path: '/admin/donation-management', icon: <CalendarMonthIcon /> },
            ],
        },
        {
            title: 'Thống kê - Báo cáo',
            items: [
                { text: 'Quản lý người dùng', path: '/admin/user-management', icon: <AssignmentIcon /> },
                { text: 'Quản lý bài viết', path: '/admin/posts', icon: <CalendarMonthIcon /> }
            ],
        }
    ];

    // Get current selected item based on location
    const getCurrentSelectedItem = () => {
        const currentPath = location.pathname;
        for (const section of menuItems) {
            const foundItem = section.items.find(item => item.path === currentPath);
            if (foundItem) return foundItem.text;
        }
        return 'Tổng quan';
    };

    const [selectedItem, setSelectedItem] = useState(getCurrentSelectedItem());

    return (
        <Box sx={{ 
            width: 280, 
            
            bgcolor: '#f8fafc', 
            color: '#334155',
            display: 'flex',
            flexDirection: 'column',
          
            position: 'relative',
            overflow: 'hidden',
            borderRight: '1px solid #e2e8f0'
        }}>
            

            {/* Navigation Menu */}
            <Box sx={{ flex: 1, overflowY: 'auto', py: 2 }}>
                {menuItems.map((section, i) => (
                    <Box key={section.title}>
                        <Typography sx={{ 
                            px: 3, 
                            py: 1.5, 
                            fontWeight: 600, 
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            color: '#64748b',
                            opacity: 0.8
                        }}>
                            {section.title}
                        </Typography>
                        <List sx={{ py: 0 }}>
                            {section.items.map((item) => (
                                <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                                    <ListItemButton
                                        selected={selectedItem === item.text}
                                        onClick={() => {
                                            setSelectedItem(item.text);
                                            navigate(item.path);
                                        }}
                                        sx={{
                                            mx: 1.5,
                                            borderRadius: 2,
                                            color: selectedItem === item.text ? '#667eea' : '#64748b',
                                            minHeight: 48,
                                            '&.Mui-selected': {
                                                bgcolor: '#eff6ff',
                                                borderLeft: '4px solid #667eea',
                                                '&:hover': {
                                                    bgcolor: '#dbeafe',
                                                },
                                            },
                                            '&:hover': {
                                                bgcolor: '#f1f5f9',
                                                transform: 'translateX(4px)',
                                                transition: 'all 0.2s ease-in-out',
                                            },
                                            transition: 'all 0.2s ease-in-out',
                                        }}
                                    >
                                        <ListItemIcon sx={{ 
                                            color: selectedItem === item.text ? '#667eea' : '#94a3b8', 
                                            minWidth: 40,
                                            transition: 'color 0.2s ease-in-out'
                                        }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary={item.text} 
                                            sx={{
                                                '& .MuiListItemText-primary': {
                                                    fontWeight: selectedItem === item.text ? 600 : 500,
                                                    fontSize: '0.9rem',
                                                    transition: 'font-weight 0.2s ease-in-out'
                                                }
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        {i < menuItems.length - 1 && (
                            <Divider sx={{ 
                                borderColor: '#e2e8f0', 
                                mx: 2, 
                                my: 2 
                            }} />
                        )}
                    </Box>
                ))}
            </Box>

            {/* Footer */}
            <Box sx={{ 
                borderTop: '1px solid #e2e8f0',
                textAlign: 'center',
                bgcolor: '#f8fafc',
                py: 2,
                mt: 'auto',
                minHeight: 48
            }}>
                <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    © 2024 Blood Donation System
                </Typography>
            </Box>
        </Box>
    );
}
