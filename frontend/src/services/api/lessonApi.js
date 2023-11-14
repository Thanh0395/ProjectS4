import { api } from "./api";


export const fetchLessonById = async (lessonId) => {
    try {
        const response = await api.get(`https://fakestoreapi.com/products/${lessonId}`);
        // const response = await api.get(`/products/${lessonId}`);
        return response.data;
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