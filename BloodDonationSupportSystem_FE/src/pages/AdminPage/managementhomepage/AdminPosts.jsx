import { useEffect, useState } from "react";
import { Container, Typography, Divider, Button, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ArticleForm from "../managementhomepage/managementhomepagedetail/ArticleForm";
import ArticleList from "../managementhomepage/managementhomepagedetail/ArticleList";
import {
  getAllArticles, createArticle, updateArticle, deleteArticle
} from "../../../api/articleService";

export default function ArticlePage() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  

  const loadArticles = async () => {
    const res = await getAllArticles();
    setArticles(res.data);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpenForm = (article) => {
    setOpenForm(true);
    setSelectedArticle(article);
  }

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedArticle(null);
  }

  const handleCreate = () => {
    setSelectedArticle(null);
    setOpenForm(true);
  }
  
  const handleEdit = (article) => {
    setSelectedArticle(article);
    setOpenForm(true);
  }

  const handleDelete = async (id) => {
    await deleteArticle(id);
    loadArticles();
  };

  const handleSubmit = async (data) => {
    if (selectedArticle) {
      await updateArticle(selectedArticle.id, data);
    } else {
      await createArticle(data);
    }
    setOpenForm(false);
    setSelectedArticle(null);
    loadArticles();

  }

  return (
    <Container>
      <Typography variant="h4" mt={4}>Quản lý bài viết</Typography>
      <Divider sx={{ my: 2 }} />
      <Button variant="contained" onClick={handleOpenForm}>
        Thêm bài viết
      </Button>
      <ArticleList articles={articles} onEdit={handleEdit} onDelete={handleDelete}></ArticleList>
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>
          {selectedArticle ? "Cập nhật bài viết" : "Thêm bài viết"}
        </DialogTitle>
        <DialogContent>
          <ArticleForm onSubmit={handleSubmit} initialValues={selectedArticle || { title: "", content: "" , articleType: "" }}>           
          </ArticleForm>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseForm}>Hủy</Button>
        </DialogActions>
      </Dialog>


    </Container>
  );
}
