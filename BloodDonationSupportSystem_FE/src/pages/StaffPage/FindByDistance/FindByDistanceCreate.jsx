import React, { useState } from "react";
import {
  Box,
  TextField,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  FormHelperText,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
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

const DistanceSearchWithDataGrid = () => {

  const [filters, setFilters] = useState({ distance: 10, bloodTypes: [] });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState("");
const mockData = [
      {
        id: 1,
        fullname: "Nguyễn Văn A",
        bloodType: "A+",
        lastDonation: "2024-12-01",
        phoneNumber: "0912345678",
      },
      {
        id: 2,
        fullname: "Trần Thị B",
        bloodType: "O-",
        lastDonation: "2025-02-15",
        phoneNumber: "0987654321",
      },
      {
        id: 3,
        fullname: "Lê Văn C",
        bloodType: "B+",
        lastDonation: "2025-05-10",
        phoneNumber: "0901122334",
      },
    ];
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleBloodTypeChange = (value) => {
    const updated = filters.bloodTypes.includes(value)
      ? filters.bloodTypes.filter((t) => t !== value)
      : [...filters.bloodTypes, value];
    setFilters({ ...filters, bloodTypes: updated });
  };

  const onSubmit = async () => {
    setCustomError("");

    if (filters.bloodTypes.length === 0) {
      setCustomError("Vui lòng chọn ít nhất một nhóm máu.");
      return;
    }

    setLoading(true);
    try {
     
      const response = await axios.post("http://localhost:8090/api/staff/donors-search", filters);

    
      const dataWithIds = response.data.map((item, index) => ({
        id: index + 1,
        ...item,
      }));

      setResults(dataWithIds);
    } catch (error) {
      alert("Không thể tìm kiếm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: "fullname", headerName: "Họ tên", flex: 1 },
    { field: "bloodType", headerName: "Nhóm máu", flex: 1 },
    { field: "lastDonation", headerName: "Lần hiến gần nhất", flex: 1 },
    { field: "phoneNumber", headerName: "Số điện thoại", flex: 1 },
  ];

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2 }}
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

        <Typography gutterBottom sx={{ mt: 2 }}>
          Nhóm máu
        </Typography>
        <FormGroup row>
          {bloodTypes.map((type) => (
            <FormControlLabel
              key={type.value}
              control={
                <Checkbox
                  checked={filters.bloodTypes.includes(type.value)}
                  onChange={() => handleBloodTypeChange(type.value)}
                />
              }
              label={type.label}
            />
          ))}
        </FormGroup>
        {customError && (
          <FormHelperText sx={{ color: "red", ml: 1.5 }}>
            {customError}
          </FormHelperText>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? "Đang tìm..." : "Tìm kiếm"}
        </Button>
      </Box>

     
      {results.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Kết quả: {results.length} người
          </Typography>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={results}
              columns={columns}
              pageSizeOptions={[5]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
            />
          </div>
        </Box>
      )}
    </Box>
  );
};

export default DistanceSearchWithDataGrid;
