import * as React from 'react';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PieAnimation({ donationStatus }) {
  const donationStatusData = [
    { label: 'Đã hiến', value: donationStatus?.daHien || 0 },
    { label: 'Chưa hiến', value: donationStatus?.chuaHien || 0 },
    { label: 'Bị Hủy', value: donationStatus?.biHuy || 0 },
  ];

  const valueFormatter = (item) => `${item.value}%`;

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <PieChart
        height={300}
        width={300}
        series={[
          {
            data: donationStatusData,
            innerRadius: 50,
            arcLabel: (params) => params.label ?? '',
            arcLabelMinAngle: 20,
            valueFormatter,
          },
        ]}
      />
    </Box>
  );
}