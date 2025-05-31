import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AppBarHeader from '../AppBarHeader';
import { Toolbar } from '@mui/material';

export default function MemberLayout() {

     const navigate = useNavigate();

  //auth
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate("/403");
      }
    };

    checkLogin;
  }, [navigate]);

    return (
        <>
<<<<<<< HEAD:BloodDonationSupportSystem_FE/src/layouts/MemberLayout/MemberLayout.jsx
            <AppBarHeader/>
=======
            <AppBarHeader pages={pages} settings={settings} />
>>>>>>> 67eceeca5834bf91922c43d449ebb425f22ee2aa:src/layouts/MemberLayout/MemberLayout.jsx
            <Toolbar />
            <Outlet />
            <Footer></Footer>
        </>
    );
}