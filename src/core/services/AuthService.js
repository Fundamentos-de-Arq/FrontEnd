import axios from 'axios';
import UsersService from './users.service'
import http from "@/core/services/http-common";
const API_URL = 'https://localhost:5001/api/v1/users';
class AuthService {
    login(user) {
        return http.post(API_URL +'auth/sign-in', {
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
        return http.post(API_URL + 'auth/sign-up', {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password
        });
    }
}
export default new AuthService();
