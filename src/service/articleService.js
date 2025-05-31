import axiosCustom from "../config/axios"

const API_URL = '/api/admin/articles'

export const getArticles = () => axiosCustom.get(API_URL);