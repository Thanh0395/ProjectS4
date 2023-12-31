import axios from 'axios';
import { api, baseURL } from './api';

export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/auth/login', {
            email: email,
            password: password,
        });
        const userData = response.data;
        localStorage.setItem('token', JSON.stringify(userData.token));
        localStorage.setItem('refreshToken', JSON.stringify(userData.refreshToken));
        localStorage.setItem('currentUser', JSON.stringify(userData.user));
        const imageIcon = localStorage.getItem("imageIcon");
        if(imageIcon == "ImageHung/icon_image_default.jpg"){
            localStorage.setItem('imageIcon', "ImageHung/icon_image_default.jpg");
        }
        if(!imageIcon) {
            localStorage.setItem('imageIcon', "ImageHung/icon_image_default.jpg");
        }
        const roles = userData.user.roles;
        let listRole = [];
        roles.forEach(role => {
            listRole.push(role.name);
        });
        localStorage.setItem('roles', JSON.stringify(listRole));
        return userData;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error('Forbidden: You do not have permission to access this resource.');
        }
        throw error;
    }
};

export const fetchGameData = async (userId) => {
    try {
        const response = await axios.get(`${baseURL}/thanh/game/user-data/${userId}`);
        const userData = response.data;
        if (response.status === 200) {
            localStorage.setItem('userGameData', JSON.stringify(userData));
        }
        return userData;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error('Forbidden: You do not have permission to access this resource.');
        }
        throw error;
    }
};

export const registerUser = async (email, name, password, dateOfBirth) => {
    try {
        const response = await api.post('/auth/register', {
            email: email,
            name: name,
            password: password,
            dateOfBirth: dateOfBirth,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const sendVerifycodeMail = async (email) => {
    try {
        const response = await api.post('/auth/create-verify-email', {
            toEmail: email,
            subject: "Ultimate Learning Activation",
            content: "Your verify code is: ",
            deevLink: "http://localhost3000/login",
            action: "Confirm Account"
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const activeUser = async (email, code) => {
    try {
        const response = await api.post('/auth/active-user', {
            email: email,
            code: code,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const logoutUser = async () => {
    try {
        await api.get('/auth/logout');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('roles');
        localStorage.removeItem('userGameData');
        localStorage.removeItem('purchaseBundle');
        return 'Ok';
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error('Forbidden: You do not have permission to access this resource.');
        }
        throw error;
    }
};
export const fetchAllUser = async () => {
    try {
        const response = await api.get('/nhan/users/list');
        const users = response.data;
        return users;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error('Forbidden: You do not have permission to access this resource.');
        }
        throw error;
    }
};