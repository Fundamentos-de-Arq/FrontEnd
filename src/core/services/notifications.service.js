import http from "./http-common"
class NotificationService {

    getAllUserAtNotifications(id){
        console.log(id)
        return http.get(`/adoptionsrequests/userIdAt=${id}`);
    }

    postNotification(data){
        return http.post(`/adoptionsrequests`, data);
    }

    deleteNotification(id){
        //return http.delete(`//adoptionRequests${id}`);
        return http.delete(`/adoptionsrequests/${id}`);
    }
}

export default new NotificationService();
