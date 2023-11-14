import api from './api';

export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/auth/login', {
            email: email,
            password: password,
        });
        const userData = response.data;
        console.log("userData", userData);
        //localStorage.setItem('userData', JSON.stringify(userData));
        //return userData;
    } catch (error) {
        console.log('Error Response:', error.response);
        if (error.response && error.response.status === 403) {
            console.error('Forbidden: You do not have permission to access this resource.');
        }
        throw error;
    }
};