import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Home from "../pages/DefautPage/HomePage/Home.component";
import Contact from "../pages/DefautPage/ContactPage/Contact";
import News from "../pages/DefautPage/NewsPage/News";
import NewsDetail from "../pages/DefautPage/NewsPage/NewsDetail";
import QuestionAndAnswer from "../pages/DefautPage/Q&APage/Q&APage";
import LoginPage from "../pages/DefautPage/LoginPage/LoginPage";
import ForgotPasswordPage from "../pages/DefautPage/ForgotPasswordPage/ForgotPassword";
import RegisterPage from "../pages/DefautPage/RegisterPage/RegisterPage";
import MemberLayout from "../layouts/MemberLayout/MemberLayout";
import AppointmentHistory from "../pages/MemberPage/BloodDonateHistoryPage/AppointmentHistory";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import StaffLayout from "../layouts/StaffLayout/StaffLayout";
import Overview from "../pages/StaffPage/Overview";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import BloodDonationScheduleList from "../pages/DefautPage/BloodDonationSchedulePage/BloodDonationScheduleList";
import BloodDonationScheduleComponent from "../pages/StaffPage/BloodDonationSchedulePage/BloodDonationSchedule.Component";
import AppointmentDetail from "../pages/MemberPage/BloodDonateHistoryPage/AppoitmentDetail";
import BloodDonorReport from "../pages/AdminPage/OverviewPage/BloodDonorReport";
import AdminPosts from "../pages/AdminPage/managementhomepage/AdminPosts";

import ProfilePage from "../pages/MemberPage/ProfilePage/ProfilePage";
import UserManagement from "../pages/AdminPage/UserManagement/UserManagement";
import BloodStoragePage from "../pages/StaffPage/BloodDonationInventory/BloodStoragePage";
import FindDistancePage from "../pages/StaffPage/FindByDistance/FindDistancePage";
import DonationRegistration from "../pages/MemberPage/DonationRegistration/DonationRegistration";
import BloodDonationRequestPage from "../pages/StaffPage/BloodDonationRequestPage/BloodDonationRequestPage";
import OverViewPage from "../pages/AdminPage/OverviewPage/OverViewPage";
import BloodDonateHistory from "../pages/MemberPage/BloodDonateHistoryPage/BloodDonateHistory";
import DonorHealthCheckPage from "../pages/StaffPage/ProcessManagement/DonorHealthCheckPage";
import DonorProcessPage from "../pages/StaffPage/ProcessManagement/DonorProcessPage";
import DonationManagement from "../pages/AdminPage/DonationManagement/DonationManagementPage";
import { Navigation } from "../pages/StaffPage/ProcessManagement/Navigation";
import ScheduleManagement from "../pages/AdminPage/ScheduleManagement/ScheduleManagementPage";
import Account from "../pages/AdminPage/Account";
import BloodDonationReport from "../pages/AdminPage/ReportPage/BloodDonationReport";
import BloodInventoryReport from "../pages/AdminPage/ReportPage/BloodInventoryReport";
import ProtectedRoute from "../routes/ProtectRoute";
import CertificatePage from "../pages/MemberPage/CertificatePage/CertificatePage";


const CustomRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="news" element={<News />} />
        <Route path="news/:id" element={<NewsDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="q-a" element={<QuestionAndAnswer />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="reset-password" element={<ForgotPasswordPage />} />
        <Route path="signup" element={<RegisterPage />} />
        <Route path="event" element={<BloodDonationScheduleList />} />

        <Route
          path="profile"
          element={
            <ProtectedRoute allowedRoles={["ROLE_MEMBER", "ROLE_ADMIN", "ROLE_STAFF"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/*"
          element={
            <ProtectedRoute allowedRoles={["ROLE_MEMBER"]}>
              <MemberLayout />
            </ProtectedRoute>
          }
        >
          <Route path="appointment-histories" element={<AppointmentHistory />} />
          <Route path="appointment-histories/:id" element={<AppointmentDetail />} />
          <Route path="blood-donation-register" element={<DonationRegistration />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="certificate" element={<CertificatePage/>}/>
          <Route path="donation-histories" element={<BloodDonateHistory />} />
        </Route>
      </Route>

      <Route
        path="registerDonationForm"
        element={
          <ProtectedRoute allowedRoles={["ROLE_MEMBER"]}>
            <DonationRegistration />
          </ProtectedRoute>
        }
      />

      <Route
        path="/staff/*"
        element={
          <ProtectedRoute allowedRoles={["ROLE_STAFF"]}>
            <StaffLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="overview" element={<Overview />} />
        <Route path="storage/blood-bag-list" element={<BloodStoragePage />} />
        <Route path="find-by-distance" element={<FindDistancePage />} />
        <Route path="blood-management/*" element={<Navigation />}>
          <Route path="health-check" element={<DonorHealthCheckPage />} />
          <Route path="" element={<DonorHealthCheckPage />} />
          <Route path="process" element={<DonorProcessPage />} />
        </Route>
        <Route path="donation-request" element={<BloodDonationRequestPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="blood-donation-schedule" element={<BloodDonationScheduleComponent />} />
      </Route>

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="overview" element={<OverViewPage />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route path="posts" element={<AdminPosts />} />
        <Route path="donation-management" element={<DonationManagement />} />
        <Route path="donation-calendar" element={<ScheduleManagement />} />
        <Route path="account" element={<Account />} />
        <Route path="donation-report" element={<BloodDonationReport />} />
        <Route path="blood-inventory-report" element={<BloodInventoryReport />} />
      </Route>

      {/* Error Route */}
      <Route path="/404" element={<ErrorPage />}></Route>
    </Routes>
  );
};

export default CustomRoute;
