import axios from "axios";


class PetsService {
  datafilter;

  getPets(userId) {
    return axios.get(`https://localhost:5001/api/v1/pets/userId=${userId}`);
  }
  getPetById(id){
    return axios.get(`https://localhost:5001/api/v1/pets/${id}`)
  }


  getAllpets() {
    return axios.get(`https://localhost:5001/api/v1/pets`);
  }
  deletePet(petId) {
    return axios.delete(`https://localhost:5001/api/v1/pets/${petId}`);
  }
  postPet(data) {
    return axios.post(`https://localhost:5001/api/v1/pets`, data);
  }
  putPet(id, data) {
    return axios.put(`https://localhost:5001/api/v1/pets/${id}`, data);
  }

  filterPet(typeSearch, genderSearch, requireAtention) {
    if (genderSearch === undefined && requireAtention === undefined) {
      return axios.get(`https://localhost:5001/api/v1/pets/type=${typeSearch}`);
    } else if (typeSearch === undefined && genderSearch === undefined) {
      return axios.get(`https://localhost:5001/api/v1/pets/attention=${requireAtention}`);
    } else if (typeSearch === undefined && requireAtention === undefined) {
      return axios.get(`https://localhost:5001/api/v1/pets/gender=${genderSearch}`);
    } else if (typeSearch === undefined) {
      return axios.get(`https://localhost:5001/api/v1/pets/gender=${genderSearch}&attention=${requireAtention}`);
    } else if (genderSearch === undefined) {
      return axios.get(`https://localhost:5001/api/v1/pets/type=${typeSearch}&attention=${requireAtention}`);
    } else if (requireAtention === undefined) {
      return axios.get(`https://localhost:5001/api/v1/pets/type=${typeSearch}&gender=${genderSearch}`);
    } else {
      return axios.get(
          `https://localhost:5001/api/v1/pets/type=${typeSearch}&gender=${genderSearch}&attention=${requireAtention}`
      );
    }
  }
  getdatafilter() {
    return this.datafilter;
  }
  setdatafilter(data) {
    this.datafilter = data;
    //change
  }
}

export default new PetsService();
