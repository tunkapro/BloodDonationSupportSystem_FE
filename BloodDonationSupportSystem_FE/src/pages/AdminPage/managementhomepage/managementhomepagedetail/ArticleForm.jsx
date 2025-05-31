import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select,
  MenuItem, InputLabel, FormControl, Button, Box
} from '@mui/material';

export default function ArticleForm({ open, handleClose, article, onChange, onSave, types }) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{article?.article_id ? "Sửa bài viết" : "Thêm bài viết"}</DialogTitle>
      <DialogContent>
        <Box mt={2} display="flex" flexDirection="column" gap={2}>
          <TextField label="Tiêu đề" name="title" value={article.title} onChange={onChange} fullWidth />
          <TextField label="Nội dung" name="content" value={article.content} onChange={onChange} multiline rows={4} />
          <FormControl fullWidth>
            <InputLabel>Loại</InputLabel>
            <Select name="type_id" value={article.type_id} onChange={onChange}>
              {types.map((t) => (
                <MenuItem value={t.article_type_id} key={t.article_type_id}>{t.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Ảnh (URL)" name="picture" value={article.picture} onChange={onChange} fullWidth />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button variant="contained" onClick={onSave}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}
