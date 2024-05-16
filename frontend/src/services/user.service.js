import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://43.200.205.10:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'student', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'teacher', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
