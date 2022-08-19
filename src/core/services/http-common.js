import axios from "axios";

export default axios.create({
    baseURL: "https://webapp-220818223116.azurewebsites.net/api/v1",
    headers:{Authorization: localStorage.getItem('token'), "Content-type":"application/json"}
});