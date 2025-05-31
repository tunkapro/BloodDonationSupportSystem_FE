import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer';
import AppBarHeader from '../AppBarHeader';


export default function DefaultLayout() {
    
    
    return (
        <>
            <AppBarHeader/>
            <Outlet />
            <Footer></Footer>
        </>
    );
}