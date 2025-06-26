import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Edit, XCircle } from 'lucide-react';


export default function DonorTableHealthCheck({ donors, onEditDonor, onCancelDonor }) {
  console.log(donors);
  return (
    <Card>
      <CardHeader
        title={<Typography variant="h6">Danh sách sàng lọc sức khỏe</Typography>}
      />
      <CardContent sx={{ p: 0 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Họ tên</TableCell>
                <TableCell>Ngày ĐK</TableCell>
                <TableCell>Mức độ</TableCell>
                <TableCell>Trạng thái đơn ĐK</TableCell>
                <TableCell>Trạng thái sức khỏe</TableCell>
                <TableCell>Chiều cao</TableCell>
                <TableCell>Cân nặng</TableCell>
                <TableCell>Nhóm máu</TableCell>
                <TableCell>Thao tác</TableCell>
                <TableCell>Hủy đơn</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donors.map((donor) => (
                <TableRow key={donor.donationRegistrationId} hover>

                  <TableCell>
                    <Typography fontWeight="medium">{donor.donorFullName}</Typography>
                  </TableCell>

                  <TableCell>{new Date(donor.registrationDate).toLocaleDateString('vi-VN')}</TableCell>

                  <TableCell>
                    <Chip
                      label={donor.donationEmergencyId ? 'KHẨN CẤP' : 'THÔNG THƯỜNG'}
                      color={donor.donationEmergencyId ? 'error' : 'info'}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={donor.registrationStatus}
                      color={'warning'}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={donor.healthCheckStatus}
                      color={'warning'}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>

                  <TableCell>{donor.height || '—'}</TableCell>

                  <TableCell>{donor.weight || '—'}</TableCell>

                  <TableCell>{donor.bloodType || '—'}</TableCell>

                  <TableCell>
                    <Tooltip title="Cập nhật">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onEditDonor(donor)}
                      >
                        <Edit size={18} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>

                  <TableCell>
                    <Tooltip title="Hủy đơn">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onCancelDonor(donor)}
                        disabled={donor.registrationStatus === 'HUỶ'}
                      >
                        <XCircle size={18} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
