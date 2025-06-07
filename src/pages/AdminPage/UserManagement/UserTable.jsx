import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "../../../config/axios"

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Họ tên", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phoneNumber", headerName: "Số điện thoại", width: 150 },
  { field: "gender", headerName: "Giới tính", width: 100 },
  { field: "role", headerName: "Vai trò", width: 120 },
  { field: "address", headerName: "Địa chỉ", width: 200 },
  {
    field: "created_at",
    headerName: "Ngày tạo",
    width: 200,
    renderCell: (params) => {
      return params.row.created_at
        ? new Date(params.row.created_at).toLocaleString("vi-VN")
        : "—";
    },
  },
];

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => {
        console.log("Fetched users:", res.data);
        setUsers(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);



  const handleRoleChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const filteredUsers =
    roleFilter === "all"
      ? users
      : users.filter((user) => user.role === roleFilter);

  return (
    <Box>
      <FormControl sx={{ minWidth: 200, mb: 2 }}>
        <InputLabel id="role-filter-label">Loại tài khoản</InputLabel>
        <Select
          labelId="role-filter-label"
          value={roleFilter}
          label="Loại tài khoản"
          onChange={handleRoleChange}
        >
          <MenuItem value="all">Tất cả</MenuItem>
          <MenuItem value="member">Member</MenuItem>
          <MenuItem value="staff">Staff</MenuItem>
        </Select>
      </FormControl>

      <Paper sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableColumnMenu
        />
      </Paper>
    </Box>
  );
};

export default UserTable;
