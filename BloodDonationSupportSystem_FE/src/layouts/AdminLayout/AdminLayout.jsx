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
        <Box>
            <Typography variant='h1' textAlign={'center'}>Admin</Typography>
            <Grid container spacing={2}>
                <Grid size={2}>
                    <AdminNavBar />
                </Grid>
                <Grid size={8}>
                    <Outlet />
                </Grid>
            </Grid>
        </Box>
    );
}