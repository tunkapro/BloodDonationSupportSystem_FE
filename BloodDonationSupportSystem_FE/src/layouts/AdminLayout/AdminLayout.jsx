import { Link, Outlet, useNavigate } from 'react-router-dom'
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import AdminNavBar from './AdminNavBar';
import { useAuth } from '../../context/authContext';

export default function AdminLayout() {

    const { user } = useAuth();
    if (!user) return <Navigate to="/"/>
    if (user.role !== "ROLE_ADMIN") return <Navigate to="/404" />


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