import http from "@/core/services/http-common";

class ReportService{
    getAllAsync(){
        return http.get(`/report`);
    }

    postAsync(data){
        return http.post(`/report`, data);
    }

}

export default new ReportService();