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
        throw error;
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
        throw error;
    }
};
export const fetchListLessonDashboard = async () => {
    try {
        const response = await apiWithToken.get('/thanh/lesson/dashboard/list');
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
export const fetchTags = async () => {
    try {
        const response = await api.get('/tags/list-tag');
        return response.data;
    } catch (error) {
        throw error;
    }
};