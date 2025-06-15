import { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import ArticleList from "./managementhomepagedetail/ArticleList";

import useFetchData from "../../../hook/customHook";
import { getArticles } from "../../../api/articleService";

export default function AdminPosts() {
    const {
      data: articles,
      setData: setArticles,
      loading,
      error,

    } = useFetchData(getArticles);
    








  const handleEdit = (article) => {
    setEditArticle(article);
  };

  const handleDelete = async (id) => {
    try {
      await deleteA
    } catch (err) {
      alert(err.reponse.data.message)
    }
  };



  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý bài viết
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => console.log("Đi tới trang tạo bài viết")}
      >
        + Tạo bài viết mới
      </Button>
      <ArticleList  
        articles={editArticle}
        types={types}
        onCancel={() => setEditArticle(null)}
        onSave={up}
      />
    </Container>
  );
}
