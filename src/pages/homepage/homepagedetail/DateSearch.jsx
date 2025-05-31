import React from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const DateSearch = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        margin: 2,
        padding: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <CalendarMonthIcon />
      <Typography>Bạn đặt lịch vào thời điểm nào</Typography>
      <TextField type="date" size="medium" />
      <Button variant="contained" startIcon={<CalendarMonthIcon />}>
        Tìm kiếm
      </Button>
    </Paper>
  );
};

export default DateSearch;