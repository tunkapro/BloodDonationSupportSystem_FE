import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Divider,
  Button,
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
  const [selectedArticle, setSelectedArticle] = useState(
    { id: "",
      title: "",
      content: "",
      status: "",
      imageUrl : "",
      articleType: "",
      createdByAdminId: ""}
    );
  const [openForm, setOpenForm] = useState(false);
  const { user } = useAuth();



  const loadArticles = async () => {
    const res = await getAllArticles();
    console.log(res.data);
    setArticles(res.data.data);
  };

  useEffect(() => {
    loadArticles();
    loadUser();
  }, []);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedArticle(null);
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setOpenForm(true);
  };

  const handleDelete = async (article) => {
    await deleteArticle(article.id);
    loadArticles();
  };



  const handleSubmit = async (data, imageData, fileName) => {
    console.log(imageData)
    data.imageData = imageData;
    data.fileName = fileName;

    const cleanData = {
      title: data.title,
      content: data.content,
      status: data.status,
      imageData: selectedArticle && imageData.includes(selectedArticle.imageUrl) ? selectedArticle.imageUrl : imageData,
      fileName : fileName,
      articleType: data.articleType,
      createdByAdminId: user.id,
    };
    console.log(cleanData);

    try {
      if (selectedArticle) {
        const res = await updateArticle(selectedArticle.id, cleanData);
        console.log(res);
      } else {
        const res =await createArticle(cleanData);
         console.log(res);
      }

      const res = await createArticle(formData);


      console.log("Res:", res);
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
          {selectedArticle  ?  "Cập nhật bài viết" : "Thêm bài viết" }
        </DialogTitle>
        <DialogContent>
          <ArticleForm
            onSubmit={handleSubmit}
            initialValues={selectedArticle }
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
