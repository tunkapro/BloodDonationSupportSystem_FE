import axios from "../config/axios"

const API_URL = 'api/admin';

export const getAllArticles = () => axios.get(`${API_URL}/articles`);
export const getArticleById = (id) => axios.get(`${API_URL}/${id}`);
export const createArticle = (data) => axios.post(API_URL, data);
export const updateArticle = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteArticle = (id) => axios.delete(`${API_URL}/${id}`);