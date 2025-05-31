import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Home from "../pages/DefautPage/HomePage/Home.component";
import Contact from "../pages/DefautPage/ContactPage/Contact";
import News from "../pages/DefautPage/NewsPage/News";
import QuestionAndAnswer from "../pages/DefautPage/Q&APage/Q&APage";
import LoginPage from "../pages/DefautPage/LoginPage/LoginPage";
import ForgotPasswordPage from "../pages/DefautPage/ForgotPasswordPage/ForgotPassword";
import RegisterPage from "../pages/DefautPage/RegisterPage/RegisterPage";
import MemberLayout from "../layouts/MemberLayout/MemberLayout";
import BloodDonateHistory from "../pages/MemberPage/BloodDonateHistoryPage/BloodDonateHistory";
const CustomRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="Home" element={<Home />} />
                <Route path="contact" element={<Contact />} />
                <Route path="news" element={<News />} />
                <Route path="q-a" element={<QuestionAndAnswer/>} />
                <Route path="login" element={<LoginPage />} />
                <Route path="reset-password" element={<ForgotPasswordPage />} />
                <Route path="signup" element={<RegisterPage />} />
                <Route path="/user" element={<MemberLayout/>}>
                    <Route path="histories" element={<BloodDonateHistory/>}/>
                </Route>
            </Route>
           
            {/* <Route path="/staff/*" element={<StaffLayout />}>
               
                <Route index element={<Overview />} />
                <Route path="overview" element={<Overview />} />
                <Route path="storage" element={<BloodStorageTable />} />
            </Route> */}
        </Routes>
    );
};

export default CustomRoute;
