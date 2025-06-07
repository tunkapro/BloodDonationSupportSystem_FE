import { Stack } from '@mui/material';
import BloodDonateItem from './BloodDonateItem';

export default function BloodDonateList({ list }) {
  return (
    <Stack spacing={2}>
      {list.map((item) => (
        <BloodDonateItem key={item.donationHistoryId} donation={item} />
      ))}
    </Stack>
  );
}
