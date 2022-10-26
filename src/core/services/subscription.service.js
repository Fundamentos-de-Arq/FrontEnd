import http from "@/core/services/http-common";

class SubscriptionService{
    getAllAsync(){
        return http.get(`/subscriptions`);
    }

    postAsync(data){
        return http.post(`/subscriptions`, data);
    }
}

export default new SubscriptionService();