import { Avatar, Box, Typography, Stack, Chip } from '@mui/material';
import {
    Bloodtype,
    CheckCircle,
    ErrorOutline,
    HourglassEmpty,
} from '@mui/icons-material';

const getColor = (status) => {
    switch (status) {
        case 'Đã hiến': return 'success';
        case 'Chưa hiến': return 'warning';
        case 'Hủy': return 'error';
        default: return 'default';
    }
};

const getStatusIcon = (status) => {
    switch (status) {
        case 'Đã hiến':
            return <CheckCircle fontSize="large" />;
        case 'Chưa hiến':
            return <HourglassEmpty fontSize="large" />;
        case 'Hủy':
            return <ErrorOutline fontSize="large" />;
        default:
            return <Bloodtype fontSize="large" />;
    }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Đã hiến':
      return '#4caf50';
    case 'Chưa hiến':
      return '#ff9800';
    case 'Hủy':
      return '#f44336';
    default:
      return '#9e9e9e';
  }
};

export default function BloodDonateItem({ donation }) {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid #eee"
            py={1.5}
        >
            <Box display="flex" alignItems="center">
                <Avatar sx={{ mr: 2, bgcolor: getStatusColor(donation.processStatus) }}>
                    {getStatusIcon(donation.processStatus)}
                </Avatar>
                <Box>
                    <Typography fontWeight="bold">
                        {new Date(donation.donationDate).toLocaleDateString('vi-VN')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Địa điểm: {donation.location || 'Chưa cập nhật'}
                    </Typography>
                </Box>
            </Box>

            <Stack direction="row" spacing={1}>
                <Chip label={donation.processStatus} color={getColor(donation.processStatus)} />
            </Stack>
        </Box>
    );
}