// import axios from "axios";
import http from "./http-common"

class AddServices {

    postNewAd(data){
        return http.post("/Advertisements",data);
    }
    getAllAds(){
        return http.get("/Advertisements/");
    }
    getDiscountedAdds(){
        return http.get("/Advertisements/promoted=true")
    }
    UpdateAd(id,data){
        return http.put(`/Advertisements/${id}`,data);
    }
    DeleteAd(id)
    {
        return http.delete(`/Advertisements/${id}`);
    }
    getAllByUserId(id){
        return http.get(`/users/${id}/Advertisements`)
    }
}

export default new AddServices();
