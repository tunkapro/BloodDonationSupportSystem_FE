import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AppBarHeader from '../AppBarHeader';
import { Toolbar } from '@mui/material';

export default function MemberLayout() {
    const [openSignin, setIsOpenLogin] = useState(false);
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

   const pages = ['Home', 'News', 'Question', 'Contact', 'Histories'];
   const settings = ['Profile', 'Account', 'Logout']
    return (
        <>
            <AppBarHeader pages={pages} settings={settings} />
            <Toolbar />
            <Outlet />
            <Footer></Footer>
        </>
    );
}