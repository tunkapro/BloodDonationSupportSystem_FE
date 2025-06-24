import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Container,
  Chip,
  Stack,
  Avatar,
  Divider,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import {
  AccessTime,
  LocationOn,
  CalendarToday,
  Favorite,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toolbar } from "@mui/material";

import axios from '../../../config/axios';

export default function AppointmentHistory() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/member/donation-info')
      .then((res) => setAppointment(res.data.data))
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const pendingAppointments = appointment.filter(
    (item) => item.status === 'CHƯA HIẾN'
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <CircularProgress size={50} thickness={4} />
        <Typography variant="body2" color="text.secondary">
          Đang tải thông tin lịch hẹn...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: alpha(theme.palette.primary.main, 0.02),
        minHeight: '100vh',
        py: 4
      }}
    >
      <Toolbar />
      <Container maxWidth="lg">
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white',
            borderRadius: 3
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                width: 56,
                height: 56
              }}
            >
              <Favorite sx={{ fontSize: 32 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Lịch hẹn hiến máu
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Quản lý các lịch hẹn hiến máu chưa thực hiện
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Content */}
        <Box>
          {pendingAppointments.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 6,
                textAlign: 'center',
                borderRadius: 3,
                border: `2px dashed ${alpha(theme.palette.primary.main, 0.2)}`
              }}
            >
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 3
                }}
              >
                <CalendarToday sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              </Avatar>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Chưa có lịch hẹn nào
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bạn không có lịch hẹn hiến máu nào đang chờ thực hiện.
              </Typography>
            </Paper>
          ) : (
            <Stack spacing={3}>
              {/* Summary */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.success.main, 0.05),
                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                }}
              >
                <Typography variant="body2" color="success.main" fontWeight={600}>
                  Có {pendingAppointments.length} lịch hẹn đang chờ thực hiện
                </Typography>
              </Paper>

              {/* Appointment Cards */}
              {pendingAppointments.map((item, index) => (
                <Card
                  key={item.donationRegistrationId}
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[8],
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Stack spacing={3}>
                      {/* Header */}
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        flexWrap="wrap"
                        gap={2}
                      >
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar
                            sx={{
                              bgcolor: alpha(theme.palette.error.main, 0.1),
                              color: theme.palette.error.main,
                              width: 48,
                              height: 48
                            }}
                          >
                            <Favorite />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight={600} color="text.primary">
                              Lịch hẹn #{item.donationRegistrationId}
                            </Typography>
                            <Chip
                              label="Chưa hiến"
                              size="small"
                              color="warning"
                              variant="outlined"
                            />
                          </Box>
                        </Stack>

                        <Button
                          variant="contained"
                          endIcon={<ArrowForward />}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3
                          }}
                          onClick={() =>
                            navigate(`/appointment-histories/${item.donationRegistrationId}`, {
                              state: { appointment: item },
                            })
                          }
                        >
                          Xem chi tiết
                        </Button>
                      </Stack>

                      <Divider />

                      {/* Details */}
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <LocationOn sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                          <Typography variant="body1" fontWeight={500}>
                            {item.addressHospital}
                          </Typography>
                        </Stack>

                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          spacing={3}
                          divider={<Divider orientation="vertical" flexItem />}
                        >
                          <Stack direction="row" spacing={1} alignItems="center">
                            <CalendarToday sx={{ color: theme.palette.text.secondary, fontSize: 18 }} />
                            <Typography variant="body2" color="text.secondary">
                              <strong>Ngày:</strong> {new Date(item.donationDate).toLocaleDateString('vi-VN', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </Typography>
                          </Stack>

                          <Stack direction="row" spacing={1} alignItems="center">
                            <AccessTime sx={{ color: theme.palette.text.secondary, fontSize: 18 }} />
                            <Typography variant="body2" color="text.secondary">
                              <strong>Thời gian:</strong> {item.startTime?.slice(0, 5)} - {item.endTime?.slice(0, 5)}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Box>
      </Container >
    </Box >
  );
}
