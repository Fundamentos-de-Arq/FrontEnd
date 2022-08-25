// import axios from 'axios';
import http from "./http-common"
import UsersService from './users.service'
// const API_URL = 'https://webapp-220818223116.azurewebsites.net/api/v1/users';
class AuthService {
    login(user) {
        return http.post('/users/auth/sign-in', {
            username: user.username,
            password: user.password
        })
            .then(response => {
                if (response.data.token) {
                    UsersService.token = response.data.token
                    console.log("user:" + response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
    register(user) {
        return http.post('/users/auth/sign-up', {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password
        });
    }
}
export default new AuthService();
