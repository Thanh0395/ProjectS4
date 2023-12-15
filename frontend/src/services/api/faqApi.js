import axios from "axios";
import environment from '../../environment.json';

const baseURL = environment.urls.dev;

export const fetchListFaq = async () => {
    try {
        const response = await axios.get(`${baseURL}/thanh/faq/list`);
        return response;
    } catch (error) {
        console.error('An error from server', error);
        return error.response;
    }
};
