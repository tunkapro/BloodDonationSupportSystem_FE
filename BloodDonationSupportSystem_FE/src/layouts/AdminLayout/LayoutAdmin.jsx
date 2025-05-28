import { Link, Outlet } from 'react-router-dom'
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { useState } from 'react';

export default function Layout() {
    const [openSignin, setIsOpenLogin] = useState(false);
    return (
        <>
            <Header ></Header>
            <NavBar></NavBar>
            <Outlet />
            <Footer></Footer>
        </>
    );
}