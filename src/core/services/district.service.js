import http from "./http-common"
import axios from "axios";

class districtService
{
    endpoint="api/v1/districts"
    datafilter
    getAllDistricts()
    {
        return axios.get(`https://localhost:5001/api/v1/district`)
    }

    getByDistrict(data){

        if(data===undefined)
        {
            this.getAllDistricts()
        }else
        {
            return http.get(`/${this.endpoint}?district=${data}`)
        }
    }
    getdistrictfilter() {
        return this.datafilter;
      }
      setdistrictfilter(data) {
        this.datafilter = data;
        //change
      }
}
export default new districtService()