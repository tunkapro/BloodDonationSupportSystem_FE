import axios from "../config/axios";

const API_URL = "/admin";


export const getAllArticles = () => axios.get(`${API_URL}/articles`);
export const getArticleById = (id) => axios.get(`${API_URL}/${id}`);


export const createArticleV2 = (article) => axios.post(`${API_URL}/article/create`, article);

export const createArticle = (article, image) => {
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(article)], { type: "application/json" })
  );
  if (image) {
    formData.append("image", image);
  }

  return axios.post(`${API_URL}/article`, formData);

};

export const updateArticle = (id, formData) => {
  return axios.put(`${API_URL}/article/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteArticle = (id) => axios.delete(`${API_URL}/article/${id}`);

