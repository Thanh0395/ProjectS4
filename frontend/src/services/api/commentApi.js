import axios from "axios";
import { apiWithToken } from "./api";
import environment from '../../environment.json';

const baseURL = environment.urls.dev;

const getToken = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    return token;
}
export const fetchListCommentDashboard = async () => {
    try {
        const response = await apiWithToken.get('/thanh/comment/dashboard-list');
        const data = response.data;
        return data;
    } catch (error) {
        console.error('An error Network occurred while get comment list:', error);
    }
};

export const changeStatusComment = async (status, feedbackId) => {
    try {
        const response = await apiWithToken.put(`/thanh/comment/change-status/${status}/${feedbackId}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('An error Network occurred while change status:', error);
    }
};

export const deleteComment = async (feedbackId) => {
    try {
        const response = await apiWithToken.delete(`/thanh/comment/delete/${feedbackId}`);
        return response;
    } catch (error) {
        console.error('An error Network occurred while delete:', error);
    }
};

export const changeStatusListComment = async (status, listId) => {
    try {
        let data = JSON.stringify(listId);
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${baseURL}/thanh/comment/change-status-list/${status}`,
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
            data: data
        };
        const response = await axios.request(config);
        return response;
    } catch (error) {
        console.error('An error Network occurred while change status:', error);
    }
};

export const deleteListComment = async (listId) => {
    try {
        let data = JSON.stringify(listId);
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseURL}/thanh/comment/delete-list`,
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
            data: data
        };
        const response = await axios.request(config);
        return response;
    } catch (error) {
        console.error('An error Network occurred while delete:', error);
    }
};