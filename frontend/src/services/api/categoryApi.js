import axios from "axios";
import environment from '../../environment.json';

const baseURL = environment.urls.dev;

const getToken = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    return token;
}

export const fetchListCategory = async () => {
    try {
        const response = await axios.get(`${baseURL}/thanh/category/analyze-list`);
        return response;
    } catch (error) {
        console.error('An error from server', error);
        return error.response;
    }
};

export const fetchCategoryById = async (cateId) => {
    try {
        const response = await axios.get(`${baseURL}/categories/get-category-by-id/${cateId}`);
        return response;
    } catch (error) {
        console.error('An error from server', error);
        return error.response;
    }
};

export const addCategory = async (categoryName, newImage) => {
    try {
        const cateName = categoryName.trim().toLowerCase().replace(/^\w/, c => c.toUpperCase());
        const response = await axios.post(`${baseURL}/categories/create-category`, 
        {
            categoryName: cateName,
            featureImage: newImage
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

export const updateCategory = async (categoryId, categoryName, newImage) => {
    try {
        const cateName = categoryName.trim().toLowerCase().replace(/^\w/, c => c.toUpperCase());
        const response = await axios.put(`${baseURL}/categories/update-category`, 
        {
            categoryId: categoryId,
            categoryName: cateName,
            featureImage: newImage
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

export const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`${baseURL}/categories/delete-category-by-id/${categoryId}` );
        return response;
    } catch (error) {
        console.error('An error from server', error);
        return error.response;
    }
};