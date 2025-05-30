import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Home from "../pages/homepage/Home";
import Contact from "../pages/DefautPage/DefaultDetails/Contact";
import News from "../pages/DefautPage/DefaultDetails/News";
import QuestionAndAns from "../pages/DefautPage/DefaultDetails/QuestionAndAns";
// import LayoutAdmin from "../layouts/AdminLayout/LayoutAdmin"

import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPassword";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import MemberLayout from "../layouts/MemberLayout/Member";
import LoginPageV2 from "../pages/LoginPage/LoginPageV2";
// import AdminPosts from "../pages/admin/managementhomepage/AdminPosts";

const CustomRoute = () => {
    return (
        <Routes>
            {/* Guest router */}
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/news" element={<News />} />
                <Route path="/Q-A" element={<QuestionAndAns />} />

                <Route path="/login" element={<LoginPageV2/>} />
                <Route path="/reset-password" element={<ForgotPasswordPage/>} />
                <Route path="/signup" element={<RegisterPage/>} />
            </Route>



            {/* User router */}
            <Route path="/user/*" element={<MemberLayout />}>
                <Route path="home" element={<Home />} />
                <Route path="contact" element={<Contact />} />
                <Route path="news" element={<News />} />
                <Route path="Q-A" element={<QuestionAndAns />} />
    
            </Route>

            {/* Admin router */}
            {/* <Route path="/" element={<LayoutAdmin></LayoutAdmin>}> */}
                {/* <Route path="managementhomepage" element={<AdminPosts></AdminPosts>} /> */}
            {/* </Route> */}


        </Routes>
    );
}

export default CustomRoute