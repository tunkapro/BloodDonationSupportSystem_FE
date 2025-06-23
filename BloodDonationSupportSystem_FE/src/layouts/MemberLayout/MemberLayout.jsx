import { Outlet } from "react-router-dom";
import { Toolbar } from "@mui/material";
import RequireAuth from "../../components/RequireAuth";

export default function MemberLayout() {


//   const { user } = useAuth();
//   if (!user) return <Navigate to="/"/>
//   if (user.role !== "ROLE_MEMBER") return <Navigate to="/404" />


  return (
    <RequireAuth role={"ROLE_MEMBER"}>
      <Toolbar />
      <Outlet />
    </RequireAuth>
  );
}
