import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Divider,
  Button,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ArticleForm from "./PostDetails/ArticleForm";
import ArticleList from "./PostDetails/ArticleList";
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../../../api/articleService";
import { useAuth } from "../../../context/authContext";

export default function ArticlePage() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  // const [user, loadUser] = useAuth();
  const loadArticles = async () => {
    const res = await getAllArticles();
    setArticles(res.data);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpenForm = (article = null) => {
    setOpenForm(true);
    setSelectedArticle(article);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedArticle(null);
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    await deleteArticle(id);
    loadArticles();
  };

  const handleSubmit = async (data, image,) => {
    console.log(data);
    const cleanData = {
      title: data.title,
      content: data.content,
      articleType: data.articleType,
      status: data.status,
      // createdByAdminId: 
    };
    try {
      if (selectedArticle.id) {
        const res = await updateArticle(selectedArticle.id, cleanData, image);
        console.log(res);
      } else {
        const res =await createArticle(cleanData, image);
         console.log(res);
      }
      setOpenForm(false);
      setSelectedArticle(null);
      loadArticles();
    } catch (error) {
      console.error("Submit error:", error);
      console.log(error.response?.data?.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" mt={4}>
        Quản lý bài viết
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Button variant="contained" onClick={handleOpenForm}>
        Thêm bài viết
      </Button>
      <ArticleList
        articles={articles}
        onEdit={handleEdit}
        onDelete={handleDelete}
      ></ArticleList>
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>
          {selectedArticle ? "Cập nhật bài viết" : "Thêm bài viết"}
        </DialogTitle>
        <DialogContent>
          <ArticleForm
            onSubmit={handleSubmit}
            initialValues={
              selectedArticle || {
                title: "",
                content: "",
                articleType: "",
                status: "",
              }
            }
          ></ArticleForm>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ width: "100px" }}
            variant="contained"
            onClick={handleCloseForm}
          >
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
