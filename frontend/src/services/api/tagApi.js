import axios from "axios";
import environment from '../../environment.json';

const baseURL = environment.urls.dev;

const getToken = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    return token;
}

export const fetchListTag = async () => {
    try {
        const response = await axios.get(`${baseURL}/tags/analyze-list`);
        return response;
    } catch (error) {
        console.error('An error from server', error);
        return error.response;
    }
};

export const addTag = async (tagName) => {
    try {
        const name = tagName.trim().toLowerCase()
        const response = await axios.post(`${baseURL}/tags/create-tag`,
            {
                tagName: name,
            },
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                }
            });
        return response;
    } catch (error) {
        console.error('An error from server', error);
        return error.response;
    }
};

export const updateTag = async (tagId, tagName) => {
    try {
        const name = tagName.trim().toLowerCase()
        const response = await axios.put(`${baseURL}/tags/update-tag`,
            {
                tagId: tagId,
                tagName: name,
            },
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                }
            });
        return response;
    } catch (error) {
        console.error('An error from server', error);
        return error.response;
    }
};

export const deleteTag = async (tagId) => {
    try {
        const response = await axios.delete(`${baseURL}/tags/delete-tag-by-id/${tagId}`,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                }
            });
        return response;
    } catch (error) {
        console.error('An error from server', error);
        return error.response;
    }
};