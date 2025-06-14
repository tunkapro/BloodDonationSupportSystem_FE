import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer';
import AppBarHeader from '../AppBarHeader';
import { useEffect } from 'react';
import { useAuth } from '../../context/authContext';


export default function DefaultLayout() {
    


    

    return (
        <>
            <AppBarHeader/>
            <Outlet />
            <Footer></Footer>
        </>
    );
}