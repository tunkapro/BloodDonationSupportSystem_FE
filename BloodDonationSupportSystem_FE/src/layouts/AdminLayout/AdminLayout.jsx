
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AdminNavBar from "./AdminNavBar";
import RequireAuth from "../../components/RequireAuth";
import AdminHeader from "./AdminHeader";
export default function AdminLayout() {
  const HEADER_HEIGHT = 72; // px, matches AdminHeader minHeight
const SIDEBAR_WIDTH = 280; // px, matches AdminNavBar width
  return (
    // <RequireAuth role={"ROLE_ADMIN"}>
<>
      {/* Fixed Header */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 1201 }}>
        <AdminHeader />
      </Box>
      {/* Fixed Sidebar */}
      <Box
        sx={{
          position: 'fixed',
          top: `${HEADER_HEIGHT}px`,
          left: 0,
          width: `${SIDEBAR_WIDTH}px`,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          bgcolor: '#f8fafc',
          borderRight: '1px solid #e2e8f0',
          zIndex: 1200,
        }}
      >
        <AdminNavBar />
      </Box>
      {/* Main Content */}
      <Box
        sx={{
          marginLeft: `${SIDEBAR_WIDTH}px`,
          marginTop: `${HEADER_HEIGHT}px`,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          overflow: 'auto',
          bgcolor: 'background.default',
        }}
      >
        <Outlet />
      </Box>
    </>

    // </RequireAuth>
  );
}
