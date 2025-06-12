import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const bloodData = [
  { bloodType: "O+", quantity: 120 },
  { bloodType: "O−", quantity: 90 },
  { bloodType: "A+", quantity: 65 },
  { bloodType: "A−", quantity: 60 },
  { bloodType: "B+", quantity: 100 },
  { bloodType: "B−", quantity: 50 },
  { bloodType: "AB+", quantity: 70 },
  { bloodType: "AB−", quantity: 30 },
];


const valueFormatter = (numberBloodBag) => `${numberBloodBag} túi`;

const chartSetting = {
  xAxis: [
    {
      label: "Số lượng túi máu",
      tickMinStep: 10,
    },
  ],
  height: 400,
};
//BarChat lặp qua dataset = BloodData làm cho ham valueFormat nay,yAxis có các quantity,bloodtype truyền vào định lại dc các quantity từng loại
export default function BloodStorageChart() {
    const navigate = useNavigate();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Kho máu</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={()=> navigate('/staff/storage/dashboard', { state: { shouldReload: true }})}>
            Tổng quan
          </Button>
          <Button color="inherit" onClick={()=>navigate("/staff/storage/blood-bag-list", { state: { shouldReload: true }})}>Danh mục máu</Button>
          <Button color="inherit" onClick={()=>navigate('/staff/storage/create')}>
            Tạo túi máu
          </Button>
          <Button color="inherit">Xuất bịch máu</Button>
        </Toolbar>
      </AppBar>
      <Typography sx={{ml:2,mt:3,fontSize:24}}>Bảng tổng quan số lượng túi máu</Typography>
      <BarChart
        dataset={bloodData}
        yAxis={[{ scaleType: "band", dataKey: "bloodType" }]}
        series={[
          { dataKey: "quantity", label: "Số lượng máu", valueFormatter },
        ]}
        layout="horizontal"
        {...chartSetting}
      />
    </Box>
  );
}
