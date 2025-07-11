import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
} from "@mui/material";

export default function ScheduleTable({ schedule }) {
  return (
    <Box mt={6}>
      <Typography variant="h5" mb={2} fontWeight="bold">
        Danh sách lịch hiến máu đã tạo
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#90caf9" }}>
            <TableRow>
              <TableCell><strong>STT</strong></TableCell>
              <TableCell><strong>Địa chỉ</strong></TableCell>
              <TableCell><strong>Ngày</strong></TableCell>
              <TableCell><strong>Thời gian</strong></TableCell>
              <TableCell><strong>Đơn đã gán</strong></TableCell>
              <TableCell><strong>Giới hạn</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((item, index) => (
              <TableRow key={item.bloodDonationScheduleId || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.addressHospital}</TableCell>
                <TableCell>{new Date(item.donationDate).toLocaleDateString("vi-VN")}</TableCell>
                <TableCell>{`Từ ${item.startTime} đến ${item.endTime}`}</TableCell>
                <TableCell>{item.registrationMatching}</TableCell>
                <TableCell>{item.amountRegistration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
