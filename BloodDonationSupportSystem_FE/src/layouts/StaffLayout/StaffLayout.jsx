import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import StaffSidebar from "./StaffSidebar";
import RequireAuth from "../../components/RequireAuth";

const StaffLayout = () => {
  return (
    <RequireAuth role={"ROLE_STAFF"}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box
          sx={{
            flex: 2,
            bgcolor: "background.paper",
            borderRight: "1px solid #ddd",
            height: "100",
          }}
        >
          <StaffSidebar />
        </Box>

        {/* Nội dung chiếm 80% */}
        <Box
          sx={{
            flex: 8,
            overflowX: "hidden",
            bgcolor: "background.default",
          }}
        >
          <Outlet />
        </Box>

      </Box>
    </RequireAuth>
  );
};

export default StaffLayout;
