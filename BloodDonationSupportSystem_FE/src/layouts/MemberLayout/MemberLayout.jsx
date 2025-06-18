import { Outlet } from "react-router-dom";
import { Toolbar } from "@mui/material";
import RequireAuth from "../../components/RequireAuth";

export default function MemberLayout() {


  return (
    <RequireAuth role={"ROLE_MEMBER"}>
      <Toolbar />
      <Outlet />
    </RequireAuth>
  );
}
