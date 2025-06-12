import { Tabs, Tab, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from '../../../config/axios';
import BloodDonateList from './BloodDonateList';

const STATUS_LABELS = ['Đã hiến', 'Chưa hiến', 'Hủy'];

export default function BloodDonateTabs() {
  const [history, setHistory] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      axios
        .get('http://localhost:3001/BloodDonateHistory')
        .then((res) => setHistory(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, []);

  const getListByStatus = (status) =>
    history.filter(item => item.processStatus === status);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
      <Tabs value={tabIndex} onChange={(_, val) => setTabIndex(val)}>
        {STATUS_LABELS.map((status, i) => (
          <Tab key={i} label={`${status} (${getListByStatus(status).length})`} />
        ))}
      </Tabs>

      <Box mt={2}>
        {getListByStatus(STATUS_LABELS[tabIndex]).length === 0 ? (
          <Typography color="text.secondary">Chưa có lịch sử hiến máu nào.</Typography>
        ) : (
          <BloodDonateList list={getListByStatus(STATUS_LABELS[tabIndex])} />
        )}
      </Box>
    </Box>
  );
}
