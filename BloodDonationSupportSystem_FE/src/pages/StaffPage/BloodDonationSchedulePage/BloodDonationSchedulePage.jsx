import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { Typography, Box } from "@mui/material";


export default function BloodDonationSchedule() {
    const [schedule, setSchedule] = useState([]);
    useEffect(() => {
        const getBloodDonationScheduleList = async () => {
            try {
                const res = await axios.get('http://localhost:3001/BloodSchedule');

                if (res.data) {
                    setSchedule(res.data);
                    console.log(res.data);
                }
            } catch (err) {

            }
        }
        getBloodDonationScheduleList()
    }, [])
    return (
        <Box margin={'20px'}>
            <Typography variant="h4" textAlign={'center'} padding={'10px'}>Lịch Hiến Máu</Typography>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650, margin: 'auto' }} aria-label="simple table">
                    <TableHead sx={{backgroundColor : 'rgb(141, 193, 209)', fontWeight: 'bold'}}>
                        <TableRow >
                            <TableCell sx={{fontWeight: 'bold'}}>Tiêu Đề</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Địa Chỉ</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Ngày Hoạt Động</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Thời Gian</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Số Lượng Đăng Ký</TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}>Tối Đa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {schedule.map((item) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.title}
                                </TableCell>
                                <TableCell >{item.address}</TableCell>
                                <TableCell >{item.operatingDate}</TableCell>
                                <TableCell >{"Từ " + item.startTime + " Đến " + item.endTime}</TableCell>
                                <TableCell >{item.numberRegister}</TableCell>
                                <TableCell >{item.capcity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}