import React, { useState } from "react";
import { Box, Button, Typography, Modal, Snackbar, Alert,Grid, Paper } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { registerDonation } from "../../../../api/donationRegistration";
import { useAuth } from "../../../../context/authContext";
import GroupsIcon from '@mui/icons-material/Groups';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocationOnIcon from '@mui/icons-material/LocationOn';

dayjs.extend(customParseFormat);

export default function BloodDonationModal() {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const { user } = useAuth(); 

  const today = dayjs();
  const maxDate = today.add(90, "day");
  const DATE_FORMAT = "DD/MM/YYYY";

  const handleOpen = () => {
    setStartDate(null);
    setEndDate(null);
    setError("");
    if (!user) {
      setSnackbar({
        open: true,
        message: "Vui lòng đăng nhập để đăng ký hiến máu.",
        severity: "warning",
      });
      return;
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {  
    if (!startDate || !endDate) {
      setError("Vui lòng chọn cả hai ngày.");
      return;
    }

    if (startDate.isAfter(endDate)) {
      setError("Ngày bắt đầu phải trước hoặc bằng ngày kết thúc.");
      return;
    }

    if (
      startDate.isBefore(today, "day") ||
      startDate.isAfter(maxDate, "day") ||
      endDate.isBefore(today, "day") ||
      endDate.isAfter(maxDate, "day")
    ) {
      setError(
        `Ngày phải nằm trong khoảng từ hôm nay đến ${maxDate.format(DATE_FORMAT)}.`
      );
      return;
    }

    setError("");

    const data = {
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      status: "CHƯA HIẾN",
      donorId: user.id,
    };
    try {
      const res = await registerDonation(data);
      if (res.success) {
        setOpen(false);
        setSnackbar({
          open: true,
          message: "Đăng ký hiến máu thành công!",
          severity: "success",
        });
      } else {
        console.log(res.message);
        if (res.message === "You have donated within the last 90 days. Please wait a little longer !!!") {
          setError("Bạn đã hiến máu trong vòng 90 ngày gần nhất. Vui lòng chờ để sức khỏe bình phục!");
          return;
        } else if (res.message === "You already have a pending registration!") {
          setError("Bạn đã đăng kí. Đơn bạn đang được chờ!!!");
          return;
        }
        setError(res.message || "Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      setError("Lỗi hệ thống. Vui lòng thử lại sau.");
    }
  };

  return (
  
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ background: '#FFF5F5', py: 6, px: { xs: 2, md: 8 }, display: 'flex', justifyContent: 'center' }}>
   
            <Box>
              <Typography variant="overline" color="error" fontWeight="bold" sx={{ background: '#FFE5E5', px: 2, py: 0.5, borderRadius: 2 }}>
                Cứu sống là niềm vui
              </Typography>
              <Typography variant="h2" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
                Hiến Máu <span style={{ color: '#E53935' }}>Cứu Người</span>
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Mỗi giọt máu bạn hiến tặng có thể cứu sống 3 người. Hãy cùng chúng tôi lan tỏa yêu thương và chia sẻ sự sống.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  sx={{ borderRadius: 2, fontWeight: 'bold', px: 4 }}
                  onClick={handleOpen}
                  startIcon={<FavoriteIcon/>}
                >
                  Đăng Ký Hiến Máu
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="large"
                  sx={{ borderRadius: 2, fontWeight: 'bold', px: 4 }}
                >
                  Tìm Hiểu Thêm
                </Button>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Paper elevation={0} sx={{ background: 'transparent', textAlign: 'center', p: 1 }}>
                    <Box sx={{ mx: 'auto', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFE5E5', color: '#E53935', mb: 1 }}>
                      <GroupsIcon sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography variant="h5" fontWeight="bold">50,000+</Typography>
                    <Typography variant="body2" color="text.secondary">Người hiến máu</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper elevation={0} sx={{ background: 'transparent', textAlign: 'center', p: 1 }}>
                    <Box sx={{ mx: 'auto', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFE5E5', color: '#E53935', mb: 1 }}>
                      <FavoriteIcon sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography variant="h5" fontWeight="bold">120,000+</Typography>
                    <Typography variant="body2" color="text.secondary">Đơn vị máu</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper elevation={0} sx={{ background: 'transparent', textAlign: 'center', p: 1 }}>
                    <Box sx={{ mx: 'auto', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFE5E5', color: '#E53935', mb: 1 }}>
                      <EmojiEventsIcon sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography variant="h5" fontWeight="bold">15+</Typography>
                    <Typography variant="body2" color="text.secondary">Năm kinh nghiệm</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper elevation={0} sx={{ background: 'transparent', textAlign: 'center', p: 1 }}>
                    <Box sx={{ mx: 'auto', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFE5E5', color: '#E53935', mb: 1 }}>
                      <LocationOnIcon sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography variant="h5" fontWeight="bold">25+</Typography>
                    <Typography variant="body2" color="text.secondary">Điểm hiến máu</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            mb={2}
            display="flex"
            justifyContent="center"
          >
            Đăng ký thời gian hiến máu mong muốn
          </Typography>

          <DatePicker
            label="Ngày bắt đầu"
            value={startDate}
            onChange={(newDate) => setStartDate(newDate)}
            format={DATE_FORMAT}
            minDate={today}
            maxDate={maxDate}
            slotProps={{
              textField: { fullWidth: true, margin: "normal" },
            }}
          />

          <DatePicker
            label="Ngày kết thúc"
            value={endDate}
            onChange={(newDate) => setEndDate(newDate)}
            format={DATE_FORMAT}
            minDate={today}
            maxDate={maxDate}
            slotProps={{
              textField: { fullWidth: true, margin: "normal" },
            }}
          />

          {error && (
            <Typography color="error" mt={1} display="flex" justifyContent="center" textAlign="center">
              {error}
            </Typography>
          )}

          <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={handleClose}>Hủy</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Xác nhận đăng ký
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
}
