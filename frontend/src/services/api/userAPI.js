import {api} from './api';

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
        const roles = userData.user.roles;
        let listRole = [];
        roles.forEach(role => {
            listRole.push(role.name); 
        });
        localStorage.setItem('roles',JSON.stringify(listRole));
        return userData;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error('Forbidden: You do not have permission to access this resource.');
        }
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
        return 'Ok';
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error('Forbidden: You do not have permission to access this resource.');
        }
        throw error;
    }
};