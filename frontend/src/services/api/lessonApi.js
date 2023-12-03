import axios from "axios";
import { api, apiWithToken } from "./api";
import environment from '../../environment.json';

const baseURL = environment.urls.dev;

const getToken = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    return token;
}

export const fetchLessonById = async (lessonId) => {
    try {
        const response = await api.get(`https://fakestoreapi.com/products/${lessonId}`);
        // const response = await api.get(`/products/${lessonId}`);
        return response.data;
    } catch (error) {
        console.error('An error Network occurred while get lesson', error);
    }
};
export const buyGem = async (gemAmount) => {
    try {
        const response = await axios.put(`${baseURL}/thanh/payment/buy-gem`, gemAmount, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error during the request:', error.message);
    }
};
export const fetchLessonByIdDashboard = async (lessonId) => {
    try {
        const response = await apiWithToken.get(`/thanh/lesson/dashboard/${lessonId}`);
        return response.data;
    } catch (error) {
        console.error('An error Network occurred while get a lesson', error);
    }
};
export const fetchListLessonDashboard = async () => {
    try {
        const response = await apiWithToken.get('/thanh/lesson/dashboard/list');
        const data = response.data;
        return data;
    } catch (error) {
        console.error('An error Network occurred while get lesson list:', error);
    }
};
export const fetchCategories = async () => {
    try {
        const response = await api.get('https://fakestoreapi.com/products/categories');
        // const response = await api.get(`/products/categories`);
        return response.data;
    } catch (error) {
        console.error('An error Network occurred while get category', error);
    }
};
export const listCategory = async () => {
    try {
        const response = await apiWithToken.get('/categories/list-category');
        return response.data;
    } catch (error) {
        console.error('An error Network occurred while get category list', error);
    }
};
export const deletePost = async (postId) => {
    try {
        const response = await apiWithToken.delete(`/thanh/lesson/delete/${postId}`);
        return response.data;
    } catch (error) {
        console.error('An error Network occurred while delete a resource', error);
    }
};
export const fetchTags = async () => {
    try {
        const response = await api.get('/tags/list-tag');
        return response.data;
    } catch (error) {
        console.error('An error Network occurred while get tags:', error);
    }
};
export const addTag = async (lessonId, tagId) => {
    try {
        const response = await apiWithToken.put(`${baseURL}/thanh/lesson/add-tag?lessonId=${lessonId}&tagId=${tagId}`);
        return response;
    } catch (error) {
        console.error('An error Network occurred while add tags:', error);
    }
};
export const removeTag = async (lessonId, tagId) => {
    try {
        const response = await apiWithToken.delete(`${baseURL}/thanh/lesson/remove-tag?lessonId=${lessonId}&tagId=${tagId}`);
        return response;
    } catch (error) {
        console.error('An error Network occurred while removing tags:', error);
    }
};
export const removeAllTag = async (lessonId) => {
    try {
        const response = await apiWithToken.delete(`${baseURL}/thanh/lesson/remove-alltag?lessonId=${lessonId}`);
        return response;
    } catch (error) {
        console.error('An error Network occurred while removing tags:', error);
    }
};
export const updateAddQuestion = async (lessonId, question) => {
    try {
        const response = await axios.post(`${baseURL}/thanh/lesson/update-add-question/${lessonId}`,
            {
                questionId: question.questionId,
                content: question.content,
                answerA: question.answerA,
                answerB: question.answerB,
                answerC: question.answerC,
                answerD: question.answerD,
                rightAnswer: question.rightAnswer
            },
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                }
            });
        return response.data;
    } catch (error) {
        console.error('An error Network occurred while update question', error);
    }
};
export const deleteQuestion = async (lessonId, questionId) => {
    try {
        const response = await axios.delete(`${baseURL}/thanh/lesson/update-add-question/${lessonId}/${questionId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        console.error('An error Network occurred while delete question', error);
    }
};
export const updateLesson = async (id, categoryId, title, content, price, featureImage, video) => {
    try {
        const response = await axios.put(`${baseURL}/thanh/lesson/update`,
            {
                id: id,
                categoryId: categoryId,
                title: title,
                content: content,
                price: price,
                featureImage: featureImage,
                video: video,
            },
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                }
            });
        return response.data;
    } catch (error) {
        console.error('An error Network occurred while delete question', error);
    }
}; 