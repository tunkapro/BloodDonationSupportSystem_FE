import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";

export default function AriticleForm ({editArticle, types, open, onCancel, onSave}) {
  const [formData, setFormData] = useState({
    article_id: '',
    title: '',
    type_id: '',
    status: '',
    picture: ''
  });

  useEffect(() => {
    if (editArticle) {
      setFormData(editArticle);
    } else {
      setFormData({
        article_id: '',
        title: '',
        type_id: '',
        status: '',
        picture: ''
      });
    }


  }, [editArticle])

  const handleChange = (e) => {
    const {name, value} = e.taget;
    setFormData(pre => ({...pre, [name]: value}))
  };

  const handleSubmit = () => {
    onSave(formData);
  };







  return (
    
          <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{article ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}</DialogTitle>

      <DialogContent dividers>
        <TextField
          fullWidth
          margin="normal"
          name="title"
          label="Tiêu đề"
          value={formData.title}
          onChange={handleChange}
        />

        <TextField
          select
          fullWidth
          margin="normal"
          name="type_id"
          label="Loại bài viết"
          value={formData.type_id}
          onChange={handleChange}
        >
          {types.map(type => (
            <MenuItem key={type.article_type_id} value={type.article_type_id}>
              {type.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          margin="normal"
          name="status"
          label="Trạng thái"
          value={formData.status}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          name="picture"
          label="URL ảnh"
          value={formData.picture}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>Hủy</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>


    


  );



}