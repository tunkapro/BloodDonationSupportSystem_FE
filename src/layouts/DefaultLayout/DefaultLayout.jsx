import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer';
import AppBarHeader from '../AppBarHeader';
import { useEffect } from 'react';


export default function DefaultLayout() {
    
    // useEffect(

    // )

    return (
        <>
            <AppBarHeader/>
            <Outlet />
            <Footer></Footer>
        </>
    );
}