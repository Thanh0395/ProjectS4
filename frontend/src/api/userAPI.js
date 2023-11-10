import api from './api';

export const loginUser = async (lessonId) => {
    try {
        const response = await api.get(`/products/${lessonId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};