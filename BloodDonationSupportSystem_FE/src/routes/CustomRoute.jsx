import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Home from "../pages/homepage/Home";
import Contact from "../pages/DefautPage/DefaultDetails/Contact";
import News from "../pages/DefautPage/DefaultDetails/News";


import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPassword";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import MemberLayout from "../layouts/MemberLayout/MemberLayout";
import LoginPage from "../pages/DefautPage/DefaultDetails/login/LoginPage";
import QuestionPage from "../pages/DefautPage/DefaultDetails/question/QuestionPage";

const CustomRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/news" element={<News />} />
                <Route path="/FAQ" element={<QuestionPage />} />

                <Route path="/login" element={<LoginPage/>} />
                <Route path="/reset-password" element={<ForgotPasswordPage/>} />
                <Route path="/signup" element={<RegisterPage/>} />
            </Route>
            <Route path="/user/*" element={<MemberLayout />}>
                <Route path="home" element={<Home />} />
                <Route path="contact" element={<Contact />} />
                <Route path="news" element={<News />} />
                <Route path="Q-A" element={<QuestionPage />} />
    
            </Route>
        </Routes>
    );
}

export default CustomRoute