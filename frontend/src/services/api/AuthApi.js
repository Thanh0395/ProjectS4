import axios from 'axios';
import { api, apiWithToken, baseURL } from './api';

export const sendResetPassword = async (email, newPassword, confirmPassword, code) => {
    try {
        const response = await api.post('/auth/reset-password', {
            email: email,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
            code: code,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const sendVerifycodeMailForgotPassword = async (email) => {
    try {
        const response = await api.post('/auth/forgot-password', {
            toEmail: email,
            subject: "Forgot Password",
            content: "You have requested to reset your password. Here is your verification code",
            deevLink: "http://localhost3000/reset-password",
            action:"Reset Password"
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const sendChangePassword = async (email, oldPassword ,newPassword, confirmPassword) => {
    try {
        const response = await api.post('/auth/change-password', {
            email: email,
            oldPassword:oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/*
    User Profile API
*/
export const ProfileDataByUserId = async (userId) => {
    try {
        const response = await api.get(`/profile/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
//Upload image api
export const UploadImageAPI = async (formData) => {
    try{
        const response = await api.post("/file/upload-image", formData);
        return response.data;
    } catch (error) {
        throw error;
    }
}
//Update user
export const UpdateUserAPI = async (userUpdate) => {
    try{
        const response = await apiWithToken.put("/users/update-user", userUpdate);
        return response.data;
    } catch (error) {
        throw error;
    }
}
