import { Link, Outlet, useNavigate } from 'react-router-dom'
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';

export default function Layout() {
    const [openSignin, setIsOpenLogin] = useState(false);
    const navigate = useNavigate();


    // useEffect(() => {
    //     const login = async 



    // });


    return (
        <>
            <Header ></Header>
            <NavBar></NavBar>
            <Outlet />
            <Footer></Footer>
        </>
    );
}