import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Typography, Box, TextField, Button } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getBloodDonationSchedules } from "../../../api/bloodDonationSchedule";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BloodDonationSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [stats, setStats] = useState([]);
  const [inputCapacity, setInputCapacity] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
var count = 0;
  const filteredDays = Array.isArray(stats)
    ? stats.filter((day) => day.total >= inputCapacity)
    : [];

  const chartData = {
    labels: Array.isArray(stats) ? stats.map((day) => day.date) : [],
    datasets: [
      {
        label: "Số đơn đăng ký",
        data: Array.isArray(stats) ? stats.map((day) => day.total) : [],
        backgroundColor: "rgba(255,99,132,0.5)",
      },
    ],
  };

  useEffect(() => {
    axios
      .get("/api/staff/registration/stat-by-day")
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) setStats(data);
        else if (Array.isArray(data.data)) setStats(data.data);
        else setStats([]);
      })
      .catch((err) => {
        console.error(err);
        setStats([]);
      });

    const getBloodDonationScheduleList = async () => {
      try {
        const res = await getBloodDonationSchedules();
        if (Array.isArray(res.data)) {
          setSchedule(res.data);
        } else if (Array.isArray(res.data.data)) {
          setSchedule(res.data.data);
        } else {
          setSchedule([]);
        }
      } catch (err) {
        console.log(err);
        setSchedule([]);
      }
    };
    getBloodDonationScheduleList();
  }, []);

  return (
    <Box sx={{ margin: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Lịch Hiến Máu
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="blood schedule table">
          <TableHead sx={{ backgroundColor: "rgb(141, 193, 209)" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>STT</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Địa Chỉ</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Ngày Hoạt Động</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Thời Gian</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Số Lượng Đăng Ký</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tối Đa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>{count++}</TableCell>
                <TableCell>{item.addressHospital}</TableCell>
                <TableCell>{item.donationDate}</TableCell>
                <TableCell>{`Từ ${item.startTime} đến ${item.endTime}`}</TableCell>
                <TableCell>{item.registrationMatching}</TableCell>
                <TableCell>{item.amountRegistration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={5}>
        <Typography variant="h6" mb={2}>Biểu đồ thống kê số đơn đăng ký</Typography>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Bar data={chartData} />
        </Paper>

        <TextField
          label="Số người hiến mong muốn"
          type="number"
          value={inputCapacity}
          onChange={(e) => setInputCapacity(Number(e.target.value))}
          sx={{ mt: 3, mb: 2 }}
        />

        <Box>
          <Typography variant="subtitle1" fontWeight="bold">Ngày phù hợp:</Typography>
          <Box component="ul" sx={{ paddingLeft: 3 }}>
            {filteredDays.map((day) => (
              <li key={day.date} style={{ marginBottom: 8 }}>
                <Typography component="span">{day.date} - {day.total} đơn</Typography>
                <Button
                  onClick={() => setSelectedDate(day.date)}
                  size="small"
                  sx={{ ml: 2 }}
                  variant="outlined"
                >
                  Chọn ngày này
                </Button>
              </li>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
