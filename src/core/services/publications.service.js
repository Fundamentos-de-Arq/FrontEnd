// import axios from "axios";
import http from "./http-common"


class PublicationsService {
    postNewPublication(data){
        return http.post("/publications",data);
    }
    getAllPublications(){
        return http.get("/publications/");
    }
    getUserPublications(id){
        return http.get(`/users/${id}/publications`);
    }
    getPublicationById(id){
        return http.get(`/publications/${id}`);
    }
    putPublication(id,data){
        return http.put(`/publications/${id}`,data);
    }
    DeletePublication(id)
    {
        return http.delete(`/publications/${id}`);
    }   
}

export default new PublicationsService();
