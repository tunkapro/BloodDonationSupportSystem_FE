import { Link, Outlet, useNavigate } from 'react-router-dom'
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import AdminNavBar from './AdminNavBar';

export default function AdminLayout() {

    const navigate = useNavigate();

    // call method permision from package authService or Managerment to get permision access this page
    useEffect(() => {
        // fake API
        const getPermission = async () => {
            try {
                const res = await axios.get("http://localhost:3001/admin");

                if (res.data.role != 'admin') {
                    navigate('/404');
                }
            } catch (error) {
                navigate('/404');
            }
        }
        getPermission();
    });


    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        sx={{
          flex: 1,
          bgcolor: "background.paper",
          borderRight: "1px solid #ddd",
          height: "100",
        }}
      >
        <AdminNavBar />
      </Box>

      <Box
        sx={{
          flex: 9,
          overflowX: "hidden",
          bgcolor: "background.default",
        }}
      >
        <Outlet />
      </Box>
    </Box>
    );
}