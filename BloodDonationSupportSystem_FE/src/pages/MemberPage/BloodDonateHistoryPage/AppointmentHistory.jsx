import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AppointmentHistory() {
  const navigate = useNavigate();
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
  return (
    <Box p={2} sx={{ bgcolor: "gray.100", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <Box sx={{ maxWidth: 1400, mx: "auto", bgcolor: "white", boxShadow: 3, borderRadius: 2, p: 3 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Lịch sử đặt hẹn
        </Typography>
        <Grid container spacing={3}>
          {appointments.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 2,
                  background: "#f0f6ff",
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  {/* Icon */}
                  <Box sx={{ fontSize: 48, color: "#e53e3e", minWidth: 60 }}>❤️</Box>
                  {/* Info */}
                  <Box sx={{ display: 'flex', flex: 1, gap: 6 }}>
                    <Typography variant="subtitle1" fontWeight={600} color="primary" sx={{ minWidth: 320 }}>
                      {item.locationName} <br />
                      <span style={{ fontWeight: 400, color: "#666" }}>
                        (thời gian làm việc từ {item.workingTime})
                      </span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 400, alignSelf: "center" }}>
                      📍 {item.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 260, alignSelf: "center" }}>
                      ⏰ {item.timeRange} - {new Date(item.date).toLocaleDateString("vi-VN")}
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{ alignSelf: "center", minWidth: 100, fontSize: 13, py: 0.5, px: 1.5 }}
                        onClick={() => navigate(`/user/appointment-histories/${item.id}`)}
                    >
                      Xem chi tiết
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}