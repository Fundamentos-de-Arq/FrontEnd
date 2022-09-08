import axios from "axios";

class AddServices {
    postNewAd(data){
        return axios.post("https://webapp-220907215919.azurewebsites.net/api/v1/Advertisements",data);
    }
    getAllAds(){
        return axios.get("https://webapp-220907215919.azurewebsites.net/api/v1/Advertisements/");
    }
    getDiscountedAdds(){
        return axios.get("https://webapp-220907215919.azurewebsites.net/api/v1/Advertisements/promoted=true")
    }
    UpdateAd(id,data){
        return axios.put(`https://webapp-220907215919.azurewebsites.net/api/v1/Advertisements/${id}`,data);
    }
    DeleteAd(id)
    {
        return axios.delete(`https://webapp-220907215919.azurewebsites.net/api/v1/Advertisements/${id}`);
    }
    getAllByUserId(id){
        return axios.get(`https://webapp-220907215919.azurewebsites.net/api/v1/users/${id}/Advertisements`)
    }
}

export default new AddServices();
