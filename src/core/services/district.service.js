import http from "./http-common"

class districtService
{

    getAllDistricts()
    {
        return http.get(`/district`)
    }

}
export default new districtService()