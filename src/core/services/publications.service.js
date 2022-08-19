import axios from "axios";


class PublicationsService {
    postNewPublication(data){
        return axios.post("https://webapp-220818223116.azurewebsites.net/api/v1/publications",data);
    }
    getAllPublications(){
        return axios.get("https://webapp-220818223116.azurewebsites.net/api/v1/publications/");
    }
    getUserPublications(id){
        return axios.get(`https://webapp-220818223116.azurewebsites.net/api/v1/users/${id}/publications`);
    }
    getPublicationById(id){
        return axios.get(`https://webapp-220818223116.azurewebsites.net/api/v1/publications/${id}`);
    }
    putPublication(id,data){
        return axios.put(`https://webapp-220818223116.azurewebsites.net/api/v1/publications/${id}`,data);
    }
    DeletePublication(id)
    {
        return axios.delete(`https://webapp-220818223116.azurewebsites.net/api/v1/publications/${id}`);
    }   
}

export default new PublicationsService();
