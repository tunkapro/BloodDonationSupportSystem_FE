import { Box, Button, TextField } from '@mui/material';

export default function ArticleToolbar({ onAdd }) {
  return (
    <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
      <TextField placeholder="Tìm kiếm..." />
      <Button variant="contained" onClick={onAdd}>Thêm bài viết</Button>
    </Box>
  );
}
