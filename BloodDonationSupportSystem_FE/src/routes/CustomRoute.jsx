import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Home from "../pages/DefautPage/HomePage/Home.component";
import News from "../pages/DefautPage/NewsPage/News";
import QuestionAndAnswer from "../pages/DefautPage/Q&APage/Q&APage";
import Contact from "../pages/DefautPage/ContactPage/Contact";
import LoginPage from "../pages/DefautPage/LoginPage/LoginPage";
import RegisterPage from "../pages/DefautPage/RegisterPage/RegisterPage";
import ForgotPasswordPage from "../pages/DefautPage/ForgotPasswordPage/ForgotPassword";
import MemberLayout from "../layouts/MemberLayout/MemberLayout";
import StaffLayout from "../layouts/StaffLayout/StaffLayout";
const CustomRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/q-a" element={<QuestionAndAnswer/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/reset-password" element={<ForgotPasswordPage/>}/>
                
                <Route path="/user" element={<MemberLayout />}>
                    <Route path=""></Route>
                </Route>
            </Route>
            <Route path="/staff/*" element={<StaffLayout />}>
                {/* Các route staff khác */}
                {/* <Route index element={<Overview />} />
                <Route path="overview" element={<Overview />} />
                <Route path="storage" element={<BloodStorageTable />} /> */}
            </Route>
        </Routes>
    );
};

export default CustomRoute;
