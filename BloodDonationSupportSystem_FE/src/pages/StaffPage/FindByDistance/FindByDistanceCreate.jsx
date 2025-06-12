import React, { useState } from "react";
import {
  Box,
  TextField,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Grid } from "@mui/material";
const bloodTypes = [
  { value: "A_POSITIVE", label: "A+" },
  { value: "A_NEGATIVE", label: "A-" },
  { value: "B_POSITIVE", label: "B+" },
  { value: "B_NEGATIVE", label: "B-" },
  { value: "AB_POSITIVE", label: "AB+" },
  { value: "AB_NEGATIVE", label: "AB-" },
  { value: "O_POSITIVE", label: "O+" },
  { value: "O_NEGATIVE", label: "O-" },
];

const defaultFilters = {
  distance: 10,
  bloodTypes: [],
  availableNow: false,
};

const mockUsers = [ 
  {
    id: 1, fullname: "Nguyễn Văn Táo", bloodType: "A_POSITIVE", lastDonation: "3 tháng trước", phoneNumber: "0909199518",
  },
  {
    id: 2, fullname: "Nguyễn Văn Xoài", bloodType: "O_NEGATIVE", lastDonation: "1 tháng trước", phoneNumber: "0909199528",
  },
  {
    id: 3,fullname: "Nguyễn Văn Đào", bloodType: "AB_POSITIVE", lastDonation: "5 tháng trước", phoneNumber: "0909199538",
  },
  {
    id: 4, fullname: "Nguyễn Văn Mận", bloodType: "AB_POSITIVE", lastDonation: "2 tháng trước", phoneNumber: "0909199548",
  },
];

const FindByDistanceCreate = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState({
    bloodTypes: "",
    availableNow: "",
  });
  const handleSearch = () => {
    let hasError = false;
    const newErrors = { bloodTypes: "", availableNow: "" };
  
    if (filters.bloodTypes.length === 0) {
      newErrors.bloodTypes = "Vui lòng chọn ít nhất một nhóm máu.";
      hasError = true;
    }
  
    if (!filters.availableNow) {
      newErrors.availableNow = "Vui lòng chọn trạng thái sẵn sàng.";
      hasError = true;
    }
  
    setErrors(newErrors);
  
    // chỗ này dừng không search khi có lỗi
    if (hasError) return; 
  
    // Lọc dữ liệu khi không có lỗi:
    const filtered = mockUsers.filter(
      (user) => filters.bloodTypes.includes(user.bloodType)
    );
  
    setResults(filtered);
  };

  const handleChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleBloodTypeChange = (value) => {
    const currentTypes = filters.bloodTypes;
    const updatedTypes = currentTypes.includes(value)
      ? currentTypes.filter((type) => type !== value)
      : [...currentTypes, value];
    setFilters({ ...filters, bloodTypes: updatedTypes });
  };

  return (
    <Box sx={{ p: 4, maxWidth: "md", mx: "auto" }}>
      <Box sx={{ border: "1px solid black", p: 3 }}>
        <Typography sx={{ fontSize: "24px" }}>
          Tìm người hiến máu theo khoảng cách
        </Typography>
        
        <Typography gutterBottom sx={{ mt: "16px" }}>
          Số khoảng cách tìm kiếm(km)
        </Typography>
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

        <Typography gutterBottom>Nhóm máu</Typography>
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

        <Typography gutterBottom>Trạng thái</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.availableNow}
                onChange={(e) =>
                  handleChange({ ...filters, availableNow: e.target.checked })
                }
              />
            }
            label="Đang sẵn sàng"
          />
          {errors.availableNow && (
            <Typography variant="caption" color="error" sx={{ ml: 3 }}>
              {errors.availableNow}
            </Typography>
          )}
        </FormGroup>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ minWidth: "300px", height: 40 }}
          >
            Search
          </Button>
        </Box>
      </Box>
      <Box>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {results.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Stack direction="column" spacing={1}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={1}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          flexGrow: 1,
                        }}
                      >
                        {user.fullname}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "#FFC107",
                          color: "#000",
                          "&:hover": {
                            backgroundColor: "#FFA000",
                          },
                          minWidth: "auto",
                          padding: "4px 8px",
                        }}
                      >
                        Liên hệ
                      </Button>
                    </Stack>

                    <Typography variant="body2">
                      Nhóm máu:{" "}
                      {user.bloodType
                        .replace("_", " ")
                        .replace("POSITIVE", "+")
                        .replace("NEGATIVE", "-")}
                    </Typography>
                    <Typography variant="body2">
                      Lần gần nhất: {user.lastDonation}
                    </Typography>
                    <Typography variant="body2">
                      Số điện thoại: {user.phoneNumber}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FindByDistanceCreate;
