import axios from 'axios';
import authHeader from './auth-header';
import {AppConfig} from '../config/app_config.js';

const API_URL = AppConfig.API_URL;

class ToolService {
    getAllTool() {
        console.log('ToolService - getAll() : ', API_URL + 'tool')
        return axios.get(API_URL + 'tool', { headers: authHeader() })
    }

    readTool(id) {
        console.log('ToolService - read() : ', API_URL + 'tool/' + id);
        return axios.get(API_URL + 'tool' + '/' + id, { headers: authHeader() })
    }

    addTool(name, serialId, localisation, dateNextOperation, category) {
        console.log('ToolService - add() : on ', API_URL + 'tool')
        // console.log('name:', name, 'serialId:', serialId, 'localisation:', localisation, 'dateNextOperation:', dateNextOperation, 'category_id:', category)
        return axios.post(API_URL + 'tool', {
            name: name,
            serialId: serialId,
            localisation: localisation,
            dateNextOperation: dateNextOperation,
            category_id: category,
        }, { headers: authHeader() })
    }

    editTool(form, id) {
        console.log('ToolService - edit() : on ', API_URL + 'tool' + '/' + id)
        return axios.put(API_URL + 'tool' + '/' + id, form, { headers: authHeader() })
    }
}

export default new ToolService();