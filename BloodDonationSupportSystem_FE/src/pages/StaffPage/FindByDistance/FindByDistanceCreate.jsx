import React, { useState } from "react";
import {
  Box,
  Slider,
  Button,
  Typography,
  FormHelperText,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { searchDonorsApi } from "../../../api/staffService";
import { useForm } from "react-hook-form";

const bloodTypes = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];
const vietnameseText = {
  columnMenuSortAsc: "Sắp xếp tăng dần",
  columnMenuSortDesc: "Sắp xếp giảm dần",
  columnMenuFilter: "Lọc",
  columnMenuHideColumn: "Ẩn cột",
  columnMenuManageColumns: "Quản lý cột",
  noRowsLabel: "Bắt đầu tìm kiếm - Tìm kiếm trên nhóm máu và khoảng cách",
  loadingOverlayLabel: "Đang tải...",
  toolbarColumns: "Cột",
  toolbarFilters: "Bộ lọc",
  toolbarExport: "Xuất",
};

const DistanceSearchWithDataGrid = () => {
  const [filters, setFilters] = useState({ distance: 10, bloodTypes: [] });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState("");

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    setCustomError("");

    if (filters.bloodTypes.length === 0) {
      setCustomError("Vui lòng chọn ít nhất một nhóm máu.");
      return;
    }

    setLoading(true);
    try {
      const response = await searchDonorsApi(filters);
      console.log("resp" + response);

      const dataWithIds = response.data.data.map((item, index) => ({
        id: index + 1,
        ...item,
      }));

      setResults(dataWithIds);
    } catch (error) {
      alert("Không thể tìm kiếm. Vui lòng thử lại sau." + error);
    } finally {
      setLoading(true);
    }
  };

  const columns = [
    {
      field: "donorName",
      headerName: "Họ tên",
      flex: 1,
      sortable:false,
      disableColumnMenu: true,
    },
    { field: "bloodType", headerName: "Nhóm máu", flex: 1,   sortable:false,
    disableColumnMenu: true, },
    { field: "lastDonationDate", headerName: "Lần hiến gần nhất", flex: 1,   sortable:false,
    disableColumnMenu: true, },
    { field: "phoneNumber", headerName: "Số điện thoại", flex: 1 ,   sortable:false,
    disableColumnMenu: true,},
  ];

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", background: "white" }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ border: "1px solid #ccc", borderRadius: 2, p: 3 }}
      >
        <Typography gutterBottom>Khoảng cách tìm kiếm (km)</Typography>
        <Slider
          value={filters.distance}
          onChange={(e, val) => setFilters({ ...filters, distance: val })}
          min={1}
          max={50}
          step={1}
          valueLabelDisplay="auto"
          marks={[
            { value: 1, label: "1km" },
            { value: 25, label: "25km" },
            { value: 50, label: "50km" },
          ]}
        />

        <Typography gutterBottom sx={{ mt: 1 }}>
          Nhóm máu cần tìm kiếm
        </Typography>
        <ToggleButtonGroup
          value={filters.bloodTypes}
          onChange={(e, newTypes) =>
            setFilters({ ...filters, bloodTypes: newTypes })
          }
          aria-label="blood types"
          color="white"
          sx={{ flexWrap: "no-wrap" }}
        >
          {bloodTypes.map((type) => (
            <ToggleButton
              key={type.value}
              value={type.value}
              sx={{
                m: 0.5,
                width: 100,
                height: 36,
                color: "black",

                backgroundColor: filters.bloodTypes.includes(type.value)
                  ? "#ccc"
                  : "white",
                "&.Mui-selected": {
                  color: "white",
                  backgroundColor: "#1976d3",
                },
                "&:hover": {
                  color: "white",
                  backgroundColor: "#1976d3",
                },
              }}
            >
              {type.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        {customError && (
          <FormHelperText sx={{ color: "red", ml: 1.5 }}>
            {customError}
          </FormHelperText>
        )}

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
          Tìm kiếm Ngay
        </Button>
      </Box>

      {loading && results.length == 0 && (
        <Typography sx={{ mt: 2 }}>
          Không tìm thấy người trong phạm vi.
        </Typography>
      )}
      {loading == true && results.length > 0 && (
        <Typography sx={{ mt: 2 }}>Kết quả {results.length}</Typography>
      )}

      {results.length > 0 && (
        <Box sx={{ mt: 1 }}>
          <div style={{ height: 630, width: "100%" }}>
            <DataGrid
              rows={results}
              columns={columns}
              localeText={vietnameseText}
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 10 } },
              }}
            />
          </div>
        </Box>
      )}
    </Box>
  );
};

export default DistanceSearchWithDataGrid;
