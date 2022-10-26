
import http from "./http-common"

class PetsService {
  datafilter;

  getPets(userId) {
    return http.get(`/pets/userId=${userId}`);
  }
  getPetById(id){
    return http.get(`/pets/${id}`)
  }


  getAllpets() {
    return http.get(`/pets`);
  }
  deletePet(petId) {
    return http.delete(`/pets/${petId}`);
  }
  postPet(data) {
    return http.post(`/pets`, data);
  }

  putPet(id, data) {
    return http.put(`/pets/${id}`, data);
  }

  filterPet(typeSearch, genderSearch, requireAtention) {
    if (genderSearch === undefined && requireAtention === undefined) {
      return http.get(`/pets/type=${typeSearch}`);
    } else if (typeSearch === undefined && genderSearch === undefined) {
      return http.get(`/pets/attention=${requireAtention}`);
    } else if (typeSearch === undefined && requireAtention === undefined) {
      return http.get(`/pets/gender=${genderSearch}`);
    } else if (typeSearch === undefined) {
      return http.get(`/pets/gender=${genderSearch}&attention=${requireAtention}`);
    } else if (genderSearch === undefined) {
      return http.get(`/pets/type=${typeSearch}&attention=${requireAtention}`);
    } else if (requireAtention === undefined) {
      return http.get(`/pets/type=${typeSearch}&gender=${genderSearch}`);
    } else {
      return http.get(
          `/pets/type=${typeSearch}&gender=${genderSearch}&attention=${requireAtention}`
      );
    }
  }

  setdatafilter(data) {
    this.datafilter = data;
    //change
  }
}

export default new PetsService();

