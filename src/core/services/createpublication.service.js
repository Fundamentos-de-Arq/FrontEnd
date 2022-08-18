import http from "./http-common"

class CreatepublicationServices {
    postNewPublication(data){
       return http.post("/publications",data);
    }
    getAllPublications(){
        return http.get("/publications/");
    }
    getPublicationById(id){
        return http.get(`/publications/${id}`);
    }

    UpdatePublication(id,data){
        return http.put(`/publications/${id}`,data);
    }
    DeletePublication(id)
    {
        return http.delete(`/publications/${id}`);
    }
}

export default new CreatepublicationServices();
