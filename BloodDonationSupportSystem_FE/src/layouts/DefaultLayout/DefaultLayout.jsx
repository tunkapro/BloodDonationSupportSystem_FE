import { Link, Outlet } from 'react-router-dom'
import Footer from '../../components/Footer';
import { useState } from 'react';
import AppBarHeader from '../AppBarHeader';


export default function DefaultLayout() {
    
    const pages = ['Home', 'News', 'Question', 'Contact']
    const settings = ['Profile', 'Account', 'Logout']
    return (
        <>
            <AppBarHeader pages={pages} settings={settings}/>
            <Outlet />
            <Footer></Footer>
        </>
    );
}