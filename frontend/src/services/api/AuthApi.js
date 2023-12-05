import axios from 'axios';
import { api, baseURL } from './api';

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