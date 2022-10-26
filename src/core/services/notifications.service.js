import http from "./http-common"
import UsersService from "./users.service"
// import axios from "axios";
class NotificationService {


    getAllUserAtNotifications(id){
        //return http.get(`/adoptionRequests?userIdAt=${UsersService.currentUser}`);
        return http.get(`/adoptionsrequests/userIdAt=${id}`);
    }

    postNotification(data){
        //return http.get(`/adoptionRequests?userIdAt=${UsersService.currentUser}`);
        return http.post(`/adoptionsrequests`, data);
    }

    getAllUserFromNotifications(){
        //return http.get(`/adoptionRequests?userIdFrom=${UsersService.currentUser}`);
        return http.get(`/adoptionsrequests/userIdAt=${UsersService.currentUser}`);
    }
    deleteNotification(id){
        //return http.delete(`//adoptionRequests${id}`);
        return http.delete(`/adoptionsrequests/${id}`);
    }
    getUsersById(index){
        //return http.get('/users/'+ index);
        return http.get(`/adoptionsrequests/userIdFrom=`+index);
    }
    updateNotification(id,data){
        return http.put(`/adoptionsrequests/${id}`,data);

    }

}

export default new NotificationService();
