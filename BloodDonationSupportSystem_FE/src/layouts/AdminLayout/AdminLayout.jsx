
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AdminNavBar from "./AdminNavBar";
import RequireAuth from "../../components/RequireAuth";

export default function AdminLayout() {
  return (
    <RequireAuth role={"ROLE_ADMIN"}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box
          sx={{
            flex: 1,
            bgcolor: "background.paper",
            borderRight: "1px solid #ddd",
            height: "100",
          }}
        >
          <AdminNavBar />
        </Box>

        <Box
          sx={{
            flex: 9,
            overflowX: "hidden",
            bgcolor: "background.default",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </RequireAuth>
  );
}
