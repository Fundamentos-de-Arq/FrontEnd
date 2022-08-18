import http from "./http-common"
import axios from 'axios';
const API_URL = 'https://localhost:5001/api/v1/users';


class UsersService {
    storageUser = -1;

    signInService(user, password){
        return http.post(`users/auth/sign-in`, {UserNick:user, Pass:password})
    }

    userService(){
       this.storageUser = JSON.parse(localStorage.getItem('user')).id
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem('user')).id
    }


    currentUser=0;

    getAllUsers(){
        return http.get(API_URL);
    }

    async getUsersById(index){
        return await http.get(`users/${index}`)
    }

    async updateUserById(id,data){
        return await http.put(`users/${id}`,data);
    }

    postUser(data){
        return axios.post(`https://localhost:5001/api/v1/users/auth/sign-up`, data)
    }

}

export default new UsersService();
