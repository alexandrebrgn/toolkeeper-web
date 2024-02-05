import axios from 'axios';
import authHeader from './auth-header';
import {AppConfig} from '../config/app_config.js';

const API_URL = AppConfig.API_URL;

class ToolService {
    getAllTool() {
        return axios.get(API_URL + 'tool', { headers: authHeader() })
    }

    readTool(id) {
        console.log('ToolService - read() : ', API_URL + 'tool/' + id);
        return axios.get(API_URL + 'tool' + '/' + id, { headers: authHeader() })
    }
}

export default new ToolService();