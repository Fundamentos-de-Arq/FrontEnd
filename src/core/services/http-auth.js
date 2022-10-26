import axios from "axios";

export default axios.create({
    baseURL: "https://webapp-220926223218.azurewebsites.net/api/v1",
    // baseURL: "https://localhost:5001/api/v1",
    headers:{Authorization: localStorage.getItem('token'), "Content-type":"application/json;charset=utf-8"}
});
