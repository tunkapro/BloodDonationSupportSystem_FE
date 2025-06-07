import { Typography } from '@mui/material';
import BloodDonateTabs from './BloodDonateTabs';

export default function BloodDonateHistory() {
  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 24 }}>
      <Typography
        sx={{ fontSize: 24, fontWeight: 'bold', marginBottom: 2 }}
      >
        Lịch sử hiến máu
      </Typography>
      <BloodDonateTabs />
    </div>
  );
}