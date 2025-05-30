import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Home from "../pages/homepage/Home";
import Contact from "../pages/DefautPage/DefaultDetails/Contact";
import News from "../pages/DefautPage/DefaultDetails/News";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPassword";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import StaffLayout from "../layouts/StaffLayout/StaffLayout";
import Overview from "../pages/staff/Overview";
import BloodStorageTable from "../components/staff/BloodStorageTable";
import MemberLayout from "../layouts/MemberLayout/MemberLayout";
import LoginPage from "../pages/DefautPage/DefaultDetails/login/LoginPage";
import QuestionPage from "../pages/DefautPage/DefaultDetails/question/QuestionPage";

const CustomRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<News />} />
        <Route path="/Q-A" element={<QuestionAndAns />} />

        <Route path="/login" element={<LoginPageV2 />} />
        <Route path="/reset-password" element={<ForgotPasswordPage />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Route>
      <Route path="/user/*" element={<MemberLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="news" element={<News />} />
        <Route path="Q-A" element={<QuestionAndAns />} />
      </Route>




      <Route path="/staff/*" element={<StaffLayout />}>
        {/* Các route staff khác */}
        <Route index element={<Overview />} />
        <Route path="overview" element={<Overview />}/>
        <Route path="storage" element={<BloodStorageTable/>} />
      </Route>
    </Routes>
  );
};

export default CustomRoute;
