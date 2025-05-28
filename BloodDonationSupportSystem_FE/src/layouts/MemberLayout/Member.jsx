import { Link, Outlet } from 'react-router-dom'
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

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

   const navItems = ['Home', 'News', 'Question', 'Contact', 'Histories']
    return (
        <>
            <Header ></Header>
            <NavBar data = {navItems}> </NavBar>
            <Outlet />
            <Footer></Footer>
        </>
    );
}