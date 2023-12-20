import axios from "axios";
import environment from '../../environment.json';

const baseURL = environment.urls.dev;

export const uploadFile = async (file, folderName, folderPath) => {
    try {
        let data = new FormData();
        data.append('file', file);
        data.append('folderName', folderName);
        data.append('folderPath', folderPath);
        const response = await axios.post(`${baseURL}/file/upload-image`, data);
        return response.data;
    } catch (error) {
        console.error('An error Network occurred while upload file', error);
    }
}; 