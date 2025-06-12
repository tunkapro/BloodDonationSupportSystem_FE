import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "../../../config/axios";

const STATUS_OPTIONS = ["HOẠT ĐỘNG", "BỊ CẤM", "VÔ HIỆU HÓA"];

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("http://localhost:3001/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleRoleChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await axios.patch(`http://localhost:3001/users/${userId}`, { status: newStatus });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };


  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Họ tên", width: 150 },
    { field: "phoneNumber", headerName: "Số điện thoại", width: 150 },
    { field: "gender", headerName: "Giới tính", width: 100 },
    { field: "role", headerName: "Vai trò", width: 120 },
    { field: "address", headerName: "Địa chỉ", width: 300 },
    { field: "bloodType", headerName: "Nhóm máu", width: 120 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 180,
      renderCell: (params) => {
        const { id, status } = params.row;

        return (
          <Select
            value={STATUS_OPTIONS.includes(status) ? status : ""}
            onChange={(e) => handleStatusChange(id, e.target.value)}
            variant="standard"
            fullWidth
          >
            {STATUS_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
  ];

  const removeVietnameseTones = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  const filteredUsers = users.filter((user) => {
    const matchRole = roleFilter === "all" || user.role === roleFilter;
    const name = removeVietnameseTones(user.name || "");
    const phone = user.phoneNumber || "";
    const keyword = removeVietnameseTones(searchText);

    const matchSearch =
      name.includes(keyword) || phone.includes(searchText);
    return matchRole && matchSearch;
  });


  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
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

        <TextField
          label="Tìm kiếm theo tên hoặc SĐT"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ width: 500 }}
        />
      </Box>

      <Paper sx={{ width: "100%", overflowX: "auto" }}>
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
