import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AppBarHeader from '../AppBarHeader';
import { Toolbar } from '@mui/material';
import { useAuth } from '../../context/authContext';
import { Navigate } from 'react-router-dom';

export default function MemberLayout() {

//   const { user } = useAuth();
//   if (!user) return <Navigate to="/"/>
//   if (user.role !== "ROLE_MEMBER") return <Navigate to="/404" />

    return (
        <>
            <Toolbar />
            <Outlet />
        </>
    );
}