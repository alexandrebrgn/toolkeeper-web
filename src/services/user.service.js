import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://172.21.5.88:8080/api/v1/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getAllTool() {
        return axios.get(API_URL + 'tool', { headers: authHeader() })
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();