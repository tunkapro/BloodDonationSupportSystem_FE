import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Home from "../pages/homepage/Home";
import Contact from "../pages/DefautPage/DefaultDetails/Contact";
import News from "../pages/DefautPage/DefaultDetails/News";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPassword";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import MemberLayout from "../layouts/MemberLayout/MemberLayout";
import LoginPageV2 from "../pages/DefautPage/DefaultDetails/login/LoginPage";
import Overview from "../pages/staff/Overview";
import BloodStorageTable from "../components/staff/BloodStorageTable";
import UserProfile from "../pages/user/UserPage";
import QuestionAndAns from "../pages/DefautPage/DefaultDetails/question/QuestionPage";
import StaffLayout from "../layouts/StaffLayout/StaffLayout";

const UserProfileWrapper = () => {
    const { userId } = useParams();
    return <UserProfile userId={userId} />;
};

const CustomRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="Home" element={<Home />} />
                <Route path="contact" element={<Contact />} />
                <Route path="news" element={<News />} />
                <Route path="Q-A" element={<QuestionAndAns />} />

                <Route path="login" element={<LoginPageV2 />} />
                <Route path="reset-password" element={<ForgotPasswordPage />} />
                <Route path="signup" element={<RegisterPage />} />
            </Route>
            <Route path="/user/*" element={<MemberLayout />}>
                <Route index element={<UserProfile />} />
                <Route path="home" element={<Home />} />
                <Route path="contact" element={<Contact />} />
                <Route path="news" element={<News />} />
                <Route path="Q-A" element={<QuestionAndAns />} />
                <Route path="profile/:phone" element={<UserProfileWrapper />} />
            </Route>
            <Route path="/staff/*" element={<StaffLayout />}>
                {/* Các route staff khác */}
                <Route index element={<Overview />} />
                <Route path="overview" element={<Overview />} />
                <Route path="storage" element={<BloodStorageTable />} />
            </Route>
        </Routes>
    );
};

export default CustomRoute;
