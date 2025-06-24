import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Toolbar } from "@mui/material";
import axios from "../../../config/axios";

export default function AppointmentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const appointmentFromState = location.state?.appointment;

  const [appointment, setAppointment] = useState(appointmentFromState || null);
  const [loading, setLoading] = useState(!appointmentFromState);
  const [cancelDialog, setCancelDialog] = useState(false);
  const [canceling, setCanceling] = useState(false);

  console.log("Appointment Detail ID:", id);
  console.log("Appointment from state:", appointmentFromState);


  useEffect(() => {
    if (!appointmentFromState) {
      const fetchAppointment = async () => {
        try {
          const res = await axios.get(`/member/donation-info/${id}`);

          console.log("response: ", res.data);
          if (res.data?.data) {
            setAppointment(res.data.data);
          } else {
            setAppointment(null);
          }
        } catch (error) {
          console.error("Error fetching appointment:", error);
          setAppointment(null);
        } finally {
          setLoading(false);
        }
      };
      fetchAppointment();
    }
  }, [appointmentFromState, id]);

  const handleCancel = async () => {
    setCanceling(true);
    try {
      await axios.put(`/member/donation-info/cancel/${id}`);
      setAppointment(prev => ({ ...prev, status: 'HỦY' }));
      setCancelDialog(false);
      alert('Đã hủy đơn hiến máu thành công!');
    } catch (error) {
      console.error("Error canceling appointment:", error);
      alert('Có lỗi xảy ra khi hủy đơn. Vui lòng thử lại!');
    } finally {
      setCanceling(false);
    }
  };

  const canCancel = appointment?.status === "CHƯA HIẾN";

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

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
      <Toolbar />
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
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, bgcolor: "#fff" }}>
              <Typography fontWeight={600} mb={2} fontSize={16}>
                Thông tin hiến máu
              </Typography>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography color="text.secondary" fontSize={15}>
                  Thời gian:
                </Typography>
                <Typography fontWeight={500} fontSize={15}>
                  Từ {appointment.startTime} đến {appointment.endTime}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography color="text.secondary" fontSize={15}>
                  Cơ sở tiếp nhận máu:
                </Typography>
                <Typography fontWeight={500} fontSize={15}>
                  {appointment.addressHospital}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography color="text.secondary" fontSize={15}>
                  Lượng máu đã hiến:
                </Typography>
                <Typography fontWeight={500} fontSize={15}>
                  {appointment.volumeMl} ml
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary" fontSize={15}>
                  Ngày hiến máu:
                </Typography>
                <Typography fontWeight={500} fontSize={15}>
                  {new Date(appointment.donationDate).toLocaleDateString("vi-VN")}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box mt={4} display="flex" justifyContent="center" gap={2}>
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

          {canCancel && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => setCancelDialog(true)}
              sx={{ minWidth: 120 }}
            >
              Hủy đơn
            </Button>
          )}
        </Box>
      </Box>

      <Dialog open={cancelDialog} onClose={() => setCancelDialog(false)}>
        <DialogTitle>Xác nhận hủy đơn</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn hủy đơn hiến máu này không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialog(false)}>
            Không
          </Button>
          <Button 
            onClick={handleCancel} 
            color="error"
            disabled={canceling}
          >
            {canceling ? <CircularProgress size={20} /> : 'Có'}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}