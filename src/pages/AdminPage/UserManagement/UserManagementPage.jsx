
import { Box, Typography } from "@mui/material";
import UserTable from "./UserTable"

const UserManagementPage = () => {
  return (
    <Box sx={{ padding: 3, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Quản lý tài khoản
      </Typography>
      <UserTable />
    </Box>
  );
};

export default UserManagementPage;