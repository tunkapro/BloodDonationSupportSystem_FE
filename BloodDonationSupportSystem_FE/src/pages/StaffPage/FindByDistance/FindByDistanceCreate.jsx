import React, { useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
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

const defaultFilters = {
  distance: 10,
  bloodTypes: [],
};

const FindByDistanceCreate = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState({ bloodTypes: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleBloodTypeChange = (value) => {
    const updatedTypes = filters.bloodTypes.includes(value)
      ? filters.bloodTypes.filter((type) => type !== value)
      : [...filters.bloodTypes, value];
    setFilters({ ...filters, bloodTypes: updatedTypes });
  };

  const handleSearch = async () => {
    let hasError = false;
    const newErrors = { bloodTypes: "" };

    if (filters.bloodTypes.length === 0) {
      newErrors.bloodTypes = "Vui lòng chọn ít nhất một nhóm máu.";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    setLoading(true);
    try {
      const response = await axios.post("/api/donors/search", {
        distance: filters.distance,
        bloodTypes: filters.bloodTypes,
      });

      // Gán id tự động cho DataGrid
      const dataWithIds = response.data.map((item, index) => ({
        id: index + 1,
        ...item,
      }));

      setResults(dataWithIds);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Không thể tìm kiếm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: "fullname", headerName: "Họ tên", flex: 1 },
    { field: "lastDonation", headerName: "Lần gần nhất", flex: 1 },
    { field: "bloodType", headerName: "Nhóm máu", flex: 1 },
    { field: "phoneNumber", headerName: "Số điện thoại", flex: 1 },
  ];

  return (
    <Box sx={{ p: 2, mx: "auto" }}>
      <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}>
        <Typography gutterBottom>Khoảng cách tìm kiếm (km)</Typography>
        <Slider
          value={filters.distance}
          onChange={(e, newVal) =>
            handleChange({ ...filters, distance: newVal })
          }
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
        {errors.bloodTypes && (
          <FormHelperText sx={{ color: "red", ml: 2 }}>
            {errors.bloodTypes}
          </FormHelperText>
        )}

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={loading}
            sx={{ minWidth: 300 }}
          >
            {loading ? "Đang tìm..." : "Tìm kiếm"}
          </Button>
        </Box>
      </Box>

      {results.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Kết quả tìm thấy: {results.length} người
          </Typography>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              columns={columns}
              rows={results}
              pageSizeOptions={[5]}
              initialState={{
                pagination: { paginationModel: { pageSize: 8 } },
              }}
            />
          </div>
        </Box>
      )}
    </Box>
  );
};

export default FindByDistanceCreate;
