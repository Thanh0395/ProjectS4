import { jwtDecode } from 'jwt-decode';

const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export { isTokenValid };
