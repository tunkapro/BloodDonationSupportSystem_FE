import axios from "../config/axios";

const API_URL = "/admin";


export const getAllArticles = () => axios.get(`${API_URL}/articles`);
export const getArticleById = (id) => axios.get(`${API_URL}/${id}`);
export const createArticle = (formData) => {
  console.log(formData);
  return axios.post(`${API_URL}/article`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateArticle = (id, formData) => {
  return axios.put(`${API_URL}/article/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteArticle = (id) => axios.delete(`${API_URL}/${id}`);
