import axiosCustom from "../config/axios"

const API_URL = '/api/admin/articles'

export const getArticles = () => axiosCustom.get(API_URL).then(res => res.data);

export const deleteArticle = (id) => axiosCustom.delete(`${API_URL}/${id}`).then(res => res.data)
