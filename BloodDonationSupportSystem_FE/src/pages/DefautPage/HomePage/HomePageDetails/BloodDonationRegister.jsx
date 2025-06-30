import React, { useState } from "react";
import { Box, Button, Typography, Modal, Snackbar, Alert } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { registerDonation } from "../../../../api/donationRegistration";
import { useAuth } from "../../../../context/authContext";

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
      <Button variant="contained" color="error" onClick={handleOpen}>
        <Typography variant="h5">Đăng Ký Hiến Máu</Typography>
      </Button>

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
