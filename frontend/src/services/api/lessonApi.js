import { api, apiWithToken } from "./api";


export const fetchLessonById = async (lessonId) => {
    try {
        const response = await api.get(`https://fakestoreapi.com/products/${lessonId}`);
        // const response = await api.get(`/products/${lessonId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const fetchListLesson = async () => {
    try {
        const response = await apiWithToken.get('/thanh/lesson/list');
        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
};
export const fetchCategories = async () => {
    try {
        const response = await api.get('https://fakestoreapi.com/products/categories');
        // const response = await api.get(`/products/categories`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const listCategory = async () => {
    try {
        const response = await apiWithToken.get('/categories/list-category');
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deletePost = async (postId) => {
    try {
        const response = await apiWithToken.delete(`/thanh/lesson/delete/${postId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};