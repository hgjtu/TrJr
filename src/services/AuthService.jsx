import axios from 'axios';

const API_URL = 'http://localhost:8010'; 

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + '/login', { username, password })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  register(username, password) {
    return axios.post(API_URL + '/register', {
      username,
      email,
      password
    });
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  isAuthenticated() {
    const user = this.getCurrentUser();
    return user && user.token;
  }
}

export default new AuthService();