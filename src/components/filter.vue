<template>
  <div>
      <v-container>
        <v-row >

          <v-col>

          <v-autocomplete
              v-model="animalSelect"
              :items="kindanimals"
              label="Kind of pet"
              @change="saveValues"
            ></v-autocomplete>
          </v-col>
          <v-col>

          <v-autocomplete
             v-model="genderSelect"
              :items="genderAnimal"
              label="Gender"
              @change="saveValues"
            ></v-autocomplete>
          </v-col>
          <v-col>

          <v-select
              v-model="requireSelect"
              :items="items"
              :rules="[(v) => !!v || 'Item is required']"
              label="Require Attention"
              required
              @change="saveValues"
            ></v-select>
          </v-col>

        </v-row>
          <!--v-col>
            <v-btn color="primary" elevation="2" @click="recibirinfo"
              >Filter</v-btn
            >
          </v-col-->
      </v-container>

  </div>
</template>

<script>
import PetsService from "../core/services/pets.service";
import districtService from "../core/services/district.service";
export default {
  name: "filtergeneral",
  data: () => ({
    kindanimals: ["Cat", "Dog", "Parrot", "Turtle", "Rondent", "Others"],
    genderAnimal: ["Male", "Female"],
    items: ["Require", "Dont Require"],
    districs: [],
    val: "dfsdf",
    autoUpdate: true,
    isUpdating: false,
    search: [],
    extractdata: "",
  }),
  methods: {
    saveValues() {
      if (
        this.animalSelect === undefined &&
        this.genderSelect === undefined &&
        this.requireSelect === undefined
      ) {
        PetsService.getAllpets().then((res) => {
          PetsService.setdatafilter(res.data);
        });
      } else {
        PetsService.filterPet(
          this.animalSelect,
          this.genderSelect,
          this.requireSelect
        ).then((response) => {
          PetsService.setdatafilter(response.data);
        });
      }
    },
    loadDistricts() {
      districtService.getAllDistricts().then((response) => {
        this.getanylistdata(response);
      });
    },
    getanylistdata(then) {
      for (let letra of then.data) {
        this.districs.push(letra.district);
      }
    },
  },
  mounted() {
    this.loadDistricts();
    this.saveValues();
  },
};
</script>

<style>




/*.select-wrapper {*/
/*  position: relative;*/
/*  width: 350px;*/
/*}*/
/*select-wrapper::after {*/
/*  color: black;*/
/*  content: "▾";*/
/*  margin-right: 10px;*/
/*  pointer-events: none;*/
/*  position: absolute;*/
/*  right: 10px;*/
/*  top: 7px;*/
/*  font-size: 20px;*/
/*}*/

/*.select {*/
/*  -moz-appearance: none;*/
/*  -webkit-appearance: none;*/
/*  background: white;*/
/*  border: none;*/
/*  border-radius: 0;*/
/*  cursor: pointer;*/
/*  padding: 12px;*/
/*  width: 100%;*/
/*  font-size: 18px;*/
/*}*/
/*select:focus {*/
/*  color: black;*/
/*}*/

/*select::-ms-expand {*/
/*  display: none;*/
/*}*/
</style>
