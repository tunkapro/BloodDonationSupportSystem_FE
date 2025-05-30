import { Link, Outlet } from 'react-router-dom'
import Footer from '../../components/Footer';
import { useState } from 'react';
import AppBarHeader from '../AppBarHeader';


export default function DefaultLayout() {
    
    const pages = ['Home', 'News', 'FAQ', 'Contact']
    return (
        <>
            <AppBarHeader pages={pages} />
            <Outlet />
            <Footer></Footer>
        </>
    );
}