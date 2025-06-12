import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  Rating,
  Chip,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";


export default function AppointmentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
      const appointments =  [
  {
    id: 1,
    status: "Đã hẹn lịch",
    method: "Hiến máu",
    locationName: "466 Nguyễn Thị Minh Khai",
    workingTime: "7g đến 11g",
    address: "466 Nguyễn Thị Minh Khai Phường 02, Quận 3, Tp Hồ Chí Minh",
    volume: "-",
    date: "2025-07-02",
    timeRange: "07:00 đến 11:00",
  },
  // add more appointments
];
  // Lấy appointment 
  const appointment = appointments.find(
    (item) => String(item.id) === String(id)
  );

  if (!appointment) {
    return (
      <Box p={4} textAlign="center">
        <Typography color="error" variant="h6">
          Không tìm thấy lịch sử đặt hẹn!
        </Typography>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Quay về
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f6faff", minHeight: "100vh", py: 5 }}>
      <Box sx={{ maxWidth: 950, mx: "auto" }}>
        <Typography variant="h6" fontWeight={600} color="primary" mb={1}>
          Lịch sử đặt hẹn
        </Typography>
        <Box display="flex" alignItems="center" mb={3}>
          <Typography mr={1} fontSize={15}>
            Trạng thái:
          </Typography>
          <Chip
            label={appointment.status}
            color="warning"
            size="small"
            sx={{ fontWeight: 500, fontSize: 13 }}
          />
        </Box>
        <Grid container spacing={3}>
          {/* Thông tin hiến máu */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, bgcolor: "#fff" }}>
              <Typography fontWeight={600} mb={2} fontSize={16}>
                Thông tin hiến máu
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography color="text.secondary" fontSize={15}>
                  Hình thức hiến:
                </Typography>
                <Typography fontWeight={500} fontSize={15}>
                  {appointment.method}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography color="text.secondary" fontSize={15}>
                  Cơ sở tiếp nhận máu:
                </Typography>
                <Typography
                  fontWeight={500}
                  fontSize={15}
                  align="right"
                >
                  {appointment.locationName} (thời gian làm việc từ {appointment.workingTime})
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography color="text.secondary" fontSize={15}>
                  Địa chỉ:
                </Typography>
                <Typography
                  fontWeight={500}
                  fontSize={15}
                  align="right"
                >
                  {appointment.address}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography color="text.secondary" fontSize={15}>
                  Lượng máu đã hiến:
                </Typography>
                <Typography fontWeight={500} fontSize={15}>
                  {appointment.volume}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary" fontSize={15}>
                  Ngày hiến máu:
                </Typography>
                <Typography fontWeight={500} fontSize={15}>
                  {new Date(appointment.date).toLocaleDateString("vi-VN")}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          {/* Đánh giá hiến máu */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, bgcolor: "#fff" }}>
              <Typography fontWeight={600} mb={2} fontSize={16}>
                Đánh giá hiến máu
              </Typography>
              <Box display="flex" justifyContent="center" mb={2}>
                <Rating
                  value={rating}
                  onChange={(_, newValue) => setRating(newValue)}
                  size="large"
                />
              </Box>
              <TextField
                fullWidth
                multiline
                minRows={3}
                placeholder="Chia sẻ đánh giá của bạn (không bắt buộc)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={rating === 0}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: 15,
                  bgcolor: "#e3ecfa",
                  color: "#1976d2",
                  "&.Mui-disabled": {
                    bgcolor: "#e3ecfa",
                    color: "#b0b0b0",
                  },
                }}
              >
                Gửi đánh giá
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(-1)}
            sx={{
              minWidth: 120,
              fontSize: 15,
              borderColor: "#1976d2",
              color: "#1976d2",
              bgcolor: "#fff",
              "&:hover": {
                bgcolor: "#e3ecfa",
              },
            }}
          >
            Quay về
          </Button>
        </Box>
      </Box>
    </Box>
  );
}